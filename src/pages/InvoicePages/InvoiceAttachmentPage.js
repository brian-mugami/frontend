import React, { useState } from "react";
import Modal from "../../components/UIComponents/Modal";
import { getAuthToken } from "../../util/Auth";
import { useNavigate, useRouteLoaderData } from "react-router-dom/dist/umd/react-router-dom.development";

function InvoiceAttachmentPage() {
    const invoice = useRouteLoaderData("invoice-detail")
    const navigate = useNavigate()
    
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  function cancelHandler(){
    navigate("..")
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = getAuthToken();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`/invoice/upload/${invoice.id}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });

      if (response.ok) {
        const confirmed = window.confirm("File uploaded successfully! Do you want to go to the invoice page?");
        if (confirmed) {
          navigate("/invoice");
        }
      } else {
        window.alert("fail");
      }
    } catch (error) {
        window.alert("Network error", error)
    }
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formFileMultiple" className="form-label">
            <b>Invoice Attachment</b>
          </label>
          <input
            name="file"
            className="form-control"
            type="file"
            id="formFileMultiple"
            onChange={handleFileChange}
            required
          />
          <br />
          <button className="btn btn-success" type="submit">
            Submit
          </button>
          <button className="btn btn-warning" type="button" onClick={cancelHandler}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default InvoiceAttachmentPage;

