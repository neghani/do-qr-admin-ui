import { useEffect, useState } from "react";
import { Container, Alert, Row, Col, Button } from "react-bootstrap";
import {
  fetchAllUnits,
  fetchUnitById,
  updateUnit,
} from "../controller/unitController";
import UnitListController from "../components/UnitListController";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema for the form
const UnitSchema = Yup.object().shape({
  unitNumber: Yup.string().required("Unit Number is required"),
  propertyId: Yup.string().required("Property ID is required"),
  userId: Yup.string().required("User ID is required"),
  floorNumber: Yup.number()
    .required("Floor Number is required")
    .min(1, "Floor Number must be at least 1"),
  squareFeet: Yup.number()
    .required("Square Feet is required")
    .min(1, "Square Feet must be at least 1"),
  numberOfBedrooms: Yup.number()
    .required("Number of Bedrooms is required")
    .min(0, "Number of Bedrooms must be at least 0"),
  numberOfBathrooms: Yup.number()
    .required("Number of Bathrooms is required")
    .min(0, "Number of Bathrooms must be at least 0"),
  occupied: Yup.boolean().required("Occupied status is required"),
  rentAmount: Yup.number()
    .required("Rent Amount is required")
    .min(0, "Rent Amount must be at least 0"),
  leaseStart: Yup.date().required("Lease Start Date is required"),
  leaseEnd: Yup.date().required("Lease End Date is required"),
});

function Unit() {
  const [error, setError] = useState("");
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const getUnits = async () => {
      try {
        const data = await fetchAllUnits();
        setUnits(data);
      } catch (err) {
        setError("Failed to load units");
      }
    };

    getUnits();
  }, []);

  const handleUnitClick = async (id) => {
    try {
      const unit = await fetchUnitById(id);
      setSelectedUnit(unit);
      setIsEditMode(false);
    } catch (err) {
      setError("Failed to load unit");
    }
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      if (selectedUnit) {
        await updateUnit(selectedUnit.id, values);
        alert("Unit updated successfully!");
        const updatedUnits = await fetchAllUnits();
        setUnits(updatedUnits);
        setSelectedUnit(null);
        setIsEditMode(false);
      }
    } catch (error) {
      setError("Failed to update unit");
    }
    setSubmitting(false);
  };

  return (
    <Container className="mt-5">
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Col xs={12} md={4} lg={4}>
          <input
            type="text"
            className="form-control"
            placeholder="Search "
            // value={searchTerm}
            // onChange={handleSearchChange}
          />
          <div className="mt-3" style={{ height: "550px", overflowY: "auto" }}>
            <UnitListController units={units} onUnitClick={handleUnitClick} />
          </div>
        </Col>
        <Col xs={12} md={8} lg={8}>
          {selectedUnit && (
            <>
              <Formik
                initialValues={{
                  unitNumber: selectedUnit.unitNumber || "",
                  propertyId: selectedUnit.propertyId || "",
                  userId: selectedUnit.userId || "",
                  floorNumber: selectedUnit.floorNumber || "",
                  squareFeet: selectedUnit.squareFeet || "",
                  numberOfBedrooms: selectedUnit.numberOfBedrooms || "",
                  numberOfBathrooms: selectedUnit.numberOfBathrooms || "",
                  occupied: selectedUnit.occupied || false,
                  rentAmount: selectedUnit.rentAmount || "",
                  leaseStart: selectedUnit.leaseStart
                    ? new Date(selectedUnit.leaseStart)
                        .toISOString()
                        .split("T")[0]
                    : "",
                  leaseEnd: selectedUnit.leaseEnd
                    ? new Date(selectedUnit.leaseEnd)
                        .toISOString()
                        .split("T")[0]
                    : "",
                }}
                validationSchema={UnitSchema}
                onSubmit={handleUpdate}
                enableReinitialize={true}
              >
                {({ isSubmitting, resetForm }) => (
                  <Form>
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <label className="form-label">Unit Number</label>
                          <Field
                            name="unitNumber"
                            type="text"
                            className="form-control"
                            placeholder="Unit Number"
                            readOnly={!isEditMode}
                          />
                          <ErrorMessage
                            name="unitNumber"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Property ID</label>
                          <Field
                            name="propertyId"
                            type="text"
                            className="form-control"
                            placeholder="Property ID"
                            readOnly={!isEditMode}
                          />
                          <ErrorMessage
                            name="propertyId"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">User ID</label>
                          <Field
                            name="userId"
                            type="text"
                            className="form-control"
                            placeholder="User ID"
                            readOnly={!isEditMode}
                          />
                          <ErrorMessage
                            name="userId"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Floor Number</label>
                          <Field
                            name="floorNumber"
                            type="number"
                            className="form-control"
                            placeholder="Floor Number"
                            readOnly={!isEditMode}
                          />
                          <ErrorMessage
                            name="floorNumber"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Square Feet</label>
                          <Field
                            name="squareFeet"
                            type="number"
                            className="form-control"
                            placeholder="Square Feet"
                            readOnly={!isEditMode}
                          />
                          <ErrorMessage
                            name="squareFeet"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Occupied</label>
                          <Field
                            name="occupied"
                            type="checkbox"
                            className="form-check-input"
                            disabled={!isEditMode}
                          />
                          <ErrorMessage
                            name="occupied"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <label className="form-label">
                            Number of Bedrooms
                          </label>
                          <Field
                            name="numberOfBedrooms"
                            type="number"
                            className="form-control"
                            placeholder="Number of Bedrooms"
                            readOnly={!isEditMode}
                          />
                          <ErrorMessage
                            name="numberOfBedrooms"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            Number of Bathrooms
                          </label>
                          <Field
                            name="numberOfBathrooms"
                            type="number"
                            className="form-control"
                            placeholder="Number of Bathrooms"
                            readOnly={!isEditMode}
                          />
                          <ErrorMessage
                            name="numberOfBathrooms"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Rent Amount</label>
                          <Field
                            name="rentAmount"
                            type="number"
                            className="form-control"
                            placeholder="Rent Amount"
                            readOnly={!isEditMode}
                          />
                          <ErrorMessage
                            name="rentAmount"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Lease Start Date</label>
                          <Field
                            name="leaseStart"
                            type="date"
                            className="form-control"
                            readOnly={!isEditMode}
                          />
                          <ErrorMessage
                            name="leaseStart"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Lease End Date</label>
                          <Field
                            name="leaseEnd"
                            type="date"
                            className="form-control"
                            readOnly={!isEditMode}
                          />
                          <ErrorMessage
                            name="leaseEnd"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => setSelectedUnit(null)}
                    >
                      Clear
                    </Button>
                    {!isEditMode && (
                      <Button
                        onClick={() => setIsEditMode(true)}
                        className="btn btn-primary"
                      >
                        Edit
                      </Button>
                    )}

                    {isEditMode && (
                      <Button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        Update
                      </Button>
                    )}
                  </Form>
                )}
              </Formik>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Unit;
