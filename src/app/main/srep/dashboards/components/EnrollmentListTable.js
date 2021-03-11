import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Icon from '@material-ui/core/Icon';
import { TextFieldFormsy } from '@fuse/core/formsy';
import Formsy from 'formsy-react';


const EnrollmentListTable = ({ data, handleFilter}) => {
  const columns = React.useMemo(
		() => [
			{
				Header: 'Employee Name',
				accessor: 'employeeName',
				sortable: true,
				Cell: ({ row: { original: { firstName, lastName }} }) => {
					return <>{`${firstName} ${lastName}`}</>
				}
			},
			{
				Header: 'Employee Email',
				accessor: 'email',
				sortable: true
			},
			{
				Header: 'Entity',
				accessor: 'entity',
				sortable: true,
				Cell: ({ row: { original: { entity }} }) => {
					return <>{entity.entityName}</>
				}
			},
            {
				Header: 'Department',
				accessor: 'department',
				sortable: true,
				Cell: ({ row: { original: { department }} }) => {
					return <>{department.departmentName}</>
				}
			},
            {
				Header: 'Capital Funds',
				accessor: 'capital',
				sortable: true,
				Cell: ({ row: { original: { capital }} }) => {
					return <>{capital.Amount}</>
				}
			},
            {
				Header: 'Beneficiary Name',
				accessor: 'beneficiaryName',
				sortable: true,
				Cell: ({ row: { original: { beneficiary }} }) => {
					return <>{`${beneficiary.lirstName} ${beneficiary.lastName}`}</>
				}
			},
            {
				Header: 'Beneficiary Nationality',
				accessor: 'beneficiaryNationality',
				sortable: true,
				Cell: ({ row: { original: { beneficiary }} }) => {
					return <>{beneficiary.nationality}</>
				}
			},
            {
				Header: 'Beneficiary Gender',
				accessor: 'beneficiaryGender',
				sortable: true,
				Cell: ({ row: { original: { beneficiary }} }) => {
					return <>{beneficiary.gender}</>
				}
			},
			{
				Header: 'Relationship',
				accessor: 'relationship',
				sortable: true,
				Cell: ({ row: { original: { beneficiary }} }) => {
					return <>{beneficiary.relationship}</>
				}
			},{
				Header: 'Beneficiary Email',
				accessor: 'beneficiaryEmail',
				sortable: true,
				Cell: ({ row: { original: { beneficiary }} }) => {
					return <>{beneficiary.email}</>
				}
			},
		],
	);
	
	const {
		employees,
		entities,
		departments,
        years,
	} = data;

    function handleSearch(event) {
        setSearch(event.target.value);
    }
  
  return (
      <EnhancedTable
            columns={columns}
            data={employees}
            toolBar={
              <Grid container spacing={1} alignItems='left'>
                <Grid container spacing={1} alignItems='left' style={{ marginTop: "10px" }}>
                    <Grid item lg={3} md={4} sm={6} xs={6} className="font-semibold mt-10">
                    Enrollment List
                    </Grid>
                </Grid>
                    <Formsy>
                <Grid container spacing={1} alignItems='left' className="flex flex-row" style={{ marginTop: "10px" }}>
                    <Grid item lg={3} md={3} sm={3} xs={3} style={{ marginTop: "15px" }} >
                    Date: 
                    </Grid>
                    <Grid item lg={9} md={9} sm={9} xs={9}>
                    <TextFieldFormsy
                        className="w-full"
                        type="date"
                        name="name"
                        // label="Birth date"
                        variant="outlined"
                    />
                    </Grid>
                </Grid>
                    </Formsy>
                <Grid container spacing={1} alignItems='left' style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                    Employees enrolled in SREP: {30} Employees
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems='left'>
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                    <div className="flex items-center">
                            <Paper className="flex items-center w-full px-8 py-4 rounded-8">
                                <Icon color="action">search</Icon>
                                <Input
                                    placeholder="Filter SREP"
                                    className="flex flex-1 mx-8"
                                    disableUnderline
                                    fullWidth
                                    value={"Filter SREP"}
                                    inputProps={{
                                        'aria-label': 'Search'
                                    }}
                                    onChange={e => handleSearch(e)}
                                />
                            </Paper>
                        </div>
                    </Grid>
                    <Grid item lg={2} md={3} sm={4} xs={4}>
                    <SelectTextField
                        label="Department"
                        size='small'
                        onChange={handleFilter}
                    >
                                    {
                                        departments.map(({id, departmentName}) => (
                                            <MenuItem key={id} value={id}>
                                                {departmentName}
                                            </MenuItem>
                                        ))
                                    }
                    </SelectTextField>
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
                        label="Year"
                        size='small'
                        onChange={handleFilter}
                    >
                        {
                                        years.map(({id, year}) => (
                                            <MenuItem key={id} value={id}>
                                                {year}
                                            </MenuItem>
                                        ))
                                    }
                    </SelectTextField>
                    </Grid> 
                </Grid>
              </Grid>
            }
          />
  );
};

export default EnrollmentListTable;