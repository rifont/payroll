import { Payslip } from './Payslip';
import * as payslipService from './payslip.service';
import { CreatedResource } from '../status/successCodes';
import { BadRequestError } from '../status/errorCodes';

describe('payslip', () => {
  let dateNowSpy;
  let payslip;

  const fifteenthMarch2018 = new Date(Date.UTC(2018, 2, 15));
  const thirtyFirstMarch2018 = new Date(Date.UTC(2018, 2, 31));

  beforeAll(() => {
    // Lock time
    // Payslip class uses Date.now() internally to set creation date
    dateNowSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => fifteenthMarch2018);

    const data = {
      firstName: 'John',
      lastName: 'Doe',
      annualIncome: 60050,
      superRate: 0.09,
    };

    payslip = new Payslip(data);
  });

  afterAll(() => {
    // Unlock time
    dateNowSpy.mockRestore();
  });

  describe('details', () => {
    test('should have firstName "John"', () => {
      expect(payslip.firstName).toBe('John');
    });

    test('should have lastName "Doe"', () => {
      expect(payslip.lastName).toBe('Doe');
    });

    test('should have paymentDate of 31 March 2018', () => {
      expect(payslip.paymentDate).toEqual(thirtyFirstMarch2018);
    });

    test('should calculate monthly tax of 922', () => {
      expect(payslip.calculateMonthlyTax()).toBe(922);
    });

    test('should calculate gross monthly income of 5004', () => {
      expect(payslip.calculateGrossMonthlyIncome()).toBe(5004);
    });
    test('should calculate net monthly income of 4082', () => {
      expect(payslip.calculateNetMonthlyIncome()).toBe(4082);
    });

    test('should calculate monthly super of 450', () => {
      expect(payslip.calculateMonthlySuper()).toBe(450);
    });

    test('should calculate monthly pay of 3632', () => {
      expect(payslip.calculateMonthlyPay()).toBe(3632);
    });

    test('should return payslip object', () => {
      expect({ ...payslip }).toStrictEqual({
        firstName: 'John',
        lastName: 'Doe',
        creationDate: fifteenthMarch2018,
        paymentDate: thirtyFirstMarch2018,
        annualIncome: 60050,
        superRate: 0.09,
        grossMonthlyIncome: 5004,
        monthlyTax: 922,
        netMonthlyIncome: 4082,
        superAmount: 450,
        netMonthlyPay: 3632,
      });
    });
  });
  describe('creation', () => {
    jest.mock('../services/payslip.service.js');

    test('should succeed if payment has not been made', async () => {
      expect.assertions(1);
      const newPayslip = await payslipService.createPayslip(payslip);
      expect(newPayslip).toBeInstanceOf(CreatedResource);
    });

    test('should fail when payment has already been made', async () => {
      expect.assertions(1);
      try {
        await payslipService.createPayslip(payslip);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });
  });
});
