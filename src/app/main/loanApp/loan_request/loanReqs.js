import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React, { useState } from 'react';
import LoanReqHeader from './loanReqHeader';
import LoanReqTable from './loanReqTable';
import reducer from '../store/reducers';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

function LoanReq() {

	const [tabValue, setTabValue] = useState(0);
	function handleChangeTab(event, value) {
		setTabValue(value);
	}
	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<LoanReqHeader />}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64 normal-case" label="Loan History" />
					<Tab className="h-64 normal-case" label="Returned Loan" /> 
				</Tabs>
			}
			content={
				<>
				{tabValue === 0 && (<LoanReqTable />)}
				{tabValue === 1 && (<LoanReqTable type='returned'/>)}
				</>
			}
			innerScroll
		/>
	);
}

export default withReducer('loan', reducer)(LoanReq);
