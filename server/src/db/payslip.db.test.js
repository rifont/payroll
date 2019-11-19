import * as payslipDb from './payslip.db';
import { Payslip } from '../services/Payslip';

describe('Payslip database', () => {
  jest.mock('./payslip.db.js');

  test('should be empty on initialisation', () => {
    expect(payslipDb.storage).toEqual([]);
  });

  test('should add a payslip', () => {
    const payslip = new Payslip({
      firstName: 'John',
      lastName: 'Doe',
      annualIncome: 60050,
      superRate: 0.09,
    });
    payslipDb.createPayslip(payslip);

    expect(payslipDb.storage).toContainEqual(payslip);
  });
});
