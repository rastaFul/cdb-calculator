import React, { Component, useState } from "react";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';


interface DateConfig {
  label: string;
  value: Date;
  onChange;
}

class DatePicker extends Component<DateConfig> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
        <KeyboardDatePicker
          label={this.props.label}
          clearable
          value={this.props.value}
          placeholder="2016-11-14"
          onChange={this.props.onChange}
          minDate={new Date('2010-01-05')}
          maxDate={new Date('2019-12-03')}
          format="yyyy-MM-DD"
        />
      </MuiPickersUtilsProvider>
    )
  }
}

export default DatePicker;