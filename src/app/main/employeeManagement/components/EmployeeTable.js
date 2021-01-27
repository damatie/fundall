import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import SelectTextField from 'app/shared/TextInput/SelectTextField';

const EmployeeTable = ({ data, push, handleDelete, handleFilter}) => {
  const columns = React.useMemo(
		() => [
			{
				Header: 'NAME',
				accessor: 'name',
				// className: 'font-bold',
				sortable: true,
				Cell: ({ row: { original: { firstName, lastName }} }) => {
					return <>{`${firstName} ${lastName}`}</>
				}
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
				Cell: ({ row: { original: { department }} }) => {
					return <>{department.departmentName}</>
				}
			},
			{
				Header: 'ENTITY',
				accessor: 'entity',
				sortable: true,
				Cell: ({ row: { original: { entity }} }) => {
					return <>{entity.entityName}</>
				}
			},
			{
				Header: 'ROLE',
				accessor: 'role',
				sortable: true,
				Cell: ({ row: { original: { role }} }) => {
					return <>{role.name}</>
				}
			},
		],
	);
	
	const {
		employees,
		entities,
		roles,
	} = data;
  
  return (
    <EnhancedTable
      columns={columns}
			data={employees}
			onRowClick={(ev, row) => {
				if (row) {
					push(`/employee_management/${row.original.id}`)
				}
			}}
			checkbox={{
				showCheckbox: true,
				onClick: (value) => console.log(value),
				accessor: 'id',
			}}
			selectAll={(value) => console.log(value)}
      handleDelete={handleDelete}
      toolBar={
        <Grid container spacing={1} alignItems='center'>
          <Grid item lg={1} md={2} sm={4} xs={4}>
            Filter By:
          </Grid>
          <Grid item lg={2} md={2} sm={4} xs={4}>
            <SelectTextField
              label="Entity"
              size='small'
              onChange={handleFilter}
            >
							{
								entities.map(({id, entityName}) => (
									<MenuItem key={id} value={id}>
										{entityName}
									</MenuItem>
								))
							}
            </SelectTextField>
          </Grid>
          <Grid item lg={2} md={2} sm={4} xs={4}>
            <SelectTextField
              label="Role"
              size='small'
              onChange={handleFilter}
            >
              {
								roles.map(({id, name}) => (
									<MenuItem key={id} value={id}>
										{name}
									</MenuItem>
								))
							}
            </SelectTextField>
          </Grid> 
        </Grid>
      }
    />
  );
};

export default EmployeeTable;