import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import useKPOcategoryList from '../hooks/useKPOcategoryList';
import Typography from '@material-ui/core/Typography';
import moment from ''


const KPOcategoryTable = () => {
	const { kpoCategoryList, handleGetCategory, handleDeleteKpoCategory } = useKPOcategoryList();
	const columns = React.useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'name',
				// className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Description',
				accessor: 'description',
				sortable: true
			},
			{
				Header: 'Modified',
				accessor: 'updatedAt',
				sortable: true,
				Cell: ({ row : { original }}) => {
					return <>{}</>
				}
			},
			{
				Header: 'Modified by',
				accessor: 'modifiedBy',
				sortable: true
			},
			{
				Header: 'Status',
				accessor: 'status',
				Cell: ({ row: { values: { status } } }) => {
					return <Status status={status} />
				},
				className: 'justify-center',
				// width: 64,
				sortable: false
			},
		],
	);

	return (
		<EnhancedTable
			columns={columns}
			data={kpoCategoryList}
			onRowClick={(ev, row) => {
				if (row) {
					handleGetCategory(row.values);
				}
			}}
			checkbox={{
				showCheckbox: true,
				onClick: (value) => console.log(value),
				accessor: 'id',
			}}
			selectAll={(value) => console.log(value)}
			handleDelete={handleDeleteKpoCategory}
		/>
	);
};

const Status = ({ status }) => {
	switch (status.toUpperCase()) {
		case 'ACTIVE':
			return (
				<Typography className={'bg-green text-white inline text-11 font-500 px-8 py-4 rounded-4'}>{status}</Typography>
			);
		case 'INACTIVE':
			return (
				<Typography className={'bg-red text-white inline text-11 font-500 px-8 py-4 rounded-4'}>{status}</Typography>
			);
		default: {
			return status;
		}
	}
};

export default KPOcategoryTable;