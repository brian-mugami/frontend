import {
    Await,
    defer,
    json,
    redirect,
    useRouteLoaderData,
  } from "react-router-dom";
  import React, { Suspense } from "react";
  import Accountitem from "../../components/AccountComponents/AccountItem";
  import { getAuthToken } from "../../util/Auth";
  
  function ExpenseAccountDetailPage() {
    const { account } = useRouteLoaderData("expense-account-detail");
  
    return (
      <React.Fragment>
        <Suspense fallback={ <button
      type="button"
      className="bg-indigo-500 text-white px-4 py-2 rounded-full flex items-center justify-center"
      disabled
    >
      <svg
        className="animate-spin h-5 w-5 mr-3 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8 8 0 0112 4.001V0c-4.418 0-8 3.582-8 7.999h4zM12 20.001a8 8 0 01-8-8h-4c0 4.417 3.582 8 8 8v-4zm0-16.002a8 8 0 018 8h4c0-4.418-3.582-8-8-8v4z"
        ></path>
      </svg>
      Processing...
    </button>}>
          <Await resolve={account}>
            {(loadedAccount) => (
              <Accountitem account={loadedAccount} title="Expense" />
            )}
          </Await>
        </Suspense>
      </React.Fragment>
    );
  }
  
  export default ExpenseAccountDetailPage;
  
  async function loadAccount(id) {
    const token = getAuthToken();
    const response = await fetch("https://inventory-accounting.onrender.com/expense/account/" + id, {
      headers: {
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",

      },
    });
    if (!response.ok) {
      throw json(
        { message: "Could not fetch expense account" },
        { status: 500 }
      );
    } else {
      const resData = await response.json();
      return resData;
    }
  }
  
  export async function loader({ request, params }) {
    const id = params.id;
    return defer({
      account: await loadAccount(id),
    });
  }
  
  export async function action({ request, params }) {
    const token = getAuthToken();
    const id = params.id;
    const response = await fetch("https://inventory-accounting.onrender.com/expense/account/" + id, {
      method: request.method,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      throw json(
        { message: "Could not delete account." },
        {
          status: 500,
        }
      );
    }
    return redirect("/account/expense");
  }
  