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

	const temporaryKpoList = [
		// REMOVE this temporaryKpoList
		{
			id: 1,
			Q1: '',
			Q2: '',
			Q3: '',
			Q4: '',
			kpoCategory: {
				name: 'First Category'
			},
			kpoDescription: '',
			target: '',
			kpoPipTarget: '',
			kpoYearendRemarks: '',
			kpoYearendScore: '',
			status: 'pending',
			reviewingManager: {
				firstName: 'John',
				lastName: 'Travolta'
			},
			lineManager: {
				firstName: 'Boss',
				lastName: 'Manager'
			},
			employee: {
				email: 'jt@gmail.com'
			},
			jobTitle: {
				name: 'Software Dev'
			},
			createdAt: '2021-07-27T12:29:23.000Z'
		},
		{
			id: 2,
			Q1: '',
			Q2: '',
			Q3: '',
			Q4: '',
			kpoCategory: {
				name: 'Second Category'
			},
			kpoDescription: '',
			target: '',
			kpoPipTarget: '',
			kpoYearendRemarks: '',
			kpoYearendScore: '',
			status: 'created',
			reviewingManager: {
				firstName: 'Damon',
				lastName: 'Salvatore'
			},
			lineManager: {
				firstName: 'Boss',
				lastName: 'Manager'
			},
			employee: {
				email: 'ds@gmail.com'
			},
			jobTitle: {
				name: 'Software Tester'
			},
			createdAt: '2021-07-27T11:29:23.000Z'
		},
		{
			id: 3,
			Q1: '',
			Q2: '',
			Q3: '',
			Q4: '',
			kpoCategory: {
				name: 'Second Category'
			},
			kpoDescription: '',
			target: '',
			kpoPipTarget: '',
			kpoYearendRemarks: '',
			kpoYearendScore: '',
			status: 'completed',
			reviewingManager: {
				firstName: 'Stefan',
				lastName: 'Salvatore'
			},
			lineManager: {
				firstName: 'Zack',
				lastName: 'Salvatore'
			},
			employee: {
				email: 'sts@gmail.com'
			},
			jobTitle: {
				name: 'Software Developer'
			},
			createdAt: '2021-07-27T11:28:23.000Z'
		}
	];

	localStorage.setItem('kpoDetail', JSON.stringify(temporaryKpoList)); // REMOVE this

	console.log(temporaryKpoList, 'the new table data'); // REMOVE this
	return (
		<EnhancedTable
			columns={columns}
			data={
				completed
					? temporaryKpoList.filter(kpo => kpo.status === 'completed') // REMOVE the temporaryKpoList here
					: temporaryKpoList.filter(kpo => kpo.status !== 'completed') // REMOVE the temporaryKpoList here
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
