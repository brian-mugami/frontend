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

  const response = await fetch("/receipt", {
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
    console.log(resData)

    return resData;
  }
}

export async function loader() {
  return defer({
    receipts: await ReceiptLoader(),
  });
}
