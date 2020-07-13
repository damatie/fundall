import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import LoanReqHeader from './loanReqHeader';
import LoanReqTable from './loanReqTable';
import reducer from '../store/reducers';

function LoanReq() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<LoanReqHeader />}
			content={<LoanReqTable />}
			innerScroll
		/>
	);
}

export default withReducer('loan', reducer)(LoanReq);
