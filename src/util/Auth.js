import { redirect } from "react-router-dom";
import {
  defer,
  json,
} from "react-router-dom/dist/umd/react-router-dom.development";

export function getTokenDuration() {
  const storedexpiration = localStorage.getItem("expiration");
  const expirationdate = new Date(storedexpiration);
  const now = new Date();
  const duration = expirationdate.getTime() - now.getTime();
  return duration;
}
export function getAuthToken() {
  const token = localStorage.getItem("access_token");
  const tokenDuration = getTokenDuration();

  if (!token) {
    return null;
  }
  if (tokenDuration < 0) {
    return null;
  }
  return token;
}

async function tokenChecker() {
  return getAuthToken();
}

export function checkToken() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth?mode=login");
  }
}

async function salesLoader() {
  const token = getAuthToken();
  const response = await fetch("/transaction/sales", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if(response.status === 401){
    return
  }
  if (!response.ok) {
    throw json({ message: "Sales Server Error" }, { status: 500 });
  } else {
    const resData = await response.json();

    return resData;
  }
}

async function dailySalesLoader() {
  const token = getAuthToken();
  const response = await fetch("/transaction/sales/per_day", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if(response.status === 401){
    return
  }
  if (!response.ok) {
    throw json({ message: "Sales Server Error" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
}

async function dailyExpensesLoader() {
  const token = getAuthToken();
  const response = await fetch("/transaction/expenses/per_day", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if(response.status === 401){
    return
  }
  if (!response.ok) {
    throw json({ message: "Daily Expenses Server Error" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
}

async function purchaseLoader() {
  const token = getAuthToken();
  const response = await fetch("/transaction/purchase", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if(response.status === 401){
    return
  }
  if (!response.ok) {
    throw json({ message: "Purchases Server Error" }, { status: 500 });
  } else {
    const resData = await response.json();

    return resData;
  }
}

async function dailyPurchasesLoader() {
  const token = getAuthToken();
  const response = await fetch("/transaction/purchases/per_day", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if(response.status === 401){
    return
  }
  if (!response.ok) {
    throw json({ message: "Daily Purchases Server Error" }, { status: 500 });
  } else {
    const resData = await response.json();

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
  if(response.status === 401){
    return
  }
  if (!response.ok) {
    throw json({ message: "Sales Server Error" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
}

async function inventoryValueLoader() {
  const token = getAuthToken();
  const response = await fetch("/transaction/inventory-count", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  });
  if(response.status === 401){
    return
  }
  if (!response.ok) {
    throw json({ message: "Inventory Server Error" }, { status: 500 });
  } else {
    const resData = await response.json();

    return resData;
  }
}

async function monthlySalesLoader() {
  const token = getAuthToken();
  const response = await fetch("/transaction/sales/month", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  });
  if(response.status === 401){
    return
  }
  if (!response.ok) {
    throw json({ message: "Monthly sales Server Error" }, { status: 500 });
  } else {
    const resData = await response.json();

    return resData;
  }
}

async function monthlyPurchasesLoader() {
  const token = getAuthToken();
  const response = await fetch("/transaction/purchase/month", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  });
  if(response.status === 401){
    return
  }
  if (!response.ok) {
    throw json({ message: "Monthly sales Server Error" }, { status: 500 });
  } else {
    const resData = await response.json();

    return resData;
  }
}

async function purchasesCreditLoader() {
  const token = getAuthToken();
  const response = await fetch("/transaction/purchase/credit", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  });
  if(response.status === 401){
    return
  }
  if (!response.ok) {
    throw json({ message: "credit Server Error" }, { status: 500 });
  } else {
    const resData = await response.json();

    return resData.invoices;
  }
}

async function salesCreditLoader() {
  const token = getAuthToken();
  const response = await fetch("/transaction/sales/credit", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  });
  if(response.status === 401){
    return
  }
  if (!response.ok) {
    throw json({ message: "credit Server Error" }, { status: 500 });
  } else {
    const resData = await response.json();

    return resData.receipts;
  }
}

async function currentUserLoader() {
  const token = getAuthToken();
  const response = await fetch("/current-user", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  });
  if(response.status === 401){
    return
  }
  if (!response.ok) {
    throw json({ message: "credit Server Error" }, { status: 500 });
  } else {
    const resData = await response.json();
    console.log(resData);
    return resData;
  }
}

export async function dashboardLoader() {
  return defer({
    token: await tokenChecker(),
    user: await currentUserLoader(),
    suppliers: await countLoader(),
    sales: await salesLoader(),
    purchases: await purchaseLoader(),
    dailySales: await dailySalesLoader(),
    dailyPurchases: await dailyPurchasesLoader(),
    dailyExpenses: await dailyExpensesLoader(),
    monthlySales: await monthlySalesLoader(),
    monthlyPurchases: await monthlyPurchasesLoader(),
    inventoryValue: await inventoryValueLoader(),
    salesCredit: await salesCreditLoader(),
    purchaseCredit: await purchasesCreditLoader(),
  });
}
