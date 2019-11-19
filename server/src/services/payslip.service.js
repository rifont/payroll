import { Payslip } from '../services/Payslip';
import * as payslipDb from '../db/payslip.db';
import { CreatedResource } from '../status/successCodes';
import { BadRequestError, ServerError } from '../status/errorCodes';

export const createPayslip = async data => {
  try {
    // Check if payslip has already been created (and therefore paid)
    const paid = payslipDb.storage.some(payslip => payslip.isPaid(data));

    if (!paid) {
      // Create the payslip and add to payslips array
      const payslip = new Payslip(data);
      await payslipDb.createPayslip(payslip);

      // Send newly created payslip back
      return await new CreatedResource(payslip);
    } else {
      // Send BadRequest error back
      throw new BadRequestError(
        'Payment has already been made for that user this month.'
      );
    }
  } catch (e) {
    if (e.status) {
      throw e;
    } else {
      throw new ServerError('Server error. Please try again later.');
    }
  }
};
