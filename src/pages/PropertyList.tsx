// src/pages/PropertyList.tsx
import { useEffect, useState } from "react";
import { Container, Alert } from "react-bootstrap";
import {
  createNewProperty,
  fetchAllProperties,
} from "../controller/propertyController";
import PropertyListController from "../components/PropertyListController";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");
  const [activeProperty, setActiveProperty] = useState(0);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const data = await fetchAllProperties();
        console.log(data);
        setProperties(data);
      } catch (err) {
        setError("Failed to load properties");
      }
    };

    getProperties();
  }, []);

  return (
    <Container className="mt-5">
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="row">
        <div className="col-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Property"
          />
          <PropertyListController
            properties={properties}
          ></PropertyListController>
        </div>
        <div className="col-9"></div>
      </div>
    </Container>
  );
};

export default PropertyList;
