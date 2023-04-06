import { json, useLoaderData } from "react-router-dom";
import InvoiceForm from "../../components/PurchasingComponents/InvoiceForm";
import { getAuthToken } from "../../util/Auth";

function NewInvoicePage() {
  const suppliers = useLoaderData()
  return <InvoiceForm method="post" title="Invoice" suppliers={suppliers} />;
}

export default NewInvoicePage;

export async function Loader(){
  const token = getAuthToken()
  const response = await fetch("/supplier", {
      method:"get",
      headers:{
          "Authorization": "Bearer "+ token
      }
  })
  if(!response.ok){
      throw json({message:"Cant get suppliers"}, {status:500})
  }else{
      const resData = await response.json()
      return resData
  };
}