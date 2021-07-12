import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import EditEmployeeKpo from './components/EditEmployeeKpo';
import KpoContentList from './components/KpoContentList';
import CreateKpoContent from './components/CreateKpoContent';
import reducer from './store/reducers';
import withReducer from 'app/store/withReducer';
import useKpoContentList from './hooks/useKpoContent';
import KpoComments from './components/KpoComments';
import kpoCategoryReducer from '../KPOcategoryList/store/reducers/categoryList.reducer';
import KpoContentPipScore from './components/KpoContentPipScore';
import PersonalDevelopment from './components/PersonalDevelopment';
import BehaviouralAttribute from './components/BehaviouralAttribute';
import useKpoList from './hooks/useKpoList';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import useKpoSummary from './hooks/useKpoSummary';
import useKpoPip from './hooks/useKpoPip';
import CustomIconButton from 'app/shared/button/CustomIconButton';
import Button from '@material-ui/core/Button';
import userRole from 'utils/userRole';
import PipInformation from './components/PipInformation';
import KpoDetailEmployeeInfo from './components/KpoDetailEmployeeInfo';

const useStyles = makeStyles(theme => ({
	kpoDetailsTab: {
		marginLeft: '8%'
	},
	submitKpoForReviewBtn: {
		backgroundColor: '#19ac4b',
		color: '#daf2e2',
		fontSize: '1.2rem',
		padding: '15px 90px',
		margin: '8% auto',

		'&:hover': {
			backgroundColor: '#07571E'
		}
	},
	submitKpoForReviewBtnOuterDiv: {
		display: 'flex'
	}
}));

const EmployeeKpoDetails = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const params = useParams();
	const { push } = useHistory();
	const location = useLocation();
	const [prevUrl, setPrevUrl] = React.useState('/performance_appraisal/kpoList');

	React.useEffect(() => {
		location.pathname === `/performance_appraisal/kpo/review/details/${params.id}` &&
			setPrevUrl('/performance_appraisal/kpo/review/');
	}, []);

	const EmployeeKpo = useSelector(state => state.kpo.employeeKpoList);
	const { data: kpoCategory } = useSelector(state => state.kpoCategory);
	const state = useSelector(state => state.kpo.kpoContentList);
	const userInfo = useSelector(state => state.auth?.user);
	const employees = useSelector(state => state.employeeList.data);

	// const entireState = useSelector(state => state /* .kpo.kpoContentList */);

	// console.log(state, 'the state');
	// console.log(entireState, 'the entireState');
	// console.log(userInfo, 'the user info');
	// console.log(EmployeeKpo, 'the EmployeeKpo');

	// React.useEffect(() => console.log(EmployeeKpo, 'EmployeeKpo'), [EmployeeKpo]);

	const EmployeeKpoCustomHook = useKpoList({
		dispatch,
		id: params?.id,
		state: EmployeeKpo,
		push,
		employees,
		userInfo
	});
	// console.log(EmployeeKpoCustomHook, 'the EmployeeKpoCustomHook');
	const customHook = useKpoContentList({
		config: {},
		state,
		dispatch,
		params,
		push,
		kpoCategory,
		userInfo
	});

	const kpoSummary = useKpoSummary({
		dispatch,
		state: EmployeeKpo.kpo,
		userInfo
	});

	const calculatePip = useKpoPip({
		dispatch,
		state: EmployeeKpo.kpo,
		role: userInfo.role
	});

	const [tabValue, setTabValue] = React.useState(0);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	// React.useEffect(() => console.log(tabValue), [tabValue]);

	return (
		<PageLayout
			noSearch={tabValue === 1 ? false : true}
			prev={{
				url: prevUrl
			}}
			header={{
				icon: '',
				title: 'KPO Details',
				handleSearch: ({ target: { value } }) => console.log(value)
			}}
			button={{
				showButton: true,
				btnComponent: tabValue === 0 && (
					<>
						{EmployeeKpoCustomHook.shouldShowAddButton() && (
							<Button
								variant="contained"
								color="secondary"
								onClick={customHook.handleOpenModal}
								startIcon={<AddIcon />}
							>
								Add KPO Content
							</Button>
						)}
					</>
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
					className={` ${classes.kpoDetailsTab}`}
				>
					<Tab className="h-64 normal-case" label="KPO Detail" />
					<Tab className="h-64 normal-case" label="Performance Appraisal" disabled />
					<Tab className="h-64 normal-case" label="%PIP" disabled />
				</Tabs>
			}
			content={
				<div className=" sm:p-24 ">
					{tabValue === 0 && (
						<>
							<KpoDetailEmployeeInfo customHook={EmployeeKpoCustomHook} />
							<KpoContentList customHook={customHook} />
							<CreateKpoContent customHook={customHook} />
							{EmployeeKpoCustomHook.showApproveButton() && (
								<CustomIconButton
									type="success"
									className="flex flex-col my-10 mx-auto"
									onClick={EmployeeKpoCustomHook.approveKpo}
								>
									Approve
								</CustomIconButton>
							)}
							{customHook.kpoData.length > 0 && (
								<div className={` ${classes.submitKpoForReviewBtnOuterDiv}`}>
									{EmployeeKpoCustomHook.showActionButton(userInfo) && (
										<Button
											variant="contained"
											className={` ${classes.submitKpoForReviewBtn}`}
											onClick={EmployeeKpoCustomHook.submitKpo}
										>
											{EmployeeKpoCustomHook.submitButtonText()}
										</Button>
									)}
								</div>
							)}
						</>
					)}
					{tabValue === 1 && <KpoComments kpoSummary={kpoSummary} />}
					{tabValue === 2 && (
						<>
							{EmployeeKpo.kpo.pipInformation ? (
								<PipInformation pip={EmployeeKpo.kpo.pipInformation} />
							) : (
								<KpoContentPipScore calculatePip={calculatePip} kpoDetails={EmployeeKpo.kpo} />
							)}
						</>
					)}
				</div>
			}
		/>
	);
};

withReducer('kpoCategory', kpoCategoryReducer)(EmployeeKpoDetails);
export default withReducer('kpo', reducer)(EmployeeKpoDetails);
