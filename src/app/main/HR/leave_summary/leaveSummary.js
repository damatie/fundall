import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import LeaveSummaryHeader from './leaveSummaryHeader';
import LeaveSummaryTable from './leaveSummaryTable';
import reducers from './store/reducers';

function LeaveSummary() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<LeaveSummaryHeader />}
			content={<LeaveSummaryTable />}
			innerScroll
		/>
	);
};

export default withReducer('leaveSummary', reducers)(LeaveSummary);
