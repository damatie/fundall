import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import moment from 'moment';

const EmployeeGradeTable = ({ customHook }) => {
  const columns = React.useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'name',
				// className: 'font-bold',
				sortable: true,
			},
			{
				Header: 'Description',
				accessor: 'description',
				sortable: true,
      },
      {
				Header: 'PIP Eligibility',
				accessor: 'pip',
				sortable: true,
				Cell: ({ row: { original }}) => {
					return <>{(original.pip) ? 'Yes' : 'No'}</>
				}
			},
			{
				Header: 'Modified',
				accessor: 'updatedAt',
				align: 'right',
				Cell: ({ row : { original }}) => {
					return <>{moment(original.updatedAt).format('LLL')}</>
				}
			},
		],
	);

	const { handleGetOne, handleDelete, state } = customHook;

	return (
		<EnhancedTable
			columns={columns}
			data={state?.data}
			onRowClick={(ev, row) => {
				if (row) {
          handleGetOne(row.values)
				}
			}}
			checkbox={{
				showCheckbox: true,
				onClick: (value) => console.log(value),
				accessor: 'id',
			}}
			selectAll={(value) => console.log(value)}
			handleDelete={handleDelete}
		/>
	);
};

export default EmployeeGradeTable;