import React, { Component } from 'react';
import classNames from 'classnames';
import { Icon, Tag, AutoComplete, Button, Popover } from 'antd';

const Option = AutoComplete.Option;

// component of label element
const labelElem = ({ assigneeID, id, color, body }) => (
  colors,
  closable = false,
  onClose = () => {}
) => {
  return (
    <Tag
      key={id}
      color={Object.entries(colors).find(item => item[0] === color)[1]}
      closable={closable}
      onClose={() => onClose(assigneeID)}
    >
      {body}
    </Tag>
  );
};

// component of color picker and label combination
const labelColorPicker = label => colors => clickFunc => closeFunc => (
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
    onVisibleChange={visible => closeFunc(visible, label.id)}
  >
    {labelElem(label)(colors)}
  </Popover>
);

// component of color picker
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

class LabelPC extends Component {
  static defaultProps = {
    colors: {},
    loading: false,
    labels: [
      // {
      //   id: 1,
      //   color: 'red',
      //   body: 'red label',
      // },
    ],
    taskLabels: [
      // {
      //   id: 1,
      //   assigneeID: 1,
      //   color: 'red',
      //   body: 'red label',
      // },
    ],
    addedLabel: null,
    matchLabels: [],
  };

  state = {
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
    // value is label's id

    if (value > 0) {
      this.props.onSelectSearchLabel(value);
      this.setState({
        inputVisible: false,
      });
    } else {
      this.props.onCreateLabel(value, this.state.inputValue);
    }
    this.hideAutocompleteSearch();
  };

  handleChange = inputValue => {
    if (inputValue) {
      this.setState({ inputValue });
    }
  };

  render() {
    const { inputVisible, inputValue } = this.state;
    const {
      colors,
      taskLabels,
      matchLabels,
      addedLabel,
      matchSearch,
      selectColor,
      closeColorPicker,
      removeLabel,
    } = this.props;

    const children = matchLabels.map(label => (
      <Option key={label.id}>{labelElem(label)(colors, false)}</Option>
    ));

    return (
      <div
        className={classNames(
          'label-unit',
          inputVisible && 'label-unit--focused'
        )}
      >
        {taskLabels.map(label => labelElem(label)(colors, true, removeLabel))}
        {addedLabel &&
          labelColorPicker(addedLabel)(colors)(selectColor)(closeColorPicker)}
        {inputVisible && (
          <div className="label-search">
            <div className="label-search__hidden">&nbsp;{inputValue}</div>
            <AutoComplete
              className="label-search__input"
              autoFocus={true}
              onSelect={this.handleSelect}
              onSearch={matchSearch}
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
                {/* if there isnt any match, it will be appeared*/}
              </Option>
            </AutoComplete>
          </div>
        )}
        {!inputVisible && (
          <Button
            className="label-search-button"
            size="small"
            type="circle"
            icon="plus"
            onClick={this.showAutocompleteSearch}
          />
        )}
      </div>
    );
  }
}

export default LabelPC;
