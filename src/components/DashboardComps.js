import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { ClockIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "../widgets/cards/statistics-card";
import { StatisticsChart } from "../widgets/charts/statistics-chart";
import { statisticsCardsData } from "../data/statistics-cards-data";
import { statisticsChartsData } from "../data/statistics-charts-data";
import { ordersOverviewData } from "../data/orders-overview-data";
import { json, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../util/Auth";
import { defer } from "react-router-dom/dist/umd/react-router-dom.development";

export function DashboardComps() {
  const {suppliers, sales} = useLoaderData();

  return (
    <div className="flex-wrap">
      <div className="mt-12">
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
            <StatisticsCard
              key={title}
              {...rest}
              title={title}
              suppliers ={suppliers}
              sales ={sales}
              icon={React.createElement(icon, {
                className: "w-6 h-6 text-white",
              })}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  <strong className={footer.color}>{footer.value}</strong>
                  &nbsp;{footer.label}
                </Typography>
              }
            />
          ))}
        </div>
        <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          {statisticsChartsData.map((props) => (
            <StatisticsChart
              key={props.title}
              {...props}
              footer={
                <Typography
                  variant="small"
                  className="flex items-center font-normal text-blue-gray-600"
                >
                  <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                  &nbsp;{props.footer}
                </Typography>
              }
            />
          ))}

          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 p-6"
            >
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Orders Overview
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <ArrowUpIcon
                  strokeWidth={3}
                  className="h-3.5 w-3.5 text-green-500"
                />
                <strong>24%</strong> this month
              </Typography>
            </CardHeader>
            <CardBody className="pt-0">
              {ordersOverviewData.map(
                ({ icon, color, title, description }, key) => (
                  <div key={title} className="flex items-start gap-4 py-3">
                    <div
                      className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                        key === ordersOverviewData.length - 1
                          ? "after:h-0"
                          : "after:h-4/6"
                      }`}
                    >
                      {React.createElement(icon, {
                        className: `!w-5 !h-5 ${color}`,
                      })}
                    </div>
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-medium"
                      >
                        {title}
                      </Typography>
                      <Typography
                        as="span"
                        variant="small"
                        className="text-xs font-medium text-blue-gray-500"
                      >
                        {description}
                      </Typography>
                    </div>
                  </div>
                )
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardComps;

<<<<<<< HEAD
async function salesLoader(){
  const token = getAuthToken();
  const response = await fetch("/transaction/sales", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    throw json({ message: "Suppliers Server Error" }, { status: 500 });
  } else {
    const resData = await response.json();
    console.log(resData)
    return resData;
  }
}

async function countLoader() {
  const token = getAuthToken();
  const response = await fetch("/supplier/count", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  });
  if (!response.ok) {
    throw json({ message: "Sales Server Error" }, { status: 500 });
  } else {
    const resData = await response.json();
    console.log(resData)
    return resData;
  }
}

export async function dashboardLoader() {
  return defer({
    suppliers: await countLoader(),
    sales: await salesLoader(),
  });
}
=======

>>>>>>> 38590accd60be56c6e387dcbc56555bd8d893a49


