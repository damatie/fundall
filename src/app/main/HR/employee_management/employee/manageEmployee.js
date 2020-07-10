import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import ManageEmployeeHeader from './manageEmployeeHeader';
import EmployeesTable from './employeeTable';

function MangeEmployee() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<ManageEmployeeHeader  />}
			content={<EmployeesTable />}
			innerScroll
		/>
	);
}

export default withReducer('employees', reducer)(MangeEmployee);
