import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createUnit } from '../controller/unitController';

// Validation schema
const UnitSchema = Yup.object().shape({
  unitNumber: Yup.string().required('Unit Number is required'),
  propertyId: Yup.string().required('Property ID is required'),
  userId: Yup.string().required('User ID is required'),
  floorNumber: Yup.number().required('Floor Number is required').min(1, 'Floor Number must be at least 1'),
  squareFeet: Yup.number().required('Square Feet is required').min(1, 'Square Feet must be at least 1'),
  numberOfBedrooms: Yup.number().required('Number of Bedrooms is required').min(0, 'Number of Bedrooms must be at least 0'),
  numberOfBathrooms: Yup.number().required('Number of Bathrooms is required').min(0, 'Number of Bathrooms must be at least 0'),
  occupied: Yup.boolean().required('Occupied status is required'),
  rentAmount: Yup.number().required('Rent Amount is required').min(0, 'Rent Amount must be at least 0'),
  leaseStart: Yup.date().required('Lease Start Date is required'),
  leaseEnd: Yup.date().required('Lease End Date is required'),
});

const CreateNewUnit = () => {
  const navigate = useNavigate();

  return (
    <div className='col-md-6'>
      <h3>Create New Unit</h3>
      <Formik
        initialValues={{
          unitNumber: '',
          propertyId: '',
          userId: '',
          floorNumber: '',
          squareFeet: '',
          numberOfBedrooms: '',
          numberOfBathrooms: '',
          occupied: false,
          rentAmount: '',
          leaseStart: '',
          leaseEnd: '',
        }}
        validationSchema={UnitSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await createUnit(values);
            console.log(response);
            navigate('/unit');
          } catch (error) {
            console.log(error);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label className="form-label">Unit Number</label>
              <Field
                name="unitNumber"
                type="text"
                className="form-control"
                placeholder="Unit Number"
              />
              <ErrorMessage name="unitNumber" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Property ID</label>
              <Field
                name="propertyId"
                type="text"
                className="form-control"
                placeholder="Property ID"
              />
              <ErrorMessage name="propertyId" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">User ID</label>
              <Field
                name="userId"
                type="text"
                className="form-control"
                placeholder="User ID"
              />
              <ErrorMessage name="userId" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Floor Number</label>
              <Field
                name="floorNumber"
                type="number"
                className="form-control"
                placeholder="Floor Number"
              />
              <ErrorMessage name="floorNumber" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Square Feet</label>
              <Field
                name="squareFeet"
                type="number"
                className="form-control"
                placeholder="Square Feet"
              />
              <ErrorMessage name="squareFeet" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Number of Bedrooms</label>
              <Field
                name="numberOfBedrooms"
                type="number"
                className="form-control"
                placeholder="Number of Bedrooms"
              />
              <ErrorMessage name="numberOfBedrooms" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Number of Bathrooms</label>
              <Field
                name="numberOfBathrooms"
                type="number"
                className="form-control"
                placeholder="Number of Bathrooms"
              />
              <ErrorMessage name="numberOfBathrooms" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Occupied</label>
              <Field
                name="occupied"
                type="checkbox"
                className="form-check-input"
              />
              <ErrorMessage name="occupied" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Rent Amount</label>
              <Field
                name="rentAmount"
                type="number"
                className="form-control"
                placeholder="Rent Amount"
              />
              <ErrorMessage name="rentAmount" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Lease Start Date</label>
              <Field
                name="leaseStart"
                type="date"
                className="form-control"
                placeholder="Lease Start Date"
              />
              <ErrorMessage name="leaseStart" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Lease End Date</label>
              <Field
                name="leaseEnd"
                type="date"
                className="form-control"
                placeholder="Lease End Date"
              />
              <ErrorMessage name="leaseEnd" component="div" className="text-danger" />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateNewUnit;
