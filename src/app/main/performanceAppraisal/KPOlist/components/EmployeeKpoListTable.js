import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import KpoStatus from './KpoStatus';

const EmployeeKpoListTable = ({ customHook, completed }) => {
	function parseISOString(s) {
		let b = s.split(/\D+/);
		let date = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
		//zero-pad a single zero if needed
		let zp = function (val) {
			return val <= 9 ? '0' + val : '' + val;
		};

		//zero-pad up to two zeroes if needed
		let zp2 = function (val) {
			return val <= 99 ? (val <= 9 ? '00' + val : '0' + val) : '' + val;
		};

		let d = date.getDate();
		let m = date.getMonth() + 1;
		let y = date.getFullYear();
		return '' + zp(d) + '-' + zp(m) + '-' + y;
	}

	const columns = React.useMemo(() => [
		{
			Header: 'Email',
			accessor: 'employee',
			// className: 'font-bold',
			sortable: true,
			Cell: ({
				row: {
					original: { employee }
				}
			}) => {
				return <>{employee?.email}</>;
			}
		},
		{
			Header: 'Job Title',
			accessor: 'jobTitle',
			// className: 'font-bold',
			sortable: true,
			Cell: ({
				row: {
					original: { jobTitle }
				}
			}) => {
				return <>{jobTitle?.name}</>;
			}
		},
		{
			Header: 'Date Submitted',
			accessor: 'createdAt',
			// className: 'font-bold',
			sortable: true,
			Cell: ({
				row: {
					original: { createdAt }
				}
			}) => {
				return <>{parseISOString(createdAt)}</>;
			}
		},
		{
			Header: 'Line Manager',
			accessor: 'lineManager',
			sortable: true,
			Cell: ({
				row: {
					original: { lineManager }
				}
			}) => {
				return <>{`${lineManager?.firstName} ${lineManager?.lastName}`}</>;
			}
		},
		{
			Header: 'Reviewing Manager',
			accessor: 'reviewingManager',
			sortable: true,
			Cell: ({
				row: {
					original: { reviewingManager }
				}
			}) => {
				return <>{`${reviewingManager?.firstName} ${reviewingManager?.lastName}`}</>;
			}
		},
		{
			Header: 'Status',
			accessor: 'status',
			// className: 'font-bold',
			sortable: true,
			Cell: ({ row: { original } }) => {
				return <KpoStatus status={original?.status} />;
			}
		}
	]);

	const { listOfKpo, handleDeleteKpo, push } = customHook;
	console.log(listOfKpo, 'table data');
	return (
		<EnhancedTable
			columns={columns}
			data={
				completed
					? listOfKpo.filter(kpo => kpo.status === 'completed')
					: listOfKpo.filter(kpo => kpo.status !== 'completed')
			}
			onRowClick={(ev, row) => {
				if (row && row.original.status !== 'rejected' && row.original.status !== 'requested') {
					push(`/performance_appraisal/kpoList/details/${row.original.id}`);
				}
			}}
			checkbox={{
				showCheckbox: true,
				onClick: value => console.log(value),
				accessor: 'id'
			}}
			selectAll={value => console.log(value)}
			handleDelete={handleDeleteKpo}
		/>
	);
};

export default EmployeeKpoListTable;
