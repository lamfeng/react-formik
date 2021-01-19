import React, { useState } from 'react'
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField
} from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'
import { FormDebug } from '../_components/FormDebug';

const initialValues = {
  name: 'Melvin',
  email: '',
  channel: '',
  comments: '',
  address: '',
  social: {
    facebook: '',
    twitter: ''
  },
  phoneNumbers: ['', ''],
  phNumbers: ['']
}

const savedValues = {
  name: 'Melvin',
  email: 'v@example.com',
  channel: 'codevolution',
  comments: 'Welcome to Formik',
  address: 'No 1 Selangor',
  social: {
    facebook: '',
    twitter: ''
  },
  phoneNumbers: ['', ''],
  phNumbers: ['']
}

const onSubmit = (values, submitProps) => {
  console.log('Form data', values)
  console.log('submitProps', submitProps)
  submitProps.setSubmitting(false)
  submitProps.resetForm()
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Required'),
  channel: Yup.string().required('Required'),
  comments: Yup.string().required('Required')
})

const validateComments = value => {
  let error
  if (!value) {
    error = 'Required'
  }
  return error
}

function Demo4 () {
  const [formValues, setFormValues] = useState(null)
  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      // validateOnChange={false}
      // validateOnBlur={false}
      // validateOnMount
    >
      {formik => {
        console.log('Formik props', formik)
        return (
          <Form>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <Field type='text' id='name' name='name' className="form-control"/>
              <ErrorMessage name='name' component={TextError} />
            </div>

            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <Field type='email' id='email' name='email' className="form-control"/>
              <ErrorMessage name='email'>
                {error => <div className='error'>{error}</div>}
              </ErrorMessage>
            </div>

            <div className='form-group'>
              <label htmlFor='channel'>Channel</label>
              <Field
                type='text'
                id='channel'
                name='channel'
                placeholder='YouTube channel name'
                className="form-control"
              />
              <ErrorMessage name='channel' />
            </div>

            <div className='form-group'>
              <label htmlFor='comments'>Comments</label>
              <Field
                as='textarea'
                id='comments'
                name='comments'
                validate={validateComments}
                className="form-control"
              />
              <ErrorMessage name='comments' component={TextError} />
            </div>

            <div className='form-group'>
              <label htmlFor='address'>Address (FastField)</label>
              <FastField name='address' className="form-control">
                {({ field, form, meta }) => {
                  console.log('Field render')
                  return (
                    <div>
                      <input type='text' {...field} className="form-control"/>
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  )
                }}
              </FastField>
            </div>

            <div className='form-group'>
              <label htmlFor='facebook'>Facebook profile</label>
              <Field type='text' id='facebook' name='social.facebook' className="form-control"/>
            </div>

            <div className='form-group'>
              <label htmlFor='twitter'>Twitter profile</label>
              <Field type='text' id='twitter' name='social.twitter' className="form-control"/>
            </div>

            <div className='form-group'>
              <label htmlFor='primaryPh'>Primary phone number</label>
              <Field type='text' id='primaryPh' name='phoneNumbers[0]' className="form-control"/>
            </div>

            <div className='form-group'>
              <label htmlFor='secondaryPh'>Secondary phone number</label>
              <Field type='text' id='secondaryPh' name='phoneNumbers[1]' className="form-control"/>
            </div>

            <div className='form-group'>
              <label>List of phone numbers</label>
              <FieldArray name='phNumbers' className="form-control">
                {fieldArrayProps => {
                  const { push, remove, form } = fieldArrayProps
                  const { values } = form
                  const { phNumbers } = values
                  // console.log('fieldArrayProps', fieldArrayProps)
                  // console.log('Form errors', form.errors)
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} className="form-control mt-1"/>
                          {index > 0 && (
                            <button type='button' onClick={() => remove(index)} className="btn btn-danger">
                              -
                            </button>
                          )}
                        </div>
                      ))}
                      <button type='button' onClick={() => push('')} className="btn btn-success">
                        +
                      </button>
                    </div>
                  )
                }}
              </FieldArray>
            </div>
            <button type='button' onClick={() => setFormValues(savedValues)} className="btn btn-primary mr-2">Load saved data</button>
            <button type='reset' className="btn btn-danger mr-2">Reset</button>
            <button type='submit' disabled={!formik.isValid || formik.isSubmitting} className="btn btn-success mr-2">Submit</button>
            <FormDebug />

          </Form>
        )
      }}
    </Formik>
  )
}

export { Demo4 };
