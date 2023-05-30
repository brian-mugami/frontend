import React from "react";
import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import {
  useActionData,
  useNavigate,
} from "react-router-dom/dist/umd/react-router-dom.development";
import { Fragment } from "react";
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { getAuthToken } from "../../util/Auth";


import { List, ListItem, Title } from "@tremor/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function InvoiceItem({ invoice }) {
  const token = useRouteLoaderData("root");
  const tokenLoader = getAuthToken()
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
    fetch(`/invoice/download/${invoice.id}`, {
      headers: {
        Authorization : 'Bearer ' + tokenLoader
      }
    })
      .then(response => {
        if (response.ok) {
          return response.blob();
        }
        if (response.status === 404){
          window.alert("This invoice has no attachment")
        };
      })
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `attachment_${invoice.invoice_number}`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(error => {
        console.error('Error downloading attachment:', error.message);
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
              <BriefcaseIcon
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
              <CurrencyDollarIcon
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
          <span className="hidden sm:block">
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
            <Link to="void">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <LinkIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Void
              </button>
            </Link>
          </span>

          <span className="sm:ml-3">
            <button
              type="button"
              onClick={startDeleteHandler}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckIcon
                className="-ml-0.5 mr-1.5 h-5 w-5"
                aria-hidden="true"
              />
              Delete
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
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      <p className="pt-2">
        {" "}
        <b>Items in invoice</b>
      </p>
      <List>
        {invoice.purchase_items.map((item) => (
          <ListItem>
            {item.item.item_name}  {"    "}  {"    "} {item.item.item_unit}  {item.item.unit_type}  selling price : {item.item.price} buying price
            : {item.buying_price} Quantity ordered : {item.item_quantity}{" "}
          </ListItem>
        ))}
      </List>
      <h1>{invoice.purchase_type}</h1>
      <h1>Supplier : {invoice.supplier.supplier_name}</h1>
      <p className="pt-2">
        <b> Balances </b>
      </p>
      {invoice.supplier_balance.map((supBalance) => (
        <div>
          {" "}
          <h1> Amount Paid : {supBalance.paid}</h1>
          <h1> Supplier Balance : {supBalance.balance}</h1>
        </div>
      ))}

      <b>Payments</b>
      <List>
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
      </List>

      <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start"></div>
      {token && (
        <menu>
          <div className="flex">
            <div className="pr-5">
              <Link
                to="attachment"
                className="rounded-md bg-red-300  px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Add attachment
              </Link>
            </div>
            <div className="pr-5">
              <button onClick={downloadHandler}>Download attachment</button>
            </div>
            <div className="pr-5">
              <button className="btn btn-warning" onClick={cancelHandler}>
                Back
              </button>
            </div>
          </div>
        </menu>
      )}
    </React.Fragment>
  );
}

export default InvoiceItem;
