import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import moment from 'moment';

const BehaviouralAttributeContent = ({data, customHook}) => {
  const columns = React.useMemo(
		() => [
			{
				Header: 'Title',
				accessor: 'subject',
				// className: 'font-bold',
				sortable: true,
			},
			{
				Header: 'Description',
				accessor: 'subtext',
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
				accessor: 'modifiedby',
				align: 'right',
			},
		],
	);
	return (
		<EnhancedTable
			columns={columns}
			data={data}
			onRowClick={(ev, row) => {
				if (row) {
          customHook.handleGetOne(row.values)
				}
			}}
			checkbox={{
				showCheckbox: true,
				onClick: (value) => console.log(value),
				accessor: 'id',
			}}
			selectAll={(value) => console.log(value)}
			handleDelete={customHook.handleDelete}
		/>
	);
};

export default BehaviouralAttributeContent;