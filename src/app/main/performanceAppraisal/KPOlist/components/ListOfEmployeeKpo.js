import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Skeleton from '@material-ui/lab/Skeleton';
import KpoStatus from './KpoStatus';

const ListOfEmployeeKpo = ({ customHook, isAssigned, value, request, type }) => {
	const {
		// deptKpo,
		loading,
		handleDelete,
		push,
		assignedKpo,
		handleFilter,
		entities,
		role,
		kpoRequest,
		handleOpen,
		getKpos
	} = customHook;
	const columns = React.useMemo(
		() => [
			{
				Header: 'Employee Name',
				accessor: 'employeeName',
				// className: 'font-bold',
				sortable: true,
				Cell: ({ row: { original: { employee  } } }) => {
					return <>{`${employee?.firstName} ${employee?.lastName}`}</>
				}
			},
			{
				Header: 'Entity',
				accessor: 'entity',
				// className: 'font-bold',
				sortable: true,
				Cell: ({ row: { original } }) => {
					return <>{original?.entity?.entityName}</>
				}
			},
			{
				Header: 'Department',
				accessor: 'department',
				// className: 'font-bold',
				sortable: true,
				Cell: ({ row: { original } }) => {
					return <>{original?.department?.departmentName}</>
				}
			},
			{
				Header: 'Job Title',
				accessor: 'jobTitleId',
				// className: 'font-bold',
				sortable: true,
				Cell: ({ row: { original: { jobTitle } } }) => {
					return <>{jobTitle.name}</>
				}
			},
			{
				Header: 'Status',
				accessor: 'status',
				// className: 'font-bold',
				sortable: true,
				Cell:({row: { original } }) => {
					return (<KpoStatus status={original?.status} />)
				}
			},
			{
				Header: 'Total Year-end Score',
				accessor: 'totalYearendScore',
				sortable: true
			},
			{
				Header: 'Total PIP Achieved',
				accessor: 'totalPipAchieved',
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
				Cell: ({ row: { original } }) => {
					return <>{original?.dateCompleted || 'On Going'}</>
				}
			},
			{
				Header: 'Line Manager',
				accessor: 'lineManager',
				sortable: true,
				Cell: ({ row: { original: { lineManager } } }) => {
					return <>{`${lineManager?.firstName} ${lineManager?.lastName}`}</>
				}
			},
			{
				Header: 'Reviewing Manager',
				accessor: 'reviewingManager',
				sortable: true,
				Cell: ({ row: { original: { reviewingManager } } }) => {
					return <>{`${reviewingManager?.firstName} ${reviewingManager?.lastName}`}</>
				}
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
							data={
								isAssigned ? assignedKpo : request ? kpoRequest : getKpos(type)
							}
							onRowClick={(ev, row) => {
								if (row && !request) {
									push(`/performance_appraisal/kpo/review/details/${row.original.id}`)
								} else {
									handleOpen(row.original);
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
								!isAssigned && role === 'hrmanager' && (
									<Toolbar entities={entities} handleFilter={handleFilter} value={value}/>
								)
							}
						/>
					)
			}
		</>
	);
};


const Toolbar = ({entities, handleFilter, value}) => {
	return (
		<Grid container spacing={1} className='w-2/5'>
			<Grid item lg={5} md={4} sm={4} xs={4}>
				<SelectTextField
					label='Entities'
					className='mr-10'
					size='small'
					onChange={handleFilter}
					defaultValue={value}
				>
					{
						entities.map(({entityName, id }) => (
							<MenuItem value={id} key={id}>
								{entityName}
          		</MenuItem>
						))
					}
				</SelectTextField>
			</Grid>
		</Grid>
	)
}


export default ListOfEmployeeKpo;