import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import AllocateLeaveHeader from './allocateLeaveHeader';
import EmployeeList from './employeeList';
import businessUnitReducer from 'app/main/HR/business_unit/store/reducers';
import departmentReducer from 'app/main/HR/business_unit/department/store/reducers';
import reducer from './store/reducers';
import employeeListReducer from 'app/store/reducers';

function AllocateLeave() {
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

withReducer('employeeList', employeeListReducer)(AllocateLeave);
withReducer('businessUnits', businessUnitReducer)(AllocateLeave);
withReducer('department', departmentReducer)(AllocateLeave);
export default withReducer('allocate', reducer)(AllocateLeave);
