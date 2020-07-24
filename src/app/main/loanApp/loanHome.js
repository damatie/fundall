import React from 'react';
import LoanBanner from './tabs/loanBanner';

const personalUrl = '/loan/request/list';
const salaryUrl = '/loan/request/salaryadvance_request/list';
const LoanHome = () => {
	return (
		<LoanBanner title='Loan Request' personalUrl={personalUrl} salaryUrl={salaryUrl}/>
	)
};

export default LoanHome;