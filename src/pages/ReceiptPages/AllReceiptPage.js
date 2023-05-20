import React from "react";
import { Suspense } from "react";
import { Await, json, defer, useRouteLoaderData } from "react-router";
import { getAuthToken } from "../../util/Auth";
import ReceiptList from "../../components/ReceiptComponents/ReceiptList";

function AllReceiptsPage() {
  const { receipts } = useRouteLoaderData("receipts");
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading....</p>}>
      <Await resolve={receipts}>
        {(loadedReceipts) => (
          <ReceiptList receipts={loadedReceipts} title="Receipts" />
        )}
      </Await>
    </Suspense>
  );
}

export default AllReceiptsPage;

async function ReceiptLoader() {
  const token = getAuthToken();

  const response = await fetch("https://flask-inventory.onrender.com/receipt", {
    method: "get",
    headers: {
      "Authorization": "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  });
  if (!response.ok) {
    throw json({ message: "Could not fetch receipts" }, { status: 500 });
  } else {
    const resData = await response.json();
    if (resData.status === 401) {
      throw json({ message: "You are not authorized" }, { status: 401 });
    }
    return resData;
  }
}

export async function loader() {
  return defer({
    receipts: await ReceiptLoader(),
  });
}
