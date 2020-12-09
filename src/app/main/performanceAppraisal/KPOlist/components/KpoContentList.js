import React from 'react';
import EnhancedTable from 'app/shared/table/EnhancedTable';
import CustomIconButton from 'app/shared/button/CustomIconButton';
import useKpoContentList from '../hooks/useKpoContent';

const KpoContentList = () => {
  const columns = React.useMemo(
		() => [
			{
				Header: 'KPO Category',
				accessor: 'kpoCategory',
				// className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Description',
				accessor: 'description',
				sortable: true
			},
			{
				Header: 'Target',
				accessor: 'target',
				sortable: true
			},
			{
				Header: 'Q1',
				accessor: 'q1',
				sortable: true
      },
      {
				Header: 'Q2',
				accessor: 'q2',
				sortable: true
      },
      {
				Header: 'Q3',
				accessor: 'q3',
				sortable: true
      },
      {
				Header: 'Q4',
				accessor: 'q4',
				sortable: true
      },
      {
				Header: 'Year end',
				accessor: 'yearEnd',
				sortable: true
      },
      {
				Header: '%PIP',
				accessor: 'pip',
				sortable: true
			},
		],
	);
	const { kpoData, push, id, handleDelete } = useKpoContentList();
	return (
		<>
    <EnhancedTable
			columns={columns}
			data={kpoData}
			onRowClick={(ev, row) => {
				if (row) {
					push(`/performance_appraisal/kpoList/details/${id}/kpoContent/${row.original.id}`)
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
			<CustomIconButton type='success' className='flex flex-col my-10 mx-auto'>
				Approve
			</CustomIconButton>
		</>
  );
};

export default KpoContentList;