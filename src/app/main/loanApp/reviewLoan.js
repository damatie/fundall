import React from 'react';
import LoanBanner from './tabs/loanBanner';

const config = {
  urlOne: '/loan/review/list',
  urlTwo: '/loan/salary_advance/list',
  title: 'Loan Review'
}
const ReviewLoan = () => {
  return (
    <LoanBanner personalUrl={config.urlOne} title={config.title} salaryUrl={config.urlTwo} />
  );
};

export default ReviewLoan;