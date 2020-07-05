import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import EmployeeChecklistTable from './EmployeeChecklistTable';

function EmployeeChecklist() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			// header={<div></div>}
			content={<EmployeeChecklistTable />}
			innerScroll
		/>
	);
}

export default EmployeeChecklist;
