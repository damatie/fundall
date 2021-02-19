import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const BehaviouralAttributeContent = () => {
  const columns = React.useMemo(
		() => [
			{
				Header: 'Title',
				accessor: 'name',
				// className: 'font-bold',
				sortable: true,
			},
			{
				Header: 'Content',
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
				accessor: 'updatedBy',
				align: 'right',
			},
		],
	);
	return (
		<EnhancedTable
			columns={columns}
			data={[]}
			onRowClick={(ev, row) => {
				if (row) {
          // handleGetOne(row.values)
				}
			}}
			checkbox={{
				showCheckbox: true,
				onClick: (value) => console.log(value),
				accessor: 'id',
			}}
			selectAll={(value) => console.log(value)}
			handleDelete={(handleDelete) => null}
		/>
	);
};

export default BehaviouralAttributeContent;