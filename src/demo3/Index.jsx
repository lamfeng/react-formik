import React from 'react';
import { Styles } from './Styles';
import { Formik, useField, Form } from 'formik';
import { FormDebug } from '../_components/FormDebug';
import * as Yup from 'yup';

const CustomTextInput = ({ label, ...props}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

const CustomCheckbox = ({ children, ...props}) => {
  const [field, meta] = useField(props, 'checkbox');

  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

const CustomSelect = ({ label, ...props}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

function Demo3() {
  return (
    <Styles>
        <Formik
          initialValues={{
            name: '',
            email: '',
            acceptedTerms: false,
            specialPower: '',
          }}
          validationSchema={Yup.object({
            name: Yup.string().min(3, 'Must be at least 3 characters').max(15, 'Must be 15 characters or less').required('Name is required'),
            email: Yup.string().email('Invalid Emaill Address').required('Email is required'),
            acceptedTerms: Yup.boolean().required('Accepted Terms is required').oneOf([true], 'You must accept the term and conditions'),
            specialPower: Yup.string().oneOf(['1', '2', '3', '4'], 'Invalid Special Power').required('Special Power is required')
          })}
          onSubmit={(values, { setSubmitting, resetForm}) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              resetForm();
              setSubmitting(false);
            }, 2000 )
          }}
        >
          {props => (
            <Form>
              <h1>Form</h1>
              <CustomTextInput label="Name" name="name" type="text" placeholder="Name" />
              <CustomTextInput label="Email" name="email" type="email" placeholder="Email" />
              <CustomSelect label="Special Power" name="specialPower">
                <option value="">Select a Special Power</option>
                <option value="1">Flight</option>
                <option value="2">Invisibility</option>
                <option value="3">Wealthy</option>
                <option value="4">Other</option>
              </CustomSelect>
              <CustomCheckbox name="acceptedTerms">
                I accept the term and conditions
              </CustomCheckbox>
              <button type="submit">{props.isSubmitting ? 'Loading...' : 'Submit'}</button>
              <FormDebug />
            </Form>
          )}
        </Formik>
    </Styles>
  );
}

export { Demo3 };
