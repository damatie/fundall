import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import AllocateLeaveHeader from './allocateLeaveHeader';
import EmployeeList from './employeeList';

function LeaveOptions() {
	return (
		<FusePageCarded
			classes={{
				// content: 'flex',
				header: 'min-h-100 h-100 sm:h-136 sm:min-h-136'
			}}
			header={<AllocateLeaveHeader />}
			content={<EmployeeList />}
			innerScroll
		/>
	);
}

export default /*withReducer('leaveOptions', reducer)(*/LeaveOptions;
