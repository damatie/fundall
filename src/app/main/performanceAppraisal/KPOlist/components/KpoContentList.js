import React from 'react';
import EnhancedTable from 'app/shared/table/EnhancedTable';
import CustomIconButton from 'app/shared/button/CustomIconButton';
import useKpoContentList from '../hooks/useKpoContent';
import Skeleton from '@material-ui/lab/Skeleton';
import { useLocation } from 'react-router-dom';
import KpoContentStatus from './KpoContentStatus';
import EditIcon from '@material-ui/icons/Edit';

const KpoContentList = ({ customHook }) => {
	const columns = React.useMemo(() => [
		{
			Header: 'KPO Category',
			// accessor: 'kpoCategory',
			// className: 'font-bold',
			sortable: true,
			Cell: ({ row }) => {
				return <>{row.original.kpoCategory?.name}</>;
			}
		},
		{
			Header: 'Description',
			accessor: 'kpoDescription',
			sortable: true
		},
		{
			Header: 'Target',
			accessor: 'target',
			sortable: true,
			Cell: ({ row }) => {
				return <>{`${row.original.target}`}</>;
			}
		},
		{
			Header: 'PIP Target',
			accessor: 'pipA',
			sortable: true,
			Cell: ({ row }) => {
				return <>{row.original.kpoPipTarget ? `${row.original.kpoPipTarget}%` : '-'}</>;
			}
		},
		{
			Header: 'Q1',
			accessor: 'q1',
			sortable: true,
			Cell: ({ row }) => {
				return <>{row.original.Q1?.content || '-'}</>;
			}
		},
		{
			Header: 'Q2',
			accessor: 'q2',
			sortable: true,
			Cell: ({ row }) => {
				return <>{row.original.Q2?.content || '-'}</>;
			}
		},
		{
			Header: 'Q3',
			accessor: 'q3',
			sortable: true,
			Cell: ({ row }) => {
				return <>{row.original.Q3?.content || '-'}</>;
			}
		},
		{
			Header: 'Q4',
			accessor: 'q4',
			sortable: true,
			Cell: ({ row }) => {
				return <>{row.original.Q4?.content || '-'}</>;
			}
		},
		{
			Header: 'Year-End Score',
			accessor: 'yearEnd',
			sortable: true,
			Cell: ({ row }) => {
				return <>{row.original.kpoYearendScore || '-'}</>;
			}
		},
		{
			Header: 'Year-End Remark',
			accessor: 'remarks',
			sortable: true,
			Cell: ({ row }) => {
				return <>{row.original.kpoYearendRemarks || '-'}</>;
			}
		},
		{
			Header: '%PIP',
			accessor: 'kpoPipAchieved',
			sortable: true,
			Cell: ({ row }) => {
				return <>{row.original.kpoPipAchieved || '-'}</>;
			}
		},
		{
			Header: '',
			accessor: 'edit',
			// sortable: true,
			Cell: ({ row }) => {
				return <EditIcon />;
			}
		}
		// space for the edit icon on admin only
	]);
	const { kpoData, push, id, handleDelete, loading } = customHook;

	const location = useLocation();
	const [url, setUrl] = React.useState(`/performance_appraisal/kpoList/details/${id}/kpoContent`);

	React.useEffect(() => {
		location.pathname === `/performance_appraisal/kpo/review/details/${id}` &&
			setUrl(`/performance_appraisal/kpo/review/details/${id}/kpoContent`);
	}, []);

	return (
		<>
			{loading ? (
				<Skeleton animation="wave" width="100%" height="350px" variant="rect" />
			) : (
				<>
					<EnhancedTable
						columns={columns}
						data={JSON.parse(localStorage.getItem('tempKpoDetailArr')) || kpoData || []} // REMOVE THE "tempKpoDetailArr" here
						onRowClick={(ev, row) => {
							if (row) {
								push(`${url}/${row.original.id}`);
							}
						}}
						checkbox={{
							showCheckbox: true,
							onClick: value => console.log(value),
							accessor: 'id'
						}}
						selectAll={value => console.log(value)}
						handleDelete={handleDelete}
					/>
				</>
			)}
		</>
	);
};

export default KpoContentList;
