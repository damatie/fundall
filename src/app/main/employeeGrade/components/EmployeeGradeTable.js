import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import useEmployeeGrade from '../hooks/useEmployeeGrade';
import { useSelector } from 'react-redux';

const EmployeeGradeTable = () => {
  const columns = React.useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'name',
				// className: 'font-bold',
				sortable: true,
			},
			{
				Header: 'Description',
				accessor: 'description',
				sortable: true,
      },
      {
				Header: 'PIP Eligibility',
				accessor: 'pip',
				sortable: true,
				Cell: ({ row: { original }}) => {
					return <>{(original.pip) ? 'Yes' : 'No'}</>
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

	const state = useSelector(state => state.employeeGrade);

	const { handleGetOne, handleDelete } = useEmployeeGrade(state);

	return (
		<EnhancedTable
			columns={columns}
			data={state?.data}
			onRowClick={(ev, row) => {
				if (row) {
          handleGetOne(row.values)
				}
			}}
			checkbox={{
				showCheckbox: true,
				onClick: (value) => console.log(value),
				accessor: 'id',
			}}
			selectAll={(value) => console.log(value)}
			handleDelete={handleDelete}
		/>
	);
};

export default EmployeeGradeTable;