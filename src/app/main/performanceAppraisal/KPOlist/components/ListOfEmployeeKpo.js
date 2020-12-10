import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import useKpoList from '../hooks/useKpoList';
import Grid from '@material-ui/core/Grid';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import useKpoReview from '../hooks/useKpoReview';
import Skeleton from '@material-ui/lab/Skeleton';

const ListOfEmployeeKpo = ({user}) => {
	const { 
		deptKpo,
		loading,
		handleDelete,
		push,
		assignedKpo
	} = useKpoReview(user);
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
				sortable: true,
				Cell: ({ row: { original }}) => {
					return <>{original.entity.entityName}</>
				}
      },
      {
				Header: 'Department',
				accessor: 'department',
				// className: 'font-bold',
				sortable: true,
				Cell: ({ row: { original }}) => {
					return <>{original.department.departmentName}</>
				}
			},
			{
				Header: 'Job Role',
				accessor: 'jobTitleId',
				// className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Total Score',
				accessor: 'personnelOverallRating',
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
				sortable: true,
				Cell: ({ row: { original }}) => {
					return <>{original.dateCompleted || 'On Going'}</>
				}
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
	return (
		<>
			{
				loading ? (
					<Skeleton animation='wave' width='100%' height='350px' variant='rect' />
				) : (
		<EnhancedTable
			columns={columns}
			data={user !== 'reviewingManager' ? [deptKpo] : assignedKpo}
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
      handleDelete={handleDelete}
      toolBar={
        <Toolbar />
      }
		/>
				)
			}
		</>
		
	);
};


const Toolbar = () => {
  return (
    <Grid container spacing={1} className='w-2/5'>
      {/* <Grid item lg={4} md={4} sm={4} xs={4}>
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
      </Grid> */}
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