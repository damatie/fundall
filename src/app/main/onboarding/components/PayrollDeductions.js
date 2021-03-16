import React from 'react';
import CheckForms from './CheckForms';

const PayrollDeductions = () => {
  const config = {
    title: 'AUTHORIZATION FOR PAYROLL DEDUCTIONS',
    content: [
      'I understand that any overpayments or payment made to me in error by the company are to be paid back to the company as soon as possible.',
      'I hereby authorize the company to make deductions from my pay check, bonuses, commissions and expense reimbursements for any over payments or other money, which I owe to the company.'
    ],
    checkValue: false,
    name: 'authorizationForPayrollDeductions'
  }
  return (
    <>
      <CheckForms {...config} />
    </>
  );
};

export default PayrollDeductions;