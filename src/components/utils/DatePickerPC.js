import { Form, DatePicker, TimePicker, Button } from 'antd';
import React from 'react';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

class DatePickerPC extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      const rangeValue = fieldsValue['range-picker'];
      const rangeTimeValue = fieldsValue['range-time-picker'];
      const values = {
        ...fieldsValue,
        'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
        'range-picker': [
          rangeValue[0].format('YYYY-MM-DD'),
          rangeValue[1].format('YYYY-MM-DD'),
        ],
      };
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const config = {
      rules: [
        { type: 'object', required: true, message: 'Please select time!' },
      ],
    };
    const rangeConfig = {
      rules: [
        { type: 'array', required: true, message: 'Please select time!' },
      ],
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="DatePicker">
          {getFieldDecorator('date-picker', config)(<DatePicker />)}
        </FormItem>

        <FormItem label="RangePicker">
          {getFieldDecorator('range-picker', rangeConfig)(<RangePicker />)}
        </FormItem>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    );
  }
} //class end

export default DatePickerPC;
