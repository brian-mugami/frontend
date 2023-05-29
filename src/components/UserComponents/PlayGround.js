import React, { useEffect, useState } from "react";
import {
  Card,
  Metric,
  AreaChart,
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
import { defer } from "react-router-dom/dist/umd/react-router-dom.development";

function PlayGround() {
  const { suppliers, sales, purchases, dailySales, dailyPurchases , dailyExpenses} =
    useLoaderData();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    {
      const updatedCategories = [
        {
          title: "Total Sales Amount",
          metric: sales.Amount,
          metricPrev: sales.Sales,
          delta: "25.3%",
          deltaType: "moderateIncrease",
        },
        {
          title: "Total Purchase Amount",
          metric: purchases.Amount,
          metricPrev: purchases.Purchases,
          delta: "25.3%",
          deltaType: "moderateIncrease",
        },
        {
          title: "Profit Today",
          metric: purchases.Amount,
          metricPrev: purchases.Purchases,
          delta: "25.3%",
          deltaType: "moderateIncrease",
        },
      ];
      setCategories(updatedCategories);
    }
  }, [purchases, sales]);

  return (
    <div>
      <header className="bg-white shadow"></header>

      <Flex>
        <Grid numColsSm={2} numColsLg={3} className="gap-6">
          {categories.map((item) => (
            <Card key={item.title}>
              <Flex alignItems="start">
                <Text>{item.title}</Text>
                <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
              </Flex>
              <Flex
                justifyContent="start"
                alignItems="baseline"
                className="truncate space-x-3"
              >
                <Metric>Ksh.{item.metric}</Metric>
                <Text className="truncate">Transactions {item.metricPrev}</Text>
              </Flex>
            </Card>
          ))}
        </Grid>
      </Flex>

      <div></div>
    </div>
  );
}

export default PlayGround;

async function salesLoader() {
  const token = getAuthToken();
  const response = await fetch(
    "https://flask-inventory.onrender.com/transaction/sales",
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
    console.log(resData);
    return resData;
  }
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
    console.log(resData);
    return resData;
  }
}

async function dailyExpensesLoader() {
  const token = getAuthToken();
  const response = await fetch(
    "https://flask-inventory.onrender.com/transaction/expenses/per_day",
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
    console.log(resData);
    return resData;
  }
}

async function purchaseLoader() {
  const token = getAuthToken();
  const response = await fetch(
    "https://flask-inventory.onrender.com/transaction/purchase",
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
    console.log(resData);
    return resData;
  }
}

async function dailyPurchasesLoader() {
  const token = getAuthToken();
  const response = await fetch(
    "https://flask-inventory.onrender.com/transaction/purchases/per_day",
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
    console.log(resData);
    return resData;
  }
}

async function countLoader() {
  const token = getAuthToken();
  const response = await fetch(
    "https://flask-inventory.onrender.com/supplier/count",
    {
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  if (!response.ok) {
    throw json({ message: "Sales Server Error" }, { status: 500 });
  } else {
    const resData = await response.json();
    console.log(resData);
    return resData;
  }
}

export async function dashboardLoader() {
  return defer({
    suppliers: await countLoader(),
    sales: await salesLoader(),
    purchases: await purchaseLoader(),
    dailySales: await dailySalesLoader(),
    dailyPurchases: await dailyPurchasesLoader(),
    dailyExpenses: await dailyExpensesLoader(),
  });
}
