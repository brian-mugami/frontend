import React, { useState } from "react";
import Modal from "../../components/UIComponents/Modal";
import { getAuthToken } from "../../util/Auth";
import {
  useNavigate,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom/dist/umd/react-router-dom.development";

function InvoiceAttachmentPage() {
  const invoice = useRouteLoaderData("invoice-detail");
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  function cancelHandler() {
    navigate("..");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = getAuthToken();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `/invoice/upload/${invoice.id}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        }
      );
      if (response.status === 400) {
        window.alert("Only PDF attachment are allowed!!");
      }
      if (response.ok) {
        const confirmed = window.confirm(
          "File uploaded successfully! Do you want to go to the invoice page?"
        );
        if (confirmed) {
          navigate("..");
        }
      } else {
        window.alert("failed to upload");
      }
    } catch (error) {
      window.alert("Network error", error);
    }
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formFileMultiple" className="form-label">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Invoice attachment
            </h2>
          </label>
          <input
            name="file"
            className="form-control mt-1 text-sm leading-6 text-gray-600 "
            type="file"
            id="formFileMultiple"
            onChange={handleFileChange}
            required
          />
          <br />
          <div className="space-x-4">

          <button
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
          <button
            onClick={cancelHandler}
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default InvoiceAttachmentPage;
