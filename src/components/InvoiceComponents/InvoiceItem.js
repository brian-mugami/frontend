import React from "react";
import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import {
  useActionData,
  useNavigate,
} from "react-router-dom/dist/umd/react-router-dom.development";
import { Fragment } from "react";
import {
  CalendarIcon,
  ChevronDownIcon,
  PaperClipIcon,
  MapPinIcon,
  TrashIcon,
  BanknotesIcon,
  CalculatorIcon,
  PencilIcon,
  BookmarkSlashIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { getAuthToken } from "../../util/Auth";

import { Divider, List, ListItem } from "@tremor/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function InvoiceItem({ invoice }) {
  const token = useRouteLoaderData("root");
  const tokenLoader = getAuthToken();
  const submit = useSubmit();
  const navigate = useNavigate();
  const data = useActionData();
  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }
  const downloadHandler = () => {
    fetch(
      `https://flask-inventory.onrender.com/invoice/download/${invoice.id}`,
      {
        headers: {
          Authorization: "Bearer " + tokenLoader,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        if (response.status === 404) {
          window.alert("This invoice has no attachment");
        }
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(
          new Blob([blob], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `attachment_${invoice.invoice_number}`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading attachment:", error.message);
      });
  };

  function cancelHandler() {
    navigate("..");
  }

  return (
    <React.Fragment>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      {data && data.message && <p>{data.message}</p>}

      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {invoice.invoice_number}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalculatorIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {invoice.accounted}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {invoice.destination_type}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <BanknotesIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {invoice.amount}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {invoice.date}{" "}
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
             <Link to="attachment">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <PaperClipIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Attach
            </button>
            </Link>
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
                    <Link to="edit"
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
                    <Link to="attachment"
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
                    <Link to="void"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Void
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      <p className="pt-2">
        <b>Items in invoice</b>
      </p>
      <List>
        {invoice.purchase_items.map((item) => (
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
          <h1> Purchase type: {invoice.purchase_type}</h1>
        </ListItem>
        <ListItem>
          <h1>Supplier: {invoice.supplier.supplier_name}</h1>
        </ListItem>
      </List>

      <Divider />
      <p className="pt-2">
        <b> Balances </b>
      </p>
      <List>
        {invoice.supplier_balance.map((supBalance) => (
          <div>
            <ListItem>
              <h1> Amount Paid : Ksh.{supBalance.paid}</h1>
            </ListItem>
            <ListItem>
              <h1> Supplier Balance : Ksh.{supBalance.balance}</h1>
            </ListItem>
          </div>
        ))}
      </List>
      <Divider />
      <b>Payments</b>
      <List>
      <div className="flex">
        {invoice.payments.map((payment) => (
          <ListItem>

            <h1>{payment.payment_status}</h1>
            
            <h1>
              {" "}
              Amount Paid : {payment.amount} Approval Status :{" "}
              {payment.approval_status}
            </h1>
            
            <h1> Transaction code : {payment.payment_description}</h1>
            </ListItem>
           
          
        ))}
         </div>
      </List>
      <div className="py-10">
        <span className="">
          <button
            type="button"
            onClick={startDeleteHandler}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Delete
          </button>
        </span>
        {token && (
          <span className="ml-4">
            <button
              type="button"
              onClick={downloadHandler}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PaperClipIcon
                className="-ml-0.5 mr-1.5 h-5 w-5"
                aria-hidden="true"
              />
              Download
            </button>
          </span>
        )}
      </div>
    </React.Fragment>
  );
}

export default InvoiceItem;
