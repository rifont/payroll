import React from 'react';
import { Table } from 'react-bootstrap';
import { format as formatDate } from 'date-fns';

export default function PayslipConfirmation({ payslip }) {
  const formatCurrency = amount =>
    amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  return (
    <>
      <h2>Payslip</h2>
      <h3>{`${payslip.firstName} ${payslip.lastName}`}</h3>
      <Table striped bordered>
        <tbody>
          <tr>
            <td>Pay Date</td>
            <td>{formatDate(payslip.paymentDate, 'dd MMMM yyyy')}</td>
          </tr>
          <tr>
            <td>Pay Frequency</td>
            <td>Monthly</td>
          </tr>
          <tr>
            <td>Annual Income</td>
            <td>{`$ ${formatCurrency(payslip.annualIncome)}`}</td>
          </tr>
          <tr>
            <td>Gross Income</td>
            <td>{`$ ${formatCurrency(payslip.grossMonthlyIncome)}`}</td>
          </tr>
          <tr>
            <td>Income Tax</td>
            <td>{`$ ${formatCurrency(payslip.monthlyTax)}`}</td>
          </tr>
          <tr>
            <td>Net Income</td>
            <td>{`$ ${formatCurrency(payslip.netMonthlyIncome)}`}</td>
          </tr>
          <tr>
            <td>Super</td>
            <td>{`$ ${formatCurrency(payslip.superAmount)}`}</td>
          </tr>
          <tr>
            <td>Pay</td>
            <td>{`$ ${formatCurrency(payslip.netMonthlyPay)}`}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
