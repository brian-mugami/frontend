import React from 'react'
import { Card, Title, LineChart } from "@tremor/react";

const chartdata = [
  {
    year: 2019,
    "Export Growth Rate": 2.04,
    "Import Growth Rate": 1.53,
  },
  {
    year: 2020,
    "Export Growth Rate": 1.96,
    "Import Growth Rate": 1.58,
  },
  {
    year: 2021,
    "Export Growth Rate": 1.96,
    "Import Growth Rate": 1.61,
  },
  {
    year: 2022,
    "Export Growth Rate": 1.93,
    "Import Growth Rate": 1.61,
  },
  {
    year: 2023,
    "Export Growth Rate": 1.88,
    "Import Growth Rate": 1.67,
  },
  //...
];

const dataFormatter = (number: number) => `${Intl.NumberFormat("us").format(number).toString()}%`;

function LandingPageChart() {
  return (
    <div>
        <Card>
    <Title>Responsive data analytics tools</Title>
    <LineChart
      className="mt-6"
      data={chartdata}
      index="year"
      categories={["Export Growth Rate", "Import Growth Rate"]}
      colors={["cyan", "gray"]}
      valueFormatter={dataFormatter}
      yAxisWidth={40}
    />
  </Card>
      
    </div>
  )
}

export default LandingPageChart