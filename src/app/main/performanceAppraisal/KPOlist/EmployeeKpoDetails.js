import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import SideModal from 'app/shared/modal/SideModal';
import KpoContentCard from './components/KpoContentCard';

const CustomTabs = withStyles({
	root: {
		borderBottom: '2px solid #00ccf2',
		width: '50%'
	},
	indicator: {
		backgroundColor: '#00ccf2'
	}
})(Tabs);

const CustomTab = withStyles(theme => ({
	root: {
		textTransform: 'none',
		minWidth: 72,
		fontWeight: theme.typography.fontWeightRegular,
		marginRight: theme.spacing(4),
		'&:hover': {
			color: '#40a9ff',
			opacity: 1
		},
		'&$selected': {
			color: '#050505',
			fontWeight: theme.typography.fontWeightBold
		},
		'&:focus': {
			color: '#40a9ff'
		}
	},
	selected: {}
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
	kpoDetailsTab: {
		marginLeft: '8%'
	},
	submitKpoForReviewBtn: {
		backgroundColor: '#19ac4b',
		color: '#daf2e2',
		fontSize: '1.2rem',
		padding: '15px 90px !important',
		margin: '8% auto !important',

		'&:hover': {
			backgroundColor: '#07571E'
		}
	},
	submitKpoForReviewBtnOuterDiv: {
		display: 'flex'
	},
	approveKpoBtn: {
		backgroundColor: '#d8d8d8',
		color: '#252525',
		pointerEvents: 'none',
		padding: '15px 90px !important',
		margin: '8% auto !important'
	},
	marginTopCBtn: {
		marginTop: '10%',
		marginBottom: '5%'
	},
	kpoDetailTopBtnDiv: {
		width: '110%',
		marginLeft: '-10%',
		display: 'flex',
		justifyContent: 'space-between',

		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',

			'& button:first-child': {
				marginBottom: '10%'
			}
		},

		[theme.breakpoints.down('xs')]: {
			'& button': {
				fontSize: 10
			},

			'& button:first-child': {
				marginBottom: '3% !important'
			}
		}
	}
}));

const EmployeeKpoDetails = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const params = useParams();
	const { push } = useHistory();
	const location = useLocation();
	const [prevUrl, setPrevUrl] = React.useState('/performance_appraisal/kpoList');
	const [toggleSideModal, setToggleSideModal] = React.useState(false);
	const [editKpoContent, setEditKpoContent] = React.useState(false);

	React.useEffect(() => {
		location.pathname === `/performance_appraisal/kpo/review/details/${params.id}` &&
			setPrevUrl('/performance_appraisal/kpo/review/');

		return () => {
			setApproveBtnActive(false);
		};
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
	const [approveBtnActive, setApproveBtnActive] = React.useState(false);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	// React.useEffect(() => console.log(tabValue), [tabValue]);

	return (
		<PageLayout
			noSearch={EmployeeKpoCustomHook.showReviewKpoAndAppraisalBtn() ? false : tabValue === 0 ? false : true}
			customToolBarSearchDivClass={true}
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
						{EmployeeKpoCustomHook.showReviewKpoAndAppraisalBtn() && (
							<div className={classes.kpoDetailTopBtnDiv}>
								<Button
									variant="contained"
									color="secondary"
									onClick={() => {
										setToggleSideModal(true);
										setApproveBtnActive(true);
									}}
								>
									REVIEW KPO{' '}
								</Button>
								<Button variant="contained" color="secondary" /* onClick={customHook.handleOpenModal} */ disabled>
									START APPRAISAL
								</Button>
							</div>
						)}
					</>
				)
			}}
			contentToolbar={
				<CustomTabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'h-64' }}
					className={` ${classes.kpoDetailsTab}`}
				>
					<CustomTab className="h-64 normal-case" label="KPO Detail" />
					<CustomTab className="h-64 normal-case" label="Performance Appraisal" disabled />
					<CustomTab className="h-64 normal-case" label="%PIP" disabled />
				</CustomTabs>
			}
			content={
				<div className=" sm:p-24 ">
					{tabValue === 0 && (
						<>
							<KpoDetailEmployeeInfo customHook={EmployeeKpoCustomHook} />
							<KpoContentList customHook={customHook} />
							<CreateKpoContent customHook={customHook} />
							{EmployeeKpoCustomHook.showApproveButton().lineManager && (
								<CustomIconButton
									type={EmployeeKpoCustomHook.showApproveButton().allowedToApprove ? '' : ''}
									className={` flex flex-col mx-auto ${
										!approveBtnActive
											? classes.approveKpoBtn
											: EmployeeKpoCustomHook.showApproveButton().allowedToApprove
											? classes.submitKpoForReviewBtn
											: classes.approveKpoBtn
									} ${classes.marginTopCBtn}`}
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
					<SideModal open={toggleSideModal} handleClose={() => setToggleSideModal(false)} title="KPO Review">
						<>{state.data?.length > 0 ? (
							state.data.map((kpoContent, index) => (
								<KpoContentCard
									index={index}
									theKpoCategory={kpoContent?.kpoCategory?.name}
									description={kpoContent?.kpoCategory?.description}
									target={kpoContent?.target}
									pipTarget={kpoContent?.kpoPipTarget}
									entireData={kpoContent}
									// edit={editKpoContent}
									// setEdit={setEditKpoContent}
								/>
							))
						) : (
							<span>No Data</span>
						)}
						{<span>
							<Button

								className='flex my-20 mx-auto'
								justify='center'
								align='center'
								variant="contained"
								color="secondary"
								onClick={() => setToggleSideModal(false)}
							>
								Close
							</Button>
						</span>}</>
					</SideModal>
				</div>
			}
		/>
	);
};

withReducer('kpoCategory', kpoCategoryReducer)(EmployeeKpoDetails);
export default withReducer('kpo', reducer)(EmployeeKpoDetails);
