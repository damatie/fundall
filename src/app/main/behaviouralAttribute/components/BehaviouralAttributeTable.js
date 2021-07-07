import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import moment from 'moment';

const BehaviouralAttributeTable = ({handleDelete, state, push}) => {
  const columns = React.useMemo(
		() => [
			{
				Header: 'Title',
				accessor: 'title',
				// className: 'font-bold',
				sortable: true,
			},
			{
				Header: 'Description',
				accessor: 'description',
				sortable: true,
      },
			{
				Header: 'Modified',
				accessor: 'updatedAt',
				align: 'right',
				Cell: ({ row : { original }}) => {
					return <>{moment(original.updatedAt).format('LLL')}</>
				}
			},

			{
				Header: 'Modified By',
				// accessor: 'updatedAt',
				align: 'right',
				Cell: ({ row : { original }}) => {
					return <>{`${original.modifier?.firstName} ${original.modifier?.lastName}`}</>
				}
			},
		],
	);

	return (
		<EnhancedTable
			columns={columns}
			data={state.data}
			onRowClick={(ev, row) => {
				if (row) {
					// handleGetOne(row.values)
					push(`/behaviouralAttribute/content/${row.original.id}`)
				}
			}}
			checkbox={{
				showCheckbox: true,
				onClick: (value) => // console.log(value),
				accessor: 'id',
			}}
			selectAll={(value) => // console.log(value)}
			handleDelete={handleDelete}
		/>
	);
};

export default BehaviouralAttributeTable;