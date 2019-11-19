const taxBracket = [
  { lower: 0, upper: 18200, percentage: 0 },
  { lower: 18201, upper: 37000, percentage: 0.19 },
  { lower: 37001, upper: 80000, percentage: 0.325 },
  { lower: 80001, upper: 180000, percentage: 0.37 },
  { lower: 180001, upper: Infinity, percentage: 0.45 },
];

export class Payslip {
  constructor(data) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.creationDate = this.convertUTC(data.creationDate);
    this.paymentDate = this.nextPaymentDate(data.creationDate);
    this.annualIncome = data.annualIncome;
    this.superRate = data.superRate;
    this.grossMonthlyIncome = this.calculateGrossMonthlyIncome();
    this.monthlyTax = this.calculateMonthlyTax();
    this.netMonthlyIncome = this.calculateNetMonthlyIncome();
    this.superAmount = this.calculateMonthlySuper();
    this.netMonthlyPay = this.calculateMonthlyPay();
  }

  // Converts to UTC date for consistency
  convertUTC(date = Date.now()) {
    const parsedDate = new Date(date);

    return new Date(
      Date.UTC(
        parsedDate.getUTCFullYear(),
        parsedDate.getUTCMonth(),
        parsedDate.getUTCDate()
      )
    );
  }

  // Performs a check against the firstName, lastName, and payment date
  // to determine if payslip has already been paid, given new payslip data
  isPaid(data) {
    return (
      this.firstName === data.firstName &&
      this.lastName === data.lastName &&
      this.paymentDate.valueOf() ===
        this.nextPaymentDate(data.creationDate).valueOf()
    );
  }

  // Calculates the next payment date.
  // Given as the last day of the given month, or current month as default
  nextPaymentDate(creationDate = Date.now()) {
    const now = this.convertUTC(creationDate);

    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0));
  }

  calculateAnnualTax() {
    let tax = 0;

    taxBracket.forEach(taxRange => {
      if (this.annualIncome > taxRange.upper) {
        // If income is above the top of the bracket,
        // add the tax from the bracket and continue
        tax = tax + (taxRange.upper - taxRange.lower) * taxRange.percentage;
      } else if (
        this.annualIncome > taxRange.lower &&
        this.annualIncome < taxRange.upper
      ) {
        // If income is within the bracket, calculate the difference between
        // income and lower boundary, multiply by tax percentage and add to total
        tax = tax + (this.annualIncome - taxRange.lower) * taxRange.percentage;
      }
    });

    return tax;
  }

  calculateMonthlyTax() {
    const annualTax = this.calculateAnnualTax(this.annualIncome);
    return Math.round(annualTax / 12);
  }

  calculateGrossMonthlyIncome() {
    return Math.round(this.annualIncome / 12);
  }

  calculateNetMonthlyIncome() {
    const grossMonthlyIncome = this.calculateGrossMonthlyIncome(
      this.annualIncome
    );
    const monthlyTax = this.calculateMonthlyTax(this.annualIncome);

    const netMonthlyIncome = grossMonthlyIncome - monthlyTax;

    return netMonthlyIncome;
  }

  calculateMonthlySuper() {
    const superAmount =
      this.calculateGrossMonthlyIncome(this.annualIncome) * this.superRate;

    return Math.round(superAmount);
  }

  calculateMonthlyPay() {
    const netIncome = this.calculateNetMonthlyIncome(this.annualIncome);
    const superAmount = this.calculateMonthlySuper(
      this.annualIncome,
      this.superRate
    );

    const pay = netIncome - superAmount;

    return pay;
  }
}
