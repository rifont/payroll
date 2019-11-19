// Arbitrarily store payslips in memory
// ES6 exports bindings to the payslipDb array, therefore the array
// can be accessed and modified by reference
export const storage = [];

export const createPayslip = payslip => {
  storage.push(payslip);
};
