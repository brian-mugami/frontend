import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

export function StatisticsCard({ color, icon, title, value, footer, suppliers, sales }) {
  return (
    <div>
      <div>
        <Card>
          <CardHeader
            variant="gradient"
            color="blue"
            className="absolute -mt-4 grid h-16 w-16 place-items-center"
          >
            <UsersIcon />
          </CardHeader>
          <CardBody className="p-4 text-right">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              Total Suppliers
            </Typography>
            <Typography variant="h4" color="blue-gray">
              {suppliers.suppliers}
            </Typography>
          </CardBody>
          {footer && (
            <CardFooter className="border-t border-blue-gray-50 p-4">
              Suppliers
            </CardFooter>
          )}
          ;
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader
            variant="gradient"
            color="blue"
            className="absolute -mt-4 grid h-16 w-16 place-items-center"
          >
            <UsersIcon />
          </CardHeader>
          <CardBody className="p-4 text-right">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              Total Sales
            </Typography>
            <Typography variant="h4" color="blue-gray">
              {sales.Sales}:{sales.Amount}
            </Typography>
          </CardBody>
          {footer && (
            <CardFooter className="border-t border-blue-gray-50 p-4">
              Test
            </CardFooter>
          )}
          ;
        </Card>
      </div>
    </div>
  );
}
