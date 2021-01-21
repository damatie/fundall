import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';

const EmployeeKpoListTable = ({customHook}) => {
	const columns = React.useMemo(
		() => [
			{
				Header: 'Job Title',
				accessor: 'jobTitle',
				// className: 'font-bold',
				sortable: true,
				Cell: ({ row: { original: { jobTitle }} }) => {
					return <>{jobTitle?.name}</>
				}
			},
			{
				Header: 'Status',
				accessor: 'status',
				// className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Total Score',
				accessor: 'personnelOverallRating',
				sortable: true,
				Cell: ({ row: { original: { personnelOverallRating }} }) => {
					return <>{personnelOverallRating || 'on-going'}</>
				}
			},
			{
				Header: 'KPO Year',
				accessor: 'kpoYear',
				sortable: true
			},
			{
				Header: 'Date Completed',
				accessor: 'dateCompleted',
				sortable: true,
				Cell: ({ row: { original: { dateCompleted }} }) => {
					return <>{dateCompleted || 'on-going'}</>
				}
			},
      {
				Header: 'Line Manager',
				accessor: 'lineManager',
				sortable: true,
				Cell: ({ row: { original: {  lineManager }} }) => {
					return <>{`${lineManager?.firstName} ${lineManager?.lastName}`}</>
				}
      },
      {
				Header: 'Reviewing Manager',
				accessor: 'reviewingManager',
				sortable: true,
				Cell: ({ row: { original: {  reviewingManager }} }) => {
					return <>{`${reviewingManager?.firstName} ${reviewingManager?.lastName}`}</>
				}
			},
		],
	);

	const {
		listOfKpo,
		handleDeleteKpo,
		push
	} = customHook;
	return (
		<EnhancedTable
			columns={columns}
			data={listOfKpo}
			onRowClick={(ev, row) => {
				if (row) {
					push(`/performance_appraisal/kpoList/details/${row.original.id}`)
				}
			}}
			checkbox={{
				showCheckbox: true,
				onClick: (value) => console.log(value),
				accessor: 'id',
			}}
			selectAll={(value) => console.log(value)}
			handleDelete={handleDeleteKpo}
		/>
	);
};


export default EmployeeKpoListTable;