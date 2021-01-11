import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import useJobTitle from '../hooks/useJobTitle';
import TableToolbar from './TableToolbar';

const JobTitleTable = () => {
	const { data, handleDelete, handleGetOne } = useJobTitle();
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
			{
				Header: 'Entity',
				accessor: 'entity',
				sortable: true,
				align: 'center'
			},
			{
				Header: 'Modified',
				accessor: 'updatedAt',
				align: 'right',
				sortable: true,
				Cell: ({ row : { original }}) => {
					return <>{moment(original.updatedAt).format('LLL')}</>
				}
			},
			{
				Header: 'Modified By',
				accessor: 'modifiedBy',
				sortable: true,
				align: 'center'
			},
			
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
			toolBar={<TableToolbar/>}
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