import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import useKpoList from '../hooks/useKpoList';

const EmployeeKpoListTable = () => {
	const columns = React.useMemo(
		() => [
			{
				Header: 'Job Role',
				accessor: 'jobTitle',
				// className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Total Score',
				accessor: 'personnelOverallRating',
				sortable: true,
				Cell: ({ row: { original: { personnelOverallRating }} }) => {
					return <>{personnelOverallRating || 'On Going'}</>
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
					return <>{dateCompleted || 'On Going'}</>
				}
      },
      {
				Header: 'Line Manager',
				accessor: 'lineManager',
				sortable: true
      },
      {
				Header: 'Reviewing Manager',
				accessor: 'reviewingManager',
				sortable: true
			},
		],
	);

	const {
		listOfKpo,
		handleDeleteKpo,
		push
	} = useKpoList();
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