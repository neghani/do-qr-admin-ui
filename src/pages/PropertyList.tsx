// src/pages/PropertyList.tsx
import { useEffect, useState } from "react";
import { Container, Alert } from "react-bootstrap";
import { fetchAllProperties } from "../controller/propertyController";
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
  // const handleShow = (type: string, property: any = null) => {};
  // const handleDelete = (id: string) => {};
  return (
    <Container className="mt-5">
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="row">
        <div className="col-3">
          <input
            type="password"
            id="inputPassword5"
            className="form-control"
            placeholder="Search Property"
          />
          <PropertyListController
            properties={properties}
          ></PropertyListController>
        </div>
        <div className="col-9">
          <img src="https://placehold.co/300x200/png"></img>
        </div>
      </div>
      '
      {/* <Button variant="primary" onClick={() => handleShow("add")}>
        Add Property
      </Button> */}
      {/* <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Property Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Number of Units</th>
            <th>Manager Name</th>
            <th>Manager Email</th>
            <th>Manager Phone</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property: any) => (
            <tr key={property?.id}>
              <td>{property?.propertyName}</td>
              <td>{property?.address}</td>
              <td>{property?.city}</td>
              <td>{property?.state}</td>
              <td>{property?.zipCode}</td>
              <td>{property?.numberOfUnits}</td>
              <td>{property?.managerName}</td>
              <td>{property?.managerEmail}</td>
              <td>{property?.managerPhone}</td>
              <td>{JSON.stringify(new Date(property?.createdAt))}</td>
              <td>{JSON.stringify(new Date(property?.updatedAt))}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleShow("edit", property)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(property.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}
    </Container>
  );
};

export default PropertyList;
