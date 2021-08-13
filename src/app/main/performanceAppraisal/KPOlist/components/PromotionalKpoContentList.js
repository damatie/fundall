import React from 'react';
import PromotionalKpoTable from 'app/shared/table/PromotionalKpoTable';
import Skeleton from '@material-ui/lab/Skeleton';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	profileImage: {
		// width: '50%',
		borderRadius: '50%',
		display: 'block',
		margin: 'auto' /* ,

		[theme.breakpoints.down('md')]: {
			width: '100%'
		} */
	}
}));

const PromotionalKpoContentList = ({ customHook, filterState }) => {
	const classes = useStyles();
	const history = useHistory();

	const columns = React.useMemo(() => [
		{
			Header: 'Image',
			accessor: 'displayPicture',
			// sortable: true,
			Cell: ({ row }) => {
				return (
					<>
						<img className={` ${classes.profileImage}`} src={row.original.image} alt="display profile" />
					</>
				);
			}
		},
		{
			Header: 'Employee Name',
			// accessor: 'kpoCategory',
			// className: 'font-bold',
			sortable: true,
			Cell: ({ row }) => {
				return <>{row.original.employeeName}</>;
			}
		},
		{
			Header: 'Employee Email',
			accessor: 'employeeEmail',
			sortable: true,
			Cell: ({ row }) => {
				return <>{`${row.original.employeeEmail}`}</>;
			}
		},
		{
			Header: 'Entity',
			accessor: 'entity',
			sortable: true,
			Cell: ({ row }) => {
				return <>{row.original.entity}</>;
			}
		},
		{
			Header: 'Department',
			accessor: 'department',
			sortable: true,
			Cell: ({ row }) => {
				return <>{row.original.department}</>;
			}
		},
		{
			Header: 'Job Title',
			accessor: 'jobTitle',
			sortable: true,
			Cell: ({ row }) => {
				return <>{row.original.jobTitle}</>;
			}
		},
		{
			Header: 'Contact Number',
			accessor: 'contactNumber',
			sortable: true,
			Cell: ({ row }) => {
				return <>{row.original.contactNumber}</>;
			}
		}
		// space for the edit icon on admin only
	]);
	// const { kpoData, push, id, handleDelete, loading } = customHook;

	const location = useLocation();
	// const [url, setUrl] = React.useState(`/performance_appraisal/kpoList/details/${id}/kpoContent`);
	const handleDelete = () => {
		console.log('deleted');
	};
	const [loading, setLoading] = React.useState(false);
	const [listToShow, setListToShow] = React.useState(JSON.parse(localStorage.getItem('tempPromotionalKpoList')));

	React.useEffect(() => {
		if (filterState.entityFilter !== '') {
			const result = JSON.parse(localStorage.getItem('tempPromotionalKpoList')).filter(
				list => list.entity === filterState.entityFilter
			);
			console.log(result);
			setListToShow(result);
		} else if (filterState.departmentFilter !== '') {
			const result = JSON.parse(localStorage.getItem('tempPromotionalKpoList')).filter(
				list => list.department === filterState.departmentFilter
			);
			console.log(result);
			setListToShow(result);
		} else if (filterState.jobTitleFilter !== '') {
			const result = JSON.parse(localStorage.getItem('tempPromotionalKpoList')).filter(
				list => list.jobTitle === filterState.jobTitleFilter
			);
			console.log(result);
			setListToShow(result);
		} else {
			setListToShow(JSON.parse(localStorage.getItem('tempPromotionalKpoList')));
		}
	}, [filterState]);

	React.useEffect(() => {
		console.log(listToShow, 'list to show');
	}, [listToShow]);

	return (
		<>
			{loading ? (
				<Skeleton animation="wave" width="100%" height="350px" variant="rect" />
			) : (
				<>
					<PromotionalKpoTable
						columns={columns}
						data={listToShow || []}
						onRowClick={(ev, row) => {
							history.push(`/performance_appraisal/promotionalKpodetail`);
							console.log(ev, 'event', row, 'row', 'clicked');
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

export default PromotionalKpoContentList;
