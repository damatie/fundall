import EnhancedTable from 'app/main/contact_list/ContactsTable';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const TableComponent = ({ data }) => {
	const columns = React.useMemo(
		() => [
			{
				Header: 'Department',
				accessor: 'dept',
				sortable: true
			},
			{
				Header: 'Cost of Training',
				accessor: 'cost',
				sortable: true
			}
		],
	);
	return (
		<section className='my-20 mx-10'>
			<Grid container spacing={1} alignItems='center'>
				<Grid item >
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
				<Grid item>
					<Typography variant="subtitle1" color="initial" className='font-semibold text-center'>Training Costings</Typography>
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