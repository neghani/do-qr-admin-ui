import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createNewProperty } from '../controller/propertyController';

//  validation schema
const PropertySchema = Yup.object().shape({
  propertyName: Yup.string().required('Property Name is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  zipCode: Yup.string()
    .matches(/^\d{5}$/, 'Zipcode must be exactly 5 digits')
    .required('Zipcode is required'),
});

export function CreateNewProperty() {
  const navigate = useNavigate();

  return (
    <div className='col-md-6'>
      <h3>Create New Property</h3>
      <Formik
        initialValues={{
          propertyName: '',
          address: '',
          city: '',
          zipCode: '',
        }}
        validationSchema={PropertySchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await createNewProperty(values);
            console.log(response);
            navigate('/properties');
          } catch (error) {
            console.log(error);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label className="form-label">Property Name</label>
              <Field
                name="propertyName"
                type="text"
                className="form-control"
                placeholder="Property Name"
              />
              <ErrorMessage name="propertyName" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Property Address</label>
              <Field
                name="address"
                type="text"
                className="form-control"
                placeholder="Property Address"
              />
              <ErrorMessage name="address" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Property City</label>
              <Field
                name="city"
                type="text"
                className="form-control"
                placeholder="Property City"
              />
              <ErrorMessage name="city" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Property Zipcode</label>
              <Field
                name="zipCode"
                type="text"
                className="form-control"
                placeholder="Property Zipcode"
              />
              <ErrorMessage name="zipCode" component="div" className="text-danger" />
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
