import React, { Component } from 'react'
import moment from 'moment';
import axios from 'axios';
import Head from 'next/head'
import { TextField, Button, Typography } from '@material-ui/core';
import DatePicker from '../components/date-picker';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

import { Container } from '../styles/pages/Home'

interface Props { }

interface IState {
  startedDate: Date,
  endedDate: Date,
  cdbTax: Number,
  chartOptions,
  hoverData,
  total: Number
}
class Home extends Component<Props, IState>{

  public readonly state: IState = {
    startedDate: new Date('2016-11-14'),
    endedDate: new Date('2016-12-26'),
    cdbTax: 103.5,
    chartOptions: {},
    hoverData: null,
    total: 0
  }

  constructor(props) {
    super(props);

    this.state = {
      startedDate: new Date('2016-11-15'),
      endedDate: new Date('2016-12-27'),
      cdbTax: 103.5,
      chartOptions: {
        xAxis: {
          categories: [],
        },
        title: {
          text: 'Rendimentos CDB'
        },
        series: [
          {
            data: [],
            showInLegend: false,
            name: 'CDB'
          }
        ],
        plotOptions: {
          series: {
            point: {
              events: {
                mouseOver: this.setHoverData.bind(this)
              }
            }
          }
        }
      },
      hoverData: null,
      total: 0
    }
    this.startedDataPickerOnChange = this.startedDataPickerOnChange.bind(this);
    this.endedDataPickerOnChange = this.endedDataPickerOnChange.bind(this);
    this.cdbTaxTextFieldOnChance = this.cdbTaxTextFieldOnChance.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setHoverData = (e) => {
    // The chart is not updated because `chartOptions` has not changed.
    this.setState({ hoverData: e.target.category })
  }

  updateSeries = () => {
    // The chart is updated only with new options.
    this.setState({
      chartOptions: {
        series: [
          { data: this.state.chartOptions.series }
        ]
      }
    });
  }

  startedDataPickerOnChange(_, newValue) {
    const newState = this.state;
    newState.startedDate = newValue;
    this.setState(newState);
  }

  cdbTaxTextFieldOnChance(value) {
    const newState = this.state;
    if (value.target.value >= 0) {
      newState.cdbTax = value.target.value;
    }
    this.setState(newState);
  }

  async onSubmit() {
    const requestData = {
      params: {
        investmentDate: moment(this.state.startedDate).format('yyyy-MM-DD'),
        currentDate: moment(this.state.endedDate).format('yyyy-MM-DD'),
        cdbRate: this.state.cdbTax
      }
    };

    const response = await axios.get('http://localhost:3001/api/v1/cdb/calculate', requestData);

    const chartLabels = [];
    const chartValues = [];

    for (const object of response.data) {
      chartLabels.unshift(object.date);
      chartValues.unshift(object.unitPrice)
    }

    this.setState({
      chartOptions: {
        series: [
          { data: chartValues }
        ],
        xAxis: {
          categories: chartLabels,
        },
      },
      total: response.data.shift().unitPrice
    });
  }

  endedDataPickerOnChange(_, newValue) {
    const newState = this.state;
    newState.endedDate = newValue;
    this.setState(newState);
  }

  formatCurrency(value: Number) {
    return 'R$ ' + value.toFixed(2).toLocaleString();
  }

  render() {
    const { chartOptions } = this.state;
    let textTotal;
    if (this.state.total > 0) {
      textTotal = <Typography gutterBottom={true} color='primary'>Valor total da aplicação com os rendimentos:&nbsp;<b>{this.formatCurrency(this.state.total)}</b></Typography>;
    }

    return (
      <Container>
        <Head>
          <title>Calculator</title>
        </Head>
        <DatePicker label="Data Inicial" value={this.state.startedDate} onChange={this.startedDataPickerOnChange} />
        <br />
        <DatePicker label="Data Final" value={this.state.endedDate} onChange={this.endedDataPickerOnChange} />
        <br />
        <TextField
          id="cdb-percent"
          label="Taxa CDB"
          type="number"
          defaultValue={103.5}
          value={this.state.cdbTax}
          onChange={this.cdbTaxTextFieldOnChance}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: 0 } }}
        />
        <br />
        <Button size='large' color="primary" variant='contained' onClick={this.onSubmit}>Calcular</Button>
        <br />
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
        <br />
        {textTotal}
      </Container >
    )
  }
}

export default Home;
