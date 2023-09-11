import React, { useEffect, useState } from 'react'
import { Card, Title, LineChart } from "@tremor/react";


const chartdata = [
    {
        year: 2014,
        "Export Growth Rate":  3.53,
        "Import Growth Rate": 0.08,
      },
      {
        year: 2015,
        "Export Growth Rate": 1.04,
        "Import Growth Rate": 1.53,
      },
      {
        year: 2016,
        "Export Growth Rate": 1.54,
        "Import Growth Rate": 1.53,
      },
      {
        year: 2017,
        "Export Growth Rate": 2.04,
        "Import Growth Rate": 1.52,
      },
      {
        year: 2018,
        "Export Growth Rate": 2.59,
        "Import Growth Rate": 1.49,
      },
    {
      year: 2019,
      "Export Growth Rate": 2.04,
      "Import Growth Rate": 1.63,
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
    
  
  ];
  
  const dataFormatter = (number: number) => `${Intl.NumberFormat("us").format(number).toString()}%`;


function LandingPageChart() {
  const [modifiedChartData, setModifiedChartData] = useState(chartdata);

  useEffect(() => {
    const interval = setInterval(() => {
      // Create a new array with updated values
      const updatedChartData = modifiedChartData.map(item => ({
        ...item,
        "Export Growth Rate": item["Export Growth Rate"] + 0.5,
        "Import Growth Rate": item["Import Growth Rate"] - 0.5,
      }));

      setModifiedChartData(updatedChartData);
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [modifiedChartData]);




  return (
    <div>
    <Card>
      <Title>Responsive Data analysis tools</Title>
      <LineChart
        className="mt-6"
        data={modifiedChartData}
        index="year"
        categories={["Export Growth Rate", "Import Growth Rate"]}
        colors={["red", "gray"]}
        valueFormatter={dataFormatter}
       
        yAxisWidth={40}
      />
    </Card>
  </div>
  )
}

export default LandingPageChart