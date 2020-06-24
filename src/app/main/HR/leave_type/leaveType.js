import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store/reducers';
import LeaveTypeHeader from './leaveTypeHeader';
import LeaveTypeTable from './leaveTypeTable';

function LeaveType() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<LeaveTypeHeader />}
			content={<LeaveTypeTable />}
			innerScroll
		/>
	);
}

export default withReducer('leaveTypes', reducer)(LeaveType);
