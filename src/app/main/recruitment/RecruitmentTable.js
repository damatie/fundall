import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import RecruitmentStatus from './RecruitmentStatus';
import moment from 'moment';

const RecruitmentTable = ({ customHook, search, rows }) => {

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
				return <>{<span style={{wordWrap: 'break-word'}} dangerouslySetInnerHTML={{ __html: jobDescription.substr(0, 500) +'...'}} />}</>;
			}
		},
		{
			Header: 'Employment Type',
			accessor: 'positionType',
			// className: 'font-bold',
			sortable: true,
			Cell: ({
				row: {
					original: { positionType }
				}
			}) => {
				return <>{positionType}</>;
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
				return <>{moment(desiredHiredDate).format('DD-MM-YYYY')}</>;
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
				return <>{`${employeeGrade?.gradeName}`}</>;
			}
		},
		{
			Header: 'Date Modified',
			accessor: 'dateModified',
			sortable: true,
			Cell: ({
				row: {
					original: { modifiedAt }
				}
			}) => {
				return <>{`${moment(modifiedAt).format('DD-MM-YYYY')}`}</>;
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
				return <>{`${candidates.length}`}</>;
			}
		},
		{
			Header: 'Urgency',
			accessor: 'urgency',
			// className: 'font-bold',
			sortable: true,
			Cell: ({ row: { 
				original: { urgency } 
			} }) => {
				return <RecruitmentStatus status={urgency?.toUpperCase()} />;
			}
		}
	]);

	const { handleDeleteRecruitment, push } = customHook;
	const data = rows.filter(row => row?.jobTitle?.name?.toLowerCase().includes(search.toLowerCase()) 
	|| row?.employeeGrade?.gradeName?.toLowerCase().includes(search.toLowerCase())
	|| row?.positionType?.toLowerCase().includes(search.toLowerCase())
	|| row?.urgency?.toLowerCase().includes(search.toLowerCase()));
	return (
		<EnhancedTable
			columns={columns}
			data={data}
			onRowClick={(ev, row) => {
				// if (row && row.original.status !== 'rejected' && row.original.status !== 'requested') {
					push(`/recruitment/position_details/${row.original.id}`);
				// }
			}}
			checkbox={{
				showCheckbox: true,
				onClick: value => console.log(value),
				accessor: 'id'
			}}
			selectAll={value => console.log(value)}
			handleDelete={handleDeleteRecruitment}
		/>
	);
};

export default RecruitmentTable;
