import React, { useState } from "react";
import { getAuthToken } from "../../util/Auth";
import {
  useNavigate,
  useNavigation,
} from "react-router-dom/dist/umd/react-router-dom.development";

function CategoryAccountUploadPage() {
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
      const response = await fetch("https://inventory-accounting.onrender.com/category/account/upload", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });
      if (response.status === 400) {
        window.alert("Only Excel attachment are allowed!!");
      }
      if (response.status === 500) {
        window.alert("Duplicates are not allowed, please review your data");
      }
      if (response.ok) {
        const confirmed = window.confirm("Accounts uploaded successfully!!");
        if (confirmed) {
          navigate("/home");
        }
      } else {
        window.alert("failed to upload");
      }
    } catch (error) {
      window.alert("Network error", error);
    }
  };

  return (
    <React.Fragment>
      <div className="pt-10">
      <h1>Category Accounts Upload</h1>
      <form onSubmit={handleSubmit}>
        <div className="py-5">
          <input
            type="file"
            accept=".xlsx"
            required
            className="form-control mt-1 text-sm leading-6 text-gray-600 "
            onChange={handleFileChange}
            name="file"
            id="formFileMultiple"
          />
          </div>
          <button
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
        
      </form>
      </div>
    </React.Fragment>
  );
}

export default CategoryAccountUploadPage;
