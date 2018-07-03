import React, { Component } from 'react';
import { Icon, Tag, AutoComplete, Button, Popover } from 'antd';

const Option = AutoComplete.Option;

const labelElem = ({ assigneeID, id, color, body }) => (
  colors,
  closable = false,
  onClose = () => {}
) => (
  <Tag
    key={id}
    color={Object.entries(colors).find(item => item[0] === color)[1]}
    closable={closable}
    onClose={() => onClose(assigneeID)}
  >
    {body}
  </Tag>
);

const labelColorPicker = (clickFunc, closeFunc) => label => colors => (
  <Popover
    defaultVisible={true}
    placement="bottomRight"
    content={
      <ColorPicker
        current={label.color}
        colors={colors}
        onClickColor={clickFunc}
      />
    }
    trigger="click"
    onVisibleChange={closeFunc}
  >
    {labelElem(label)(colors)}
  </Popover>
);

class LabelPC extends Component {
  state = {
    colors: {
      default: '#bfbfbf',
      red: '#f5222d',
      orange: '#fa8c16',
      yellow: '#fadb14',
      green: '#52c41a',
      cyan: '#13c2c2',
      blue: '#1890ff',
      magenta: '#eb2f96',
      purple: '#722ed1',
    },
    loading: false,
    labels: [
      {
        id: 1,
        color: 'red',
        body: 'red label',
      },
      {
        id: 2,
        color: 'orange',
        body: 'oragne label',
      },
      {
        id: 3,
        color: 'cyan',
        body: 'cyan label',
      },
      {
        id: 4,
        color: 'magenta',
        body: 'magenta label',
      },
      {
        id: 5,
        color: 'green',
        body: 'green label',
      },
    ],
    taskLabels: [
      {
        id: 1,
        assigneeID: 1,
        color: 'red',
        body: 'red label',
      },
      {
        id: 2,
        assigneeID: 2,
        color: 'orange',
        body: 'orage label',
      },
      {
        id: 5,
        assigneeID: 4,
        color: 'magenta',
        body: 'magenta label',
      },
    ],
    addedLabel: { id: 8, assigneeID: 5, color: 'default', body: 'green label' },
    matchLabels: [],
    inputVisible: false,
    inputValue: '',
  };

  showAutocompleteSearch = () => {
    this.setState({
      inputVisible: true,
      inputValue: '',
    });
  };

  hideAutocompleteSearch = () => {
    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  };

  handleSelect = value => {
    if (value > 0) {
      // 2. 검색목록에서 선택시
      // assignee id 받아와야함
      const label = this.state.labels.find(
        item => parseInt(item.id) === parseInt(value)
      );
      const res = 0;
      this.setState(prevState => ({
        taskLabels: prevState.taskLabels.concat({
          assigneeID: res,
          id: label.id,
          color: label.color,
          body: label.body,
        }),
        inputVisible: false,
      }));
    } else {
      // 1. 추가 버튼 선택
      // fetch id 받아와야하고
      // assignee id도 받아와야함
      const res = 0;
      this.setState({
        addedLabel: {
          assigneeID: res,
          id: res,
          color: 'default',
          body: this.state.inputValue,
        },
      });
    }
    this.hideAutocompleteSearch();
  };

  handleSearch = value => {
    const matchLabels = value
      ? this.state.labels.filter(label => label.body.includes(value))
      : [];
    this.setState({ matchLabels });
  };

  handleChange = inputValue => {
    if (inputValue) {
      this.setState({ inputValue });
    }
  };

  selectColor = color => {
    this.setState(prevState => ({
      addedLabel: {
        ...prevState.addedLabel,
        color,
      },
    }));
  };

  closeColorPicker = visible => {
    if (!visible) {
      // fetch patch로 color 변경
      this.setState(
        prevState => ({
          taskLabels: prevState.taskLabels.concat(this.state.addedLabel),
        }),
        () => {
          this.setState({ addedLabel: null });
        }
      );
    }
  };

  removeLabel = assigneeID => {
    // fetch delete
    console.log(`remove!! ${assigneeID}`);
  };

  render() {
    const {
      inputVisible,
      inputValue,
      colors,
      taskLabels,
      matchLabels,
      addedLabel,
    } = this.state;

    const children = matchLabels.map(label => (
      <Option key={label.id}>{labelElem(label)(colors, false)}</Option>
    ));

    return (
      <div className="label-unit">
        <Icon type="tags-o" />
        <div className="label-unit__box">
          {taskLabels.map(label =>
            labelElem(label)(colors, true, this.removeLabel)
          )}
          {addedLabel &&
            labelColorPicker(this.selectColor, this.closeColorPicker)(
              addedLabel
            )(colors)}
          {inputVisible && (
            <div className="label-search">
              <div className="label-search__hidden">&nbsp;{inputValue}</div>
              <AutoComplete
                className="label-search__input"
                autoFocus={true}
                onSelect={this.handleSelect}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                onBlur={this.hideAutocompleteSearch}
                style={{ width: '100%' }}
                dropdownMatchSelectWidth={false}
                dropdownStyle={{ width: 300 }}
                size="small"
              >
                {children}
                <Option key={0} className="label-search__item--new">
                  <Icon type="plus" /> New Label
                </Option>
              </AutoComplete>
            </div>
          )}
          {!inputVisible && (
            <Button
              size="small"
              type="circle"
              icon="plus"
              onClick={this.showAutocompleteSearch}
            />
          )}
        </div>
      </div>
    );
  }
}

const ColorPicker = props => {
  return (
    <div className="label-color-picker">
      {Object.entries(props.colors).map(color => (
        <Tag
          className="label-color-picker__item"
          key={color[0]}
          size="small"
          color={color[1]}
          onClick={() => props.onClickColor(color[0])}
        >
          {props.current === color[0] && <Icon type="check" />}
        </Tag>
      ))}
    </div>
  );
};

export default LabelPC;
