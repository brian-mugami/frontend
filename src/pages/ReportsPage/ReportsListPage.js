import React from "react";
import {
  useNavigation,
} from "react-router-dom/dist/umd/react-router-dom.development";
import { getAuthToken } from "../../util/Auth";

function ReportsList() {

  const navigation = useNavigation();
  const token = getAuthToken()
  const isSubmitting = navigation.state === "submitting";

  const headers = {
    Authorization: 'Bearer ' + token
  };

  const handleDownload = () => {
    fetch("/stockholding", {headers})
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        window.alert("Download Failed");
      })
      .then((blob) => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        const filename = `stock_holding_report_${formattedDate}.xlsx`;

        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = filename;
        link.click();
      })
      .catch((error) => {
        window.alert("An error occurred");
      });
  };
  return (
    <React.Fragment>
      <h1>This is the reports page</h1>
      <button className="btn btn-primary" disabled={isSubmitting} onClick={handleDownload}>{isSubmitting ? "Downloading" : "Download Stock Holding Report"}</button>
    </React.Fragment>
  );
}

export default ReportsList;
