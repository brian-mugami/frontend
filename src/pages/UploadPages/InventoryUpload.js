import React from 'react'
import { useState } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom/dist/umd/react-router-dom.development';
import { getAuthToken } from '../../util/Auth';

function InventoryUpload() {
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
        const response = await fetch("https://flask-inventory.onrender.com/inventory/upload", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        });
        if (response.status === 400) {
          window.alert(response.message);
        }
        if (response.status === 500) {
          window.alert(response.message);
        }
        if (response.ok) {
          const confirmed = window.confirm("Items uploaded successfully!!");
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
        <h1>Inventory Upload</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="file"
              accept=".xlsx"
              required
              onChange={handleFileChange}
              name="file"
              id="formFileMultiple"
              className="form-control"
            />
            <button
              className="btn btn-success"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </div>
        </form>
      </React.Fragment>
    );
}

export default InventoryUpload