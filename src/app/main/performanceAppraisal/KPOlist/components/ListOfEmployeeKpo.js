import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import useKpoList from '../hooks/useKpoList';
import Grid from '@material-ui/core/Grid';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';


const ListOfEmployeeKpo = () => {
	const columns = React.useMemo(
		() => [
      {
				Header: 'Employee Name',
				accessor: 'employeeName',
				// className: 'font-bold',
				sortable: true
      },
      {
				Header: 'Entity',
				accessor: 'entity',
				// className: 'font-bold',
				sortable: true
      },
      {
				Header: 'Department',
				accessor: 'department',
				// className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Job Role',
				accessor: 'jobRole',
				// className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Total Score',
				accessor: 'totalScore',
				sortable: true
			},
			{
				Header: 'KPO Year',
				accessor: 'kpoYear',
				sortable: true
			},
			{
				Header: 'Date Completed',
				accessor: 'dateCompleted',
				sortable: true
      },
      {
				Header: 'Line Manager',
				accessor: 'lineManager',
				sortable: true
      },
      {
				Header: 'Reviewing Manager',
				accessor: 'reviewingManager',
				sortable: true
			},
		],
	);

	const {
		listOfKpo,
		handleDeleteKpo,
		push
	} = useKpoList();
	return (
		<EnhancedTable
			columns={columns}
			data={listOfKpo}
			onRowClick={(ev, row) => {
				if (row) {
					push(`/performance_appraisal/kpoList/details/${row.original.id}`)
				}
			}}
			checkbox={{
				showCheckbox: true,
				onClick: (value) => console.log(value),
				accessor: 'id',
			}}
			selectAll={(value) => console.log(value)}
      handleDelete={handleDeleteKpo}
      toolBar={
        <Toolbar />
      }
		/>
	);
};


const Toolbar = () => {
  return (
    <Grid container spacing={1} className='w-2/5'>
      <Grid item lg={4} md={4} sm={4} xs={4}>
        <SelectTextField
          label='Entity'
          className='mr-10'
          size='small'
        >
          <MenuItem value="Active">
            Office Admin
          </MenuItem>
          <MenuItem value="Inactive">
            Dev Ops
          </MenuItem>
        </SelectTextField>
      </Grid>
      <Grid item lg={4} md={4} sm={4} xs={4}>
      <SelectTextField
          label='Department'
          className='mr-10'
          size='small'
        >
          <MenuItem value="Active">
            Office Admin
          </MenuItem>
          <MenuItem value="Inactive">
            Dev Ops
          </MenuItem>
        </SelectTextField>
      </Grid>
      <Grid item lg={4} md={4} sm={4} xs={4}>
      <SelectTextField
          label='Status'
          className='mr-10'
          size='small'
        >
          <MenuItem value="Active">
            Office Admin
          </MenuItem>
          <MenuItem value="Inactive">
            Dev Ops
          </MenuItem>
        </SelectTextField>
      </Grid>
    </Grid>
  )
}


export default ListOfEmployeeKpo;