import React from "react";
import {
    Card,
    Metric,
    AreaChart ,
    Text,
    Title,
    Flex,
    BadgeDelta,
    DeltaType,
    BarList,
    Color,
    Grid,
  } from "@tremor/react";
  import PropTypes from "prop-types";
import { json, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../../util/Auth";

//data for top cards
const colors: { [key: string]: Color } = {
    increase: "emerald",
    moderateIncrease: "emerald",
    unchanged: "orange",
    moderateDecrease: "rose",
    decrease: "rose",
  };
  
  const category: {
    title: string;
    metric: string;
    metricPrev: string;
    delta: string;
    deltaType: DeltaType;
  }[] = [
    {
      title: "Sales",
      metric: "$ 12,699",
      metricPrev: "$ 9,456",
      delta: "34.3%",
      deltaType: "moderateIncrease",
    },
    {
      title: "Profit",
      metric: "$ 40,598",
      metricPrev: "$ 45,564",
      delta: "10.9%",
      deltaType: "moderateDecrease",
    },
    {
      title: "Customers",
      metric: "1,072",
      metricPrev: "856",
      delta: "25.3%",
      deltaType: "moderateIncrease",
    },
  ];


 //data for section below the cards
  const website = [
    { name: "/home", value: 1230 },
    { name: "/contact", value: 751 },
    { name: "/gallery", value: 471 },
    { name: "/august-discount-offer", value: 280 },
    { name: "/case-studies", value: 78 },
  ];
  
  const shop = [
    { name: "/home", value: 453 },
    { name: "/imprint", value: 351 },
    { name: "/shop", value: 271 },
    { name: "/pricing", value: 191 },
  ];
  
  const app = [
    { name: "/shop", value: 789 },
    { name: "/product-features", value: 676 },
    { name: "/about", value: 564 },
    { name: "/login", value: 234 },
    { name: "/downloads", value: 191 },
  ];
  
  const datas = [
    {
      category: "Website",
      stat: "10,234",
      data: website,
    },
    {
      category: "Online Shop",
      stat: "12,543",
      data: shop,
    },
    {
      category: "Mobile App",
      stat: "2,543",
      data: app,
    },
  ];
  const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();


  //areachart components
  const chartdata = [
    {
      date: "Jan 22",
      SemiAnalysis: 2890,
      "The Pragmatic Engineer": 2338,
    },
    {
      date: "Feb 22",
      SemiAnalysis: 2756,
      "The Pragmatic Engineer": 2103,
    },
    {
      date: "Mar 22",
      SemiAnalysis: 3322,
      "The Pragmatic Engineer": 2194,
    },
    {
      date: "Apr 22",
      SemiAnalysis: 3470,
      "The Pragmatic Engineer": 2108,
    },
    {
      date: "May 22",
      SemiAnalysis: 3475,
      "The Pragmatic Engineer": 1812,
    },
    {
      date: "Jun 22",
      SemiAnalysis: 3129,
      "The Pragmatic Engineer": 1726,
    },
  ];
  
  const dataFormatter2 = (number: number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
  };



function PlayGround() {

    const data = useLoaderData();



  return (
    <div>
    <div>
    <Grid  class="grid grid-cols-1 md:grid-cols-4 gap-4">
      {category.map((item) => (
        <Card key={item.title}>
          <Text>{item.title}</Text>
          <Flex
            justifyContent="start"
            alignItems="baseline"
            className="truncate space-x-3"
          >
            <Metric>{item.metric}</Metric>
            <Text className="truncate">from {item.metricPrev}</Text>
          </Flex>
          <Flex justifyContent="start" className="space-x-2 mt-4">
            <BadgeDelta deltaType={item.deltaType} />
            <Flex justifyContent="start" className="space-x-1 truncate">
              <Text color={colors[item.deltaType]}>{item.delta}</Text>
              <Text className="truncate"> to previous month </Text>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Grid>
    </div>
    <div className="pt-5">
    <Grid  className=" grid grid-cols-1 md:grid-cols-3 gap-4">
      {datas.map((item) => (
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

    </div>
    <div className="pt-5">
    <Card>
    <Title>Newsletter revenue over time (USD)</Title>
    <AreaChart
      className="h-72 mt-4"
      data={chartdata}
      index="date"
      categories={["SemiAnalysis", "The Pragmatic Engineer"]}
      colors={["indigo", "cyan"]}
      valueFormatter={dataFormatter2}
    />
  </Card>

    </div>
    </div>
  );
}

export default PlayGround;


export async function countLoader() {
    const token = getAuthToken();
    const response = await fetch("/supplier/count", {
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      throw json({ message: "Cant get number of suppliers" }, { status: 500 });
    } else {
      const resData = await response.json();
      return resData;
    }
  }
