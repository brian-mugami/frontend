import { Button, Divider, Flex, List, ListItem } from "@tremor/react";
import React from "react";
import {
  Link,
  useNavigate,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  PaperClipIcon,
  MapPinIcon,
  TrashIcon,
  BanknotesIcon,
  CalculatorIcon,
  PencilIcon,
  BookmarkSlashIcon,
  ChevronLeftIcon,
  LinkIcon,
  PrinterIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { getAuthToken } from "../../util/Auth";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ReceiptItem({ receipt, id }) {
  const token = useRouteLoaderData("root");
  const submit = useSubmit();
  const navigate = useNavigate();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  async function printReceiptHandler() {
    const token = getAuthToken();

    try {
      const response = await fetch(
        `https://inentory-test.onrender.com/receipt/download/test/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "receipt " + receipt.receipt_number;
        link.click();
      } else {
        console.error("Failed to download receipt PDF");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  }

  function cancelHandler() {
    navigate("..");
  }

  return (
    <React.Fragment>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {receipt.receipt_number}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalculatorIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {receipt.accounted}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {receipt.destination_type}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <BanknotesIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {receipt.amount}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {receipt.date}{" "}
            </div>
          </div>
        </div>

        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="ml-3 hidden  sm:block">
            <Link to="edit">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <PencilIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Edit
              </button>
            </Link>
          </span>

          <span className="ml-3 hidden sm:block">
            <button
              type="button"
              onClick={printReceiptHandler}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <PrinterIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Print
            </button>
          </span>

          <span className="ml-3 hidden sm:block">
            <Link to="void">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <BookmarkSlashIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Void
              </button>
            </Link>
          </span>
          <span className="ml-3 hidden sm:block">
            <button
              type="button"
              onClick={startDeleteHandler}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <TrashIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Delete
            </button>
          </span>

          <span className="sm:ml-5">
            <button
              type="button"
              onClick={cancelHandler}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <ChevronLeftIcon
                className="-ml-0.5 mr-1.5 h-5 w-5"
                aria-hidden="true"
              />
              Back
            </button>
          </span>

          {/* Dropdown */}
          <Menu as="div" className="relative ml-3 sm:hidden">
            <Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
              More
              <ChevronDownIcon
                className="-mr-1 ml-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="edit"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Edit
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="attachment"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Attach
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="void"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Void
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={startDeleteHandler}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>


      <p className="pt-2">
        <b>Items in receipt</b>
      </p>
      <List>
        {receipt.sale_items.map((item) => (
          <div>
            <ListItem>
              {item.item.item_name} {item.item.item_unit} {item.item.unit_type}
            </ListItem>
            <ListItem>
              Selling price: {item.item.price} Buying price: {item.buying_price}
            </ListItem>
            <ListItem>Quantity ordered: {item.item_quantity}</ListItem>
          </div>
        ))}
      </List>
      <Divider />

      <List>
        <ListItem>
          <h1> Sale type: {receipt.sale_type}</h1>
        </ListItem>
        <ListItem>
          <h1>customer: {receipt.customer.customer_name}</h1>
        </ListItem>
      </List>

      <Divider />
      <p className="pt-2">
        <b> Balances </b>
      </p>
      <List>
        {receipt.customer_balance.map((custBalance) => (
          <div>
            <ListItem>
              <h1> Amount Paid : Ksh.{custBalance.paid}</h1>
            </ListItem>
            <ListItem>
              <h1> Customer Balance : Ksh.{custBalance.balance}</h1>
            </ListItem>
          </div>
        ))}
      </List>
      <Divider />















      
    </React.Fragment>
  );
}

export default ReceiptItem;
