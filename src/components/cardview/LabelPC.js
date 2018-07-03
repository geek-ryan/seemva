import React, { Component } from 'react';
import { Icon, Tag, AutoComplete, Button } from 'antd';

const Option = AutoComplete.Option;

const labelElem = ({ id, color, body }) => (
  colors,
  closable = true,
  predicate
) => (
  <Tag
    key={id}
    color={colors.find(item => [color] in item)[color]}
    closable={closable}
    onClose={() => {}}
  >
    {body}
  </Tag>
);

class LabelPC extends Component {
  state = {
    colors: [
      { red: '#f5222d' },
      { orange: '#fa8c16' },
      { yellow: '#fadb14' },
      { green: '#52c41a' },
      { cyan: '#13c2c2' },
      { blue: '#1890ff' },
      { magenta: '#eb2f96' },
      { purple: '#722ed1' },
      { default: '#bfbfbf' },
    ],
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
    ],
    taskLabels: [
      {
        id: 1,
        color: 'red',
        body: 'red label',
      },
    ],
    matchLabels: [],
    removeLabels: [],
    addedLabels: [],
    inputVisible: false,
    inputValue: '',
  };

  handleShowInput = () => {
    this.setState({ inputVisible: true });
  };

  handleSelect = value => {
    // this.props.onCreate
  };

  handleSearch = value => {
    const matchLabels = value
      ? this.state.labels.filter(label => label.body.includes(value))
      : [];
    this.setState({ matchLabels });
  };

  handleBlur = inputValue => {
    this.setState({
      inputValue,
      inputVisible: false,
    });
  };

  handleChange = inputValue => {
    this.setState({ inputValue });
  };

  componentDidMount() {}

  render() {
    const {
      inputVisible,
      inputValue,
      colors,
      taskLabels,
      matchLabels,
      addedLabels,
    } = this.state;

    const children = matchLabels.map(label => (
      <Option key={label.id}>{labelElem(label)(colors, false)}</Option>
    ));

    return (
      <div className="label-unit">
        <Icon type="tags-o" />
        <div className="label-unit__box">
          {taskLabels.map(label => labelElem(label)(colors))}
          {addedLabels.map(label => labelElem(label)(colors))}
          {inputVisible && (
            <div className="label-search">
              <div className="label-search__hidden">&nbsp;{inputValue}</div>
              <AutoComplete
                className="label-search__input"
                autoFocus={true}
                onSelect={this.handleSelect}
                onSearch={this.handleSearch}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                style={{ width: '100%' }}
                dropdownMatchSelectWidth={false}
                dropdownStyle={{ width: 300 }}
                size="small"
              >
                {children}
              </AutoComplete>
            </div>
          )}
          {!inputVisible && (
            <Button
              size="small"
              type="circle"
              icon="plus"
              onClick={this.handleShowInput}
            />
          )}
        </div>
        <Tag color="#f5222d" closable onClose={() => {}}>
          red
        </Tag>
        <Tag color="#fa8c16" closable onClose={() => {}}>
          orange
        </Tag>
        <Tag color="#fadb14" closable onClose={() => {}}>
          yellow
        </Tag>
        <Tag color="#52c41a" closable onClose={() => {}}>
          green
        </Tag>
        <Tag color="#13c2c2" closable onClose={() => {}}>
          cyan
        </Tag>
        <Tag color="#1890ff" closable onClose={() => {}}>
          blue
        </Tag>
        <Tag color="#eb2f96" closable onClose={() => {}}>
          mageta
        </Tag>
        <Tag color="#722ed1" closable onClose={() => {}}>
          purple
        </Tag>
        <Tag color="#bfbfbf" closable onClose={() => {}}>
          default
        </Tag>
      </div>
    );
  }
}

export default LabelPC;
