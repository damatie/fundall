import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import moment from 'moment';

const JobTitleTable = ({customHook}) => {
	const { data, handleDelete, handleGetOne } = customHook;
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
				align: 'center'
			},
			// {
			// 	Header: 'Entity',
			// 	accessor: 'entity',
			// 	sortable: true,
			// 	align: 'center'
			// },
			{
				Header: 'Modified',
				accessor: 'updatedAt',
				align: 'right',
				sortable: true,
				Cell: ({ row : { original }}) => {
					return <>{moment(original.updatedAt).format('LLL')}</>
				}
			},
			// {
			// 	Header: 'Modified By',
			// 	accessor: 'modifiedBy',
			// 	sortable: true,
			// 	align: 'center'
			// },
			
		],
	);

	return (
		<EnhancedTable
			columns={columns}
			data={data || []}
			onRowClick={(ev, row) => {
				if (row) {
          handleGetOne(row.values)
				}
			}}
			// toolBar={<TableToolbar/>}
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

export default JobTitleTable;