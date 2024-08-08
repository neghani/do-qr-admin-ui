import { useEffect, useState } from "react";
import { Container, Alert } from "react-bootstrap";
import {
  fetchAllProperties,
  fetchPropertyById,
  updateProperty,
} from "../controller/propertyController";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PropertyListController from "../components/PropertyListController";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchId, setSearchId] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const getProperties = async (searchParams = {}) => {
    try {
      const data = await fetchAllProperties(searchParams);
      console.log(data);
      setProperties(data);
    } catch (err) {
      setError("Failed to load properties");
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  const getPropertyById = async (id) => {
    try {
      const property = await fetchPropertyById(id);
      console.log(property);
      setSelectedProperty(property);
      setIsEditMode(false);
    } catch (err) {
      setError("Failed to load property");
    }
  };

  const handleSearchIdChange = (event) => {
    const value = event.target.value;
    setSearchId(value);
    if (value) {
      getPropertyById(value);
    } else {
      getProperties();
      setSelectedProperty(null); // Clear the selection if search ID is empty
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    getProperties({
      name: value,
      city: value,
      state: value,
    });
  };

  const handlePropertyRowClick = (id) => {
    getPropertyById(id);
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      if (selectedProperty) {
        await updateProperty(selectedProperty.id, values);
        alert("Property updated successfully!");
        getProperties(); // Refresh the property list
        setSelectedProperty(null); // Clear the form after updating
        setIsEditMode(false);
      }
    } catch (error) {
      console.error("Failed to update property:", error);
      setError("Failed to update property");
    }
    setSubmitting(false);
  };
  const handleFormReset = (resetForm) => {
    setSelectedProperty(null);
    resetForm();
  };

  return (
    <Container className="mt-5">
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="row">
        <div className="col-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or location"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="mt-3" style={{ height: "550px", overflowY: "auto" }}>
            <PropertyListController
              properties={properties}
              onPropertyClick={handlePropertyRowClick}
            />
          </div>
        </div>
        <div className="col-7">
          {/* <input
            type="text"
            className="form-control mt-2"
            placeholder="Search by ID"
            value={searchId}
            onChange={handleSearchIdChange}
          /> */}
          {selectedProperty && (
            <Formik
              initialValues={{
                propertyName: selectedProperty.propertyName || "",
                address: selectedProperty.address || "",
                city: selectedProperty.city || "",
                zipCode: selectedProperty.zipCode || "",
              }}
              enableReinitialize={true}
              onSubmit={handleUpdate}
            >
              {({ isSubmitting, resetForm }) => (
                <Form>
                  <div className="mb-3">
                    <label className="form-label">Property Name</label>
                    <Field
                      name="propertyName"
                      type="text"
                      className="form-control"
                      placeholder="Property Name"
                      readOnly={!isEditMode}
                    />
                    <ErrorMessage
                      name="propertyName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Property Address</label>
                    <Field
                      name="address"
                      type="text"
                      className="form-control"
                      placeholder="Property Address"
                      readOnly={!isEditMode}
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Property City</label>
                    <Field
                      name="city"
                      type="text"
                      className="form-control"
                      placeholder="Property City"
                      readOnly={!isEditMode}
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Property Zipcode</label>
                    <Field
                      name="zipCode"
                      type="text"
                      className="form-control"
                      placeholder="Property Zipcode"
                      readOnly={!isEditMode}
                    />
                    <ErrorMessage
                      name="zipCode"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={() => handleFormReset(resetForm)}
                  >
                    Clear
                  </button>
                  {!isEditMode && (
                    <button
                      onClick={() => setIsEditMode(true)}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                  )}
                  {isEditMode && (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      Update
                    </button>
                  )}
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </Container>
  );
};

export default PropertyList;
