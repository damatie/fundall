import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import SelectTextField from 'app/shared/TextInput/SelectTextField';

const EmployeeTable = () => {
  const columns = React.useMemo(
		() => [
			{
				Header: 'NAME',
				accessor: 'name',
				// className: 'font-bold',
				sortable: true,
				// Cell: ({ row: { original: { jobTitle }} }) => {
				// 	return <>{jobTitle?.name}</>
				// }
			},
			{
				Header: 'EMAIL',
				accessor: 'email',
				// className: 'font-bold',
				sortable: true
			},
			{
				Header: 'DEPARTMENT',
				accessor: 'department',
				sortable: true,
				// Cell: ({ row: { original: { personnelOverallRating }} }) => {
				// 	return <>{personnelOverallRating || 'on-going'}</>
				// }
			},
			{
				Header: 'ENTITY',
				accessor: 'entity',
				sortable: true
			},
			{
				Header: 'ROLE',
				accessor: 'role',
				sortable: true,
				// Cell: ({ row: { original: { dateCompleted }} }) => {
				// 	return <>{dateCompleted || 'on-going'}</>
				// }
			},
		],
  );
  
  return (
    <EnhancedTable
      columns={columns}
			data={[]}
			onRowClick={(ev, row) => {
				if (row) {
					// push(`/performance_appraisal/kpoList/details/${row.original.id}`)
				}
			}}
			checkbox={{
				showCheckbox: true,
				onClick: (value) => console.log(value),
				accessor: 'id',
			}}
			selectAll={(value) => console.log(value)}
      handleDelete={() => null}
      toolBar={
        <Grid container spacing={1} alignItems='center'>
          <Grid item lg={1} md={2} sm={4} xs={4}>
            Filter By:
          </Grid>
          <Grid item lg={2} md={2} sm={4} xs={4}>
            <SelectTextField
              label="Entity"
              size='small'
            >
              <MenuItem>
                Entity
              </MenuItem>
            </SelectTextField>
          </Grid>
          <Grid item lg={2} md={2} sm={4} xs={4}>
            <SelectTextField
              label="Role"
              size='small'
            >
              <MenuItem>
                Role
              </MenuItem>
            </SelectTextField>
          </Grid> 
        </Grid>
      }
    />
  );
};

export default EmployeeTable;