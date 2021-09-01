import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from 'app/store/withReducer';
import React from 'react';
import CreateEmployeeKpo from './components/CreateEmployeeKpo';
import EmployeeKpoListTable from './components/EmployeeKpoListTable';
import useKpoList from './hooks/useKpoList';
import reducer from './store/reducers';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Swal from 'sweetalert2';
import { entityListReducer } from './../../../store/reducers/entities.reducers';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	promotionalKpoBtn: {
		[theme.breakpoints.down('sm')]: {
			fontSize: 10
		}
	}
}));

const EmployeeKpoList = () => {
	const classes = useStyles();

	const [tabValue, setTabValue] = React.useState(0);
	const dispatch = useDispatch();
	const { push } = useHistory();
	const state = useSelector(state => state.kpo.employeeKpoList);
	const entityList = useSelector(state => state.kpo.kpoReview.entityList);
	const userId = useSelector(state => state.profile?.data?.id);
	const employees = useSelector(state => state.employeeList.data);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	React.useEffect(() => console.log('ent-List: ', entityList), [entityList]);

	const customHook = useKpoList({
		userId,
		dispatch,
		push,
		state,
		employees
	});
	const createdKpoBefore = true;

	const confirmCreatePromotionalKpo = () => {
		Swal.fire({
			icon: 'info',
			title: 'You can only create one \n KPO per year.',
			html:
				'<p class="kpo-custom-swal-text">Note that you can create a promotion kpo, to do so please click continue.</p>',
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: `CONTINUE`,
			confirmButtonColor: '#19AC4B',
			cancelButtonColor: '#FA1C1C',
			customClass: {
				cancelButton: 'kpo-custom-swal-btn',
				confirmButton: 'kpo-custom-swal-btn',
				title: 'kpo-custom-swal-title',
				popup: 'kpo-custom-swal-popup',
				icon: 'kpo-custom-swal-icon'
			}
		}).then(result => {
			if (result.isConfirmed) {
				customHook.handleOpenModal();
			}
		});
	};

	return (
		<PageLayout
			header={{
				icon: '',
				title: 'KPO List',
				handleSearch: ({ target: { value } }) => console.log(value)
			}}
			button={{
				showButton: true,
				// btnTitle: 'Create KPO',
				// onClick: customHook.handleOpenModal,
				// btnComponent: false
				btnComponent: createdKpoBefore ? (
					<Button
						variant="contained"
						color="secondary"
						onClick={confirmCreatePromotionalKpo}
						className={` ${classes.promotionalKpoBtn}`}
						startIcon={<AddIcon />}
					>
						Create Promotional KPO
					</Button>
				) : (
					<Button onClick={customHook.handleOpenModal}>Create KPO</Button>
				)
			}}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64 normal-case" label="Ongoing KPO" />
					<Tab className="h-64 normal-case" label="Completed KPO" />
				</Tabs>
			}
			content={
				<div className="p-24">
					{customHook.loading ? (
						<Skeleton variant="rect" width="100%" height={400} animation="wave" />
					) : (
						<>
							{tabValue === 0 && (
								<>
									<EmployeeKpoListTable customHook={customHook} />
									<CreateEmployeeKpo customHook={customHook} />
								</>
							)}
							{tabValue === 1 && <EmployeeKpoListTable customHook={customHook} completed />}
						</>
					)}
				</div>
			}
		/>
	);
};

export default withReducer('kpo', reducer)(EmployeeKpoList);
