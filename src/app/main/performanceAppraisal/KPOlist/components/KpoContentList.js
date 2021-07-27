import React from 'react';
import EnhancedTable from 'app/shared/table/EnhancedTable';
import CustomIconButton from 'app/shared/button/CustomIconButton';
import useKpoContentList from '../hooks/useKpoContent';
import Skeleton from '@material-ui/lab/Skeleton';
import { useLocation } from 'react-router-dom';
import KpoContentStatus from './KpoContentStatus';

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
				return <>{row.original.Q1 || '-'}</>;
			}
		},
		{
			Header: 'Q2',
			accessor: 'q2',
			sortable: true,
			Cell: ({ row }) => {
				return <>{row.original.Q2 || '-'}</>;
			}
		},
		{
			Header: 'Q3',
			accessor: 'q3',
			sortable: true,
			Cell: ({ row }) => {
				return <>{row.original.Q3 || '-'}</>;
			}
		},
		{
			Header: 'Q4',
			accessor: 'q4',
			sortable: true,
			Cell: ({ row }) => {
				return <>{row.original.Q4 || '-'}</>;
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

	const kpoDetail = [
		// REMOVE the kpoDetail array here
		{
			kpoCategory: {
				name: 'Business Growth'
			},
			kpoDescription: 'Description',
			target: 'Target',
			kpoPipTarget: '80',
			Q1: '',
			Q2: '',
			Q3: '',
			Q4: '',
			kpoYearendScore: '',
			kpoYearendRemarks: '',
			kpoPipAchieved: ''
		},
		{
			kpoCategory: {
				name: 'Behavioral Attribute'
			},
			kpoDescription: 'Description',
			target: 'Target',
			kpoPipTarget: '80',
			Q1: '',
			Q2: '',
			Q3: '',
			Q4: '',
			kpoYearendScore: '',
			kpoYearendRemarks: '',
			kpoPipAchieved: ''
		},
		{
			kpoCategory: {
				name: 'Personal Development'
			},
			kpoDescription: 'Description',
			target: 'Target',
			kpoPipTarget: '80',
			Q1: '',
			Q2: '',
			Q3: '',
			Q4: '',
			kpoYearendScore: '',
			kpoYearendRemarks: '',
			kpoPipAchieved: ''
		}
	];

	return (
		<>
			{loading ? (
				<Skeleton animation="wave" width="100%" height="350px" variant="rect" />
			) : (
				<>
					<EnhancedTable
						columns={columns}
						data={kpoDetail || kpoData || []} // REMOVE THE kpoDetail HERE
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
