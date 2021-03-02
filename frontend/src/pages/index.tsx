import React from 'react'
import Head from 'next/head'
import { TextField, Button } from '@material-ui/core';
import DatePicker from '../components/date-picker';
import Chart from '../components/chart';


import { Container } from '../styles/pages/Home'

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <link rel="shortcut icon" href="../assets/favicon.ico" />
        <title>Calculator</title>
      </Head>
      <DatePicker label="Data Inicial" />
      <DatePicker label="Data Final" />
      <TextField
        id="cdb-percent"
        label="Taxa CDB"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{ inputProps: { min: 0 } }}
      />
      <Button color="primary">Calcular</Button>
      <Chart/>
    </Container>
  )
}

export default Home;
