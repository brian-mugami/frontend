import React, { useState } from "react";
import { getAuthToken } from "../../util/Auth";
import {
  useNavigate,
  useNavigation,
} from "react-router-dom/dist/umd/react-router-dom.development";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ItemUploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = getAuthToken();

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("https://flask-inventory.onrender.com/item/upload", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });

      if (response.status === 400) {
        toast.error("Error: Bad request");
      } else if (response.status === 500) {
        toast.error("Error: Internal server error");
      } else if (response.ok) {
        toast.success("Items uploaded successfully!!");
        const confirmed = window.confirm("Items uploaded successfully!!");
        if (confirmed) {
          navigate("/home");
        }
      } else {
        toast.error("Error: Failed to upload");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="pt-10">
        <h1>Item Upload</h1>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <input
              type="file"
              accept=".xlsx"
              required
              onChange={handleFileChange}
              name="file"
              id="formFileMultiple"
              className="form-control mt-1 text-sm leading-6 text-gray-600 "
            />
          </div>
          <button
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default ItemUploadPage;
