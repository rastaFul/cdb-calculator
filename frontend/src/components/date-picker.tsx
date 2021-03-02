import React, { Component, useState } from "react";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';


interface DateConfig {
  label: string;
}

function BasicDatePicker(props: DateConfig) {
  const [selectedDate, handleDateChange] = useState(new Date('2016-11-14'));

  const handleStartDateChange = async nextStartDate => {
    nextStartDate = moment.utc(nextStartDate).startOf('day');
    handleDateChange(nextStartDate);
  };

  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
      <KeyboardDatePicker
        label={props.label}
        clearable
        value={selectedDate}
        placeholder="14/11/2016"
        onChange={date => handleStartDateChange(date)}
        minDate={new Date('2010-01-05')}
        maxDate={new Date('2019-12-03')}
        format="DD/MM/yyyy"
      />
    </MuiPickersUtilsProvider>
  );
}

class DatePicker extends Component<DateConfig> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BasicDatePicker label={this.props.label} />
    )
  }
}

export default DatePicker;