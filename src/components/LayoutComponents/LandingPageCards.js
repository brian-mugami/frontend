import { Card, Metric, Text, Flex, Callout, Color, Grid } from "@tremor/react";

import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";

const categories: {
  title: string;
  metric: string;
  metricPrev: string;
  delta: string;
  status: string;
  color: Color;
  text: string;
  icon: any;
}[] = [
  {
    title: "Sales",
    metric: "$ 12,699",
    metricPrev: "$ 9,456",
    delta: "+34.3%",
    status: "Overperforming",
    color: "emerald",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.",
    icon: ArrowTrendingUpIcon,
  },
  {
    title: "Profit",
    metric: "$ 40,598",
    metricPrev: "$ 45,564",
    delta: "-10.9%",
    status: "Underperforming",
    color: "amber",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.",
    icon: ArrowTrendingDownIcon,
  },
  {
    title: "Customers",
    metric: "1,016",
    metricPrev: "1,001",
    delta: "+1.3%",
    status: "Performing as usual",
    color: "blue",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.",
    icon: ArrowLongRightIcon,
  },
];

export default function LandingPageCards() {
  return (
    <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
      {categories.map((item) => (
        <Card key={item.title}>
          <Text>{item.title}</Text>
          <Flex justifyContent="start" alignItems="baseline" className="space-x-3 truncate">
            <Metric>{item.metric}</Metric>
            <Text>from {item.metricPrev}</Text>
          </Flex>
          <Callout
            className="mt-6"
            title={`${item.status} (${item.delta})`}
            icon={item.icon}
            color={item.color}
          >
            {item.text}
          </Callout>
        </Card>
      ))}
    </Grid>
  );
}