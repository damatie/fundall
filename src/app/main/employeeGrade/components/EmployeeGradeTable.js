import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import moment from 'moment';
import EmployeeGradeToolbar from './EmployeeGradeToolbar';

const EmployeeGradeTable = ({ customHook }) => {
  const columns = React.useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'gradeName',
				// className: 'font-bold',
				sortable: true,
			},
			{
				Header: 'Entity',
				accessor: 'entityName',
				// className: 'font-bold',
				sortable: true,
			},
			{
				Header: 'Description',
				accessor: 'gradeDescription',
				sortable: true,
      },
      {
				Header: 'PIP Eligibility',
				accessor: 'pipEligibility',
				sortable: true,
				Cell: ({ row: { original }}) => {
					return <>{(original.pipEligibility) ? 'Yes' : 'No'}</>
				}
			},
			{
				Header: 'Modified',
				accessor: 'updatedAt',
				align: 'right',
				Cell: ({ row : { original }}) => {
					return <>{moment(original.updatedAt).format('LLL')}</>
				}
			},
		],
	);

	const { handleGetOne, handleDelete, state, gotoPage, handleFilter } = customHook;

	return (
		<EnhancedTable
			columns={columns}
			data={state?.data}
			onRowClick={(ev, row) => {
				if (row) {
          handleGetOne(row.values)
				}
			}}
			toolBar={
				<EmployeeGradeToolbar entities={state.entity} handleFilter={handleFilter}/>
			}
			checkbox={{
				showCheckbox: true,
				onClick: (value) => console.log(value),
				accessor: 'id',
			}}
			selectAll={(value) => console.log(value)}
			handleDelete={handleDelete}
			pagination={{
				gotoPage
			}}
		/>
	);
};

export default EmployeeGradeTable;