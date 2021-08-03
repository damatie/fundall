import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import KpoStatus from './RecruitmentStatus';

const RecruitmentTable = ({ customHook, completed }) => {
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
			Header: 'Job Description',
			accessor: 'jobDescription',
			// className: 'font-bold',
			sortable: true,
			Cell: ({
				row: {
					original: { jobDescription }
				}
			}) => {
				return <>{jobDescription}</>;
			}
		},
		{
			Header: 'Employment Type',
			accessor: 'employmentType',
			// className: 'font-bold',
			sortable: true,
			Cell: ({
				row: {
					original: { employmentType }
				}
			}) => {
				return <>{employmentType}</>;
			}
		},
		{
			Header: 'Desired Hired Date',
			accessor: 'desiredHiredDate',
			// className: 'font-bold',
			sortable: true,
			Cell: ({
				row: {
					original: { desiredHiredDate }
				}
			}) => {
				return <>{parseISOString(desiredHiredDate)}</>;
			}
		},
		{
			Header: 'Employee Grade',
			accessor: 'employeeGrade',
			sortable: true,
			Cell: ({
				row: {
					original: { employeeGrade }
				}
			}) => {
				return <>{`${employeeGrade?.name}`}</>;
			}
		},
		{
			Header: 'Date Modified',
			accessor: 'dateModified',
			sortable: true,
			Cell: ({
				row: {
					original: { dateModified }
				}
			}) => {
				return <>{`${dateModified}`}</>;
			}
		},
		{
			Header: 'No. of Candidates',
			accessor: 'candidates',
			sortable: true,
			Cell: ({
				row: {
					original: { candidates }
				}
			}) => {
				return <>{`${candidates}`}</>;
			}
		},
		{
			Header: 'Urgency',
			accessor: 'urgency',
			// className: 'font-bold',
			sortable: true,
			Cell: ({ row: { urgency } }) => {
				return <KpoStatus status={urgency} />;
			}
		}
	]);

	const { rows, handleDeleteKpo, push } = customHook;
	console.log(rows, 'table data');
	return (
		<EnhancedTable
			columns={columns}
			data={rows}
			// onRowClick={(ev, row) => {
			// 	if (row && row.original.status !== 'rejected' && row.original.status !== 'requested') {
			// 		push(`/performance_appraisal/kpoList/details/${row.original.id}`);
			// 	}
			// }}
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

export default RecruitmentTable;
