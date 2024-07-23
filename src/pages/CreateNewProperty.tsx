// src/pages/PropertyList.tsx
import { useEffect, useState } from "react";
import { createNewProperty } from "../controller/propertyController";
import { useNavigate } from "react-router-dom";

export function CreateNewProperty() {
  const navigate = useNavigate();
  const [newProperty, setNewProperty] = useState({
    propertyName: "",
    address: "",
    city: "",
    zipcode: "",
  });
  const SubmitNewProperty = async () => {
    console.log();
    try {
      const response = await createNewProperty(newProperty);
      console.log(response);
      //  setProperties([...properties, response])
      navigate("/properties");
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormChanges = (e: any) => {
    const newItem: any = {};
    newItem[e.target.name] = e.target.value;
    setNewProperty({ ...newProperty, ...newItem });
  };

  return (
    <div>
      <h3>Create New Property</h3>
      <div className="mb-3">
        <label className="form-label"> Property Name</label>
        <input
          name="propertyName"
          type="text"
          className="form-control"
          placeholder="Property Name"
          onBlur={handleFormChanges}
        />
      </div>
      <div className="mb-3">
        <label className="form-label"> Property Address</label>
        <input
          type="text"
          name="address"
          className="form-control"
          placeholder="Property Name"
          onBlur={handleFormChanges}
        />
      </div>
      <div className="mb-3">
        <label className="form-label"> Property City</label>
        <input
          type="text"
          name="city"
          className="form-control"
          placeholder="Property City"
          onBlur={handleFormChanges}
        />
      </div>
      <div className="mb-3">
        <label className="form-label"> Property Zipcode</label>
        <input
          name="zipCode"
          type="text"
          className="form-control"
          placeholder="Property Zipcode"
          onBlur={handleFormChanges}
        />

        <button className="btn btn-primary" onClick={SubmitNewProperty}>
          Submit
        </button>
      </div>
    </div>
  );
}
