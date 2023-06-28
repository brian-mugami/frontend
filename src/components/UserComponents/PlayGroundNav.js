
The code below uses react js and tremor react , add a const dailySales so that you can potray  sales per day

import React from "react";


import { Card, Metric, Text, Title, BarList, Flex, Grid } from "@tremor/react";
import PropTypes from "prop-types";
import { json, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import { defer } from "react-router-dom/dist/umd/react-router-dom.development";

const website = [
  { name: "/home", value: 1230 },
  { name: "/contact", value: 751 },
  { name: "/gallery", value: 471 },
  { name: "/august-discount-offer", value: 280 },
  { name: "/case-studies", value: 78 },
];



const data = [
  {
    category: "Website",
    stat: "10,234",
    data: website,
  },

];

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export default function PlayGround() {
  return (
    <Grid numColsSm={2} numColsLg={3} className="gap-6">
      {data.map((item) => (
        <Card key={item.category}>
          <Title>{item.category}</Title>
          <Flex
            justifyContent="start"
            alignItems="baseline"
            className="space-x-2"
          >
            <Metric>{item.stat}</Metric>
            <Text>Total views</Text>
          </Flex>
          <Flex className="mt-6">
            <Text>Pages</Text>
            <Text className="text-right">Views</Text>
          </Flex>
          <BarList
            data={item.data}
            valueFormatter={dataFormatter}
            className="mt-2"
          />
        </Card>
      ))}
    </Grid>
  );
}


async function dailySalesLoader() {
    const token = getAuthToken();
    const response = await fetch(
      "https://flask-inventory.onrender.com/transaction/sales/per_day",
      {
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (!response.ok) {
      throw json({ message: "Suppliers Server Error" }, { status: 500 });
    } else {
      const resData = await response.json();
      return resData;
    }
  }

  export async function dashboardLoader() {
    return defer({
     
      dailySales: await dailySalesLoader(),
    });
  }