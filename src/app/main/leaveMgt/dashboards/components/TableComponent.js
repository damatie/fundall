import EnhancedTable from 'app/main/contact_list/ContactsTable';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const TableComponent = ({ data, lineManager }) => {
	const columns = React.useMemo(
		() => [
			{
				Header: 'Avatar',
				accessor: 'profilePicture',
				Cell: ({ row }) => {
					return <Avatar className="mx-8" alt={row.fullName} src={row.profilePicture} />;
				},
				className: 'justify-center',
				width: 64,
				sortable: false
			},
			{
				Header: 'Full name',
				accessor: 'fullName',
				// className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Email',
				accessor: 'email',
				sortable: true
			},
			// {
			// 	Header: 'Entity',
			// 	accessor: 'entity',
			// 	// className: 'font-bold',
			// 	sortable: true
			// },
			{
				Header: 'Total leave days',
				accessor: 'total',
				sortable: true
			},
			{
				Header: 'Taken leave days',
				accessor: 'taken',
				sortable: true
			},
			{
				Header: 'Remaining leave days',
				accessor: 'remain',
				sortable: true
			}
		],
	);
	return (
		<Paper className='rounded-8 p-20'>
			<Typography variant="subtitle1" color="initial" className='mb-20 text-center font-semibold'>Employee Leave Days Summary</Typography>
			<section className='flex flex-row justify-between items-center w-2/4'>
				<SelectTextField label='Year' value={2020} size='small'>
					{[2019, 2020].map(item => (
						<MenuItem value={item}>
							{item}
						</MenuItem>
					))}
				</SelectTextField>
				{!lineManager && <SelectTextField label='Entity' value='SREL' size='small'>
					{['SREL', '5C', 'C-BIT'].map(item => (
						<MenuItem value={item}>
							{item}
						</MenuItem>
					))}
				</SelectTextField>}
				<SelectTextField label='Department' value='IT' size='small'>
					{['IT', '5C', 'C-BIT'].map(item => (
						<MenuItem value={item}>
							{item}
						</MenuItem>
					))}
				</SelectTextField>
			</section>
			<EnhancedTable
				columns={columns}
				data={data}
				onRowClick={(ev, row) => {
					if (row) {

					}
				}}
			/>
		</Paper>
	);
};

export default TableComponent;