import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const EmployeeKpoListTable = () => {
	const columns = React.useMemo(
		() => [
			{
				Header: 'Job Role',
				accessor: 'jobRole',
				// className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Total Score',
				accessor: 'totalScore',
				sortable: true
			},
			{
				Header: 'KPO Year',
				accessor: 'kpoYear',
				sortable: true
			},
			{
				Header: 'Date Completed',
				accessor: 'dataCompleted',
				sortable: true
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

	return (
		<EnhancedTable
			columns={columns}
			data={[]}
			onRowClick={(ev, row) => {
				if (row) {
					console.log(row)
				}
			}}
			checkbox={{
				showCheckbox: true,
				onClick: (value) => console.log(value),
				accessor: 'id',
			}}
			selectAll={(value) => console.log(value)}
		/>
	);
};


export default EmployeeKpoListTable;