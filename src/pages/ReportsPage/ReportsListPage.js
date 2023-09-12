import React from "react";
import { useNavigation } from "react-router-dom/dist/umd/react-router-dom.development";
import { getAuthToken } from "../../util/Auth";

function ReportsList() {
  const navigation = useNavigation();
  const token = getAuthToken();
  const isSubmitting = navigation.state === "submitting";

  const headers = {
    Authorization: "Bearer " + token,
  };

  const handleDownload = () => {
    fetch("https://inventory-accounting.onrender.com/stockholding", { headers })
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
      <div class="lg:py-24">
        <h2 class="text-3xl font-bold sm:text-4xl">This is the reports page</h2>

        <p class="mt-4 text-gray-600">
        The reports page provides essential insights and data for informed decision-making. One of the key offerings on this page is the Stock Holding Report, which allows users to access real-time information about their inventory and stock levels. This report empowers businesses to manage their resources efficiently, track product availability, and make strategic decisions regarding their stock holdings. With accurate and up-to-date information at your fingertips, you can optimize your inventory management and ensure smoother operations.
        </p>
      <button
        className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
        disabled={isSubmitting}
        onClick={handleDownload}
      >
        {isSubmitting ? "Downloading" : "Download Stock Holding Report"}
      </button>
      </div>
    </React.Fragment>
  );
}

export default ReportsList;
