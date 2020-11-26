import EnhancedTable from 'app/main/contact_list/ContactsTable';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
		<section className='my-20 mx-10'>
			<Grid container spacing={1} alignItems='center'>
				<Grid item lg={!lineManager ? 2 : 1}>
					<SelectTextField
						value={2020}
						size='small'
						label='Year'
					>
						{[2019, 2020].map(item => (
							<MenuItem value={item}>
								{item}
							</MenuItem>
						))}
					</SelectTextField>
				</Grid>
				{!lineManager ? (<Grid item lg={2}>
					<SelectTextField
						value={'Finance'}
						size='small'
						label='Department'
					>
						{['Finance', 'IT'].map(item => (
							<MenuItem value={item}>
								{item}
							</MenuItem>
						))}
					</SelectTextField>
				</Grid>) : (<></>)}
				<Grid item lg={!lineManager ? 8 : 10}>
					<Typography variant="subtitle1" color="initial" className='font-semibold text-center'>Employee leave days summary</Typography>
				</Grid>
			</Grid>
			<EnhancedTable
				columns={columns}
				data={data}
				onRowClick={(ev, row) => {
					if (row) {

					}
				}}
			/>
		</section>
	);
};

export default TableComponent;