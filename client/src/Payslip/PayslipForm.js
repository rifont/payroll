import React from 'react';
import { Form, Col, InputGroup, Button } from 'react-bootstrap';

export default function PayslipForm({
  handleSubmit,
  handleChange,
  values,
  touched,
  errors,
}) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} style={{ textAlign: 'left' }}>
          <h2>Employee Info</h2>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md='6'>
          <Form.Control
            placeholder='Firstname'
            type='text'
            name='firstName'
            value={values.firstName}
            onChange={handleChange}
            isValid={touched.firstName && !errors.firstName}
            isInvalid={touched.firstName && !!errors.firstName}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md='6'>
          <Form.Control
            placeholder='Lastname'
            type='text'
            name='lastName'
            value={values.lastName}
            onChange={handleChange}
            isValid={touched.lastName && !errors.lastName}
            isInvalid={touched.lastName && !!errors.lastName}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md='6'>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id='inputGroupPrepend'>@</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type='text'
              placeholder='Annual Salary'
              aria-describedby='inputGroupPrepend'
              name='annualIncome'
              value={values.annualIncome}
              onChange={handleChange}
              isValid={touched.annualIncome && !errors.annualIncome}
              isInvalid={touched.annualIncome && !!errors.annualIncome}
            />
            <InputGroup.Append>
              <InputGroup.Text id='inputGroupAppend'>.00</InputGroup.Text>
            </InputGroup.Append>
            <Form.Control.Feedback type='invalid'>
              {errors.annualIncome}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md='6'>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id='inputGroupPrepend'>%</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type='text'
              placeholder='Super Rate'
              aria-describedby='inputGroupPrepend'
              name='superRate'
              value={values.superRate}
              onChange={handleChange}
              isValid={touched.superRate && !errors.superRate}
              isInvalid={touched.superRate && !!errors.superRate}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.superRate}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form.Row>

      <Button type='submit'>Generate Payslip</Button>
    </Form>
  );
}
