import React, { useState } from 'react';
import './App.css';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Button, Col, Row, Alert } from 'react-bootstrap';

import PayslipForm from './Payslip/PayslipForm';
import { Payslip } from './Payslip/Payslip';
import PayslipConfirmation from './Payslip/PayslipConfirmation';

const schema = yup.object({
  firstName: yup
    .string()
    .min(1, 'First name must be at least 1 character long')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(1, 'Last name must be at least 1 character long')
    .required('Last name is required'),
  annualIncome: yup
    .number('Annual income must be a number')
    .required('Annual income is required'),
  superRate: yup
    .number('Super rate must be a number (whole numbers only)')
    .transform(number => number / 100)
    .required('Super rate is required'),
});

function App() {
  const [payslip, setPayslip] = useState(null);
  const [status, setStatus] = useState({ success: true, message: null });

  const createPayslip = fields => {
    const data = schema.cast(fields);
    const payslip = new Payslip(data);
    setPayslip(payslip);
  };

  const postPayslip = async () => {
    try {
      await axios.post('/api/payslip', payslip, {
        headers: { 'Content-Type': 'application/json' },
      });

      setStatus({ success: true, message: 'Payslip successfully created.' });
    } catch (e) {
      setStatus({ success: false, message: e.response.data.message });
    }
  };

  const resetPayslip = () => {
    setPayslip(null);
    setStatus({ success: true, message: null });
  };

  const View = () =>
    payslip ? (
      <div className='payslip-confirmation'>
        <PayslipConfirmation payslip={payslip} />
        <Row>
          <Col>
            <Button variant='secondary' onClick={resetPayslip}>
              Back
            </Button>
          </Col>
          <Col style={{ textAlign: 'right' }}>
            <Button onClick={postPayslip}>Pay</Button>
          </Col>
        </Row>
        <Row style={{ marginTop: '1rem' }}>
          <Col>
            <Alert
              style={
                status.message ? { display: 'block' } : { display: 'none' }
              }
              variant={status.success === true ? 'success' : 'danger'}
            >
              {status.message}
            </Alert>
          </Col>
        </Row>
      </div>
    ) : (
      <Formik
        validationSchema={schema}
        onSubmit={createPayslip}
        initialValues={{
          firstName: '',
          lastName: '',
          annualIncome: '',
          superRate: '',
        }}
      >
        {props => <PayslipForm {...props} />}
      </Formik>
    );

  return (
    <div className='App'>
      <div className='App-header'>
        <h1 style={{ marginBottom: '5rem' }}>Payroll Management</h1>
        <div style={{ width: '600px' }}>
          <View></View>
        </div>
      </div>
    </div>
  );
}

export default App;
