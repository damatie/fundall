import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
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
import Swal from 'sweetalert2';
import PerformanceAppraisalConfig from '../PerformanceAppraisalConfig';
import PerformanceAppraisal from './components/PerformanceAppraisal';
import EditIcon from '../../../../assets/icons/editIcon.svg';
import ModificationRequestIcon from '../../../../assets/icons/modificationRequestIcon.svg';
import ModificationRequestTimeline from './components/ModificationRequestTimeline';

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
	},
	modificationRequestDiv: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: '#ffffff',
		boxShadow: '0px 4px 4px 0px #00000040',
		marginTop: '15%',
		height: 100,
		justifyContent: 'space-evenly',
		width: '155%',
		marginLeft: '-40%',
		alignItems: 'center',
		borderRadius: 5,
		position: 'relative',

		'&:after': {
			content: "''",
			position: 'absolute',
			backgroundColor: '#ffffff',
			width: 20,
			height: 20,
			transform: 'rotate(45deg)',
			top: '-9%',
			right: '7%'
		}
	},
	modificationRequestDivHr: {
		width: '90%'
	},
	modificationRequestIcon: {
		width: '2.1%',
		cursor: 'pointer'
	},
	modificationRequestItem: {
		cursor: 'pointer'
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
	const [toggleUpdateKpoModal, setToggleUpdateKpoModal] = React.useState(false);
	const [toggleModificationTimeLineModal, setToggleModificationTimeLineModal] = React.useState(false);
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

	const [anchorElModificationRequest, setAnchorElModificationRequest] = React.useState(null);
	const [openModificationRequest, setOpenModificationRequest] = React.useState(false);
	const [placementModificationRequest, setPlacementModificationRequest] = React.useState();

	const handleClick = newPlacement => event => {
		setAnchorElModificationRequest(event.currentTarget);
		setOpenModificationRequest(prev => placementModificationRequest !== newPlacement || !prev);
		setPlacementModificationRequest(newPlacement);
	};

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
	const confirmUpdate = () => {
		Swal.fire({
			icon: 'info',
			title: 'Do you want to start \n KPO Review ?',
			html:
				'<p class="kpo-custom-swal-text">Note that by clicking on continue, you will activeate your KPO \n quarterly review.</p>',
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: `CONTINUE`,
			confirmButtonColor: '#19AC4B',
			cancelButtonColor: '#FA1C1C',
			// confirmButtonSize: '14px'
			// allowOutsideClick: false,
			// showClass: {
			//   popup: 'animate__animated animate__fadeInDown'
			// },
			// hideClass: {
			//   popup: 'animate__animated animate__fadeOutUp'
			// },
			customClass: {
				cancelButton: 'kpo-custom-swal-btn',
				confirmButton: 'kpo-custom-swal-btn',
				title: 'kpo-custom-swal-title',
				popup: 'kpo-custom-swal-popup',
				icon: 'kpo-custom-swal-icon'
			}
		}).then(result => {
			if (result.isConfirmed) {
				setToggleUpdateKpoModal(true);
			}
		});
	};

	const kpoDetail = [
		// REMOVE the kpoDetail array here
		{
			kpoCategory: {
				name: 'Business Growth',
				description:
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
			},
			kpoDescription: 'Description',
			target: 'Target',
			kpoPipTarget: '80',
			Q1: {
				content: 'This is the Q1',
				comment:
					'Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting',
				label: 'Q1'
			},
			Q2: {
				content: 'This is the Q2',
				comment: 'took a galley of type and scrambled it to make a type specimen book',
				label: 'Q2'
			},
			Q3: {
				content: '',
				comment: '',
				label: 'Q3'
			},
			Q4: {
				content: '',
				comment: '',
				label: 'Q4'
			},
			kpoYearendScore: '',
			kpoYearendRemarks: '',
			kpoPipAchieved: ''
		},
		{
			kpoCategory: {
				name: 'Behavioral Attribute',
				description:
					"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
			},
			kpoDescription: 'Description',
			target: 'Target',
			kpoPipTarget: '80',
			Q1: {
				content: 'Second q1',
				comment:
					'Took a galley of type and scrambled it to make a,took a galley of type and scrambled it to make a type specimen book,took a galley of type and scrambled it to make a type specimen book, took a galley of type and scrambled it to make a type specimen book, took a galley of type and scrambled it to make a type specimen book, took a galley of type and scrambled it to make a type specimen book, took a galley of type and scrambled it to make a type specimen book, took a galley of type and scrambled it to make a type specimen book,took a galley of type and scrambled it to make a type specimen book type specimen book took a galley of type and scrambled it to make a type specimen book',
				label: 'Q1'
			},
			Q2: {
				content: '',
				comment: '',
				label: 'Q2'
			},
			Q3: {
				content: '',
				comment: '',
				label: 'Q3'
			},
			Q4: {
				content: '',
				comment: '',
				label: 'Q4'
			},
			kpoYearendScore: '',
			kpoYearendRemarks: '',
			kpoPipAchieved: ''
		},
		{
			kpoCategory: {
				name: 'Personal Development',
				description:
					"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32."
			},
			kpoDescription: 'Description',
			target: 'Target',
			kpoPipTarget: '80',
			Q1: {
				content: '',
				comment: '',
				label: 'Q1'
			},
			Q2: {
				content: '',
				comment: '',
				label: 'Q2'
			},
			Q3: {
				content: '',
				comment: '',
				label: 'Q3'
			},
			Q4: {
				content: '',
				comment: '',
				label: 'Q4'
			},
			kpoYearendScore: '',
			kpoYearendRemarks: '',
			kpoPipAchieved: ''
		}
	];

	localStorage.setItem('tempKpoDetailArr', JSON.stringify(kpoDetail));

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
				btnComponent:
					tabValue === 0 ? (
						<>
							{!EmployeeKpoCustomHook.showReviewKpoAndAppraisalBtn() && (
								<Button variant="contained" color="secondary" onClick={confirmUpdate}>
									UPDATE KPO
								</Button>
							)}
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
									<Button variant="contained" color="secondary" onClick={customHook.handleOpenModal} disabled>
										START APPRAISAL
									</Button>
									{/* <Button onClick={handleClick('bottom-end')}>Show</Button> */}
									<img
										onClick={handleClick('bottom-end')}
										src={ModificationRequestIcon}
										alt="ModificationRequestIcon"
										className={` ${classes.modificationRequestIcon}`}
									/>
									{/* <Popper
										placement="bottom-start"
										disablePortal={false}
										modifiers={{
										flip: {
											enabled: true,
										},
										preventOverflow: {
											enabled: true,
											boundariesElement: 'scrollParent',
										},
										arrow: {
											enabled: false,
											element: arrowRef,
										},
										}}
									></Popper> */}
									<Popper
										open={openModificationRequest}
										anchorEl={anchorElModificationRequest}
										placement={placementModificationRequest}
										transition
									>
										<div className={` ${classes.modificationRequestDiv}`}>
											<span className={` ${classes.modificationRequestItem}`}>MODIFICATION REQUESTS</span>
											<hr className={` ${classes.modificationRequestDivHr}`} />
											<span
												className={` ${classes.modificationRequestItem}`}
												onClick={() => {
													setToggleModificationTimeLineModal(true);
													setOpenModificationRequest(false);
												}}
											>
												MODIFICATION TIMELINE
											</span>
										</div>
									</Popper>
								</div>
							)}
						</>
					) : (
						tabValue === 1 && (
							// EmployeeKpoCustomHook.shouldShowAddButton() && (
							<Button
								variant="contained"
								color="secondary"
								onClick={customHook.handleOpenModal}
								startIcon={<img src={EditIcon} alt="edit icon" />}
							>
								Edit
							</Button>
						)
						// )
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
					<CustomTab className="h-64 normal-case" label="Performance Appraisal" />
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
					{/* {tabValue === 1 && <KpoComments kpoSummary={kpoSummary} />} */}
					{tabValue === 1 && <PerformanceAppraisal />}
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
						<>
							{
								/* state.data? */ kpoDetail.length > 0 ? (
									/* customHook.kpoData */ kpoDetail.map((detail, index) => (
										<KpoContentCard
											index={index}
											theKpoCategory={detail?.kpoCategory?.name}
											description={detail?.kpoCategory?.description}
											target={detail?.target}
											pipTarget={detail?.kpoPipTarget}
											entireData={detail}
											// edit={editKpoContent}
											// setEdit={setEditKpoContent}
										/>
									))
								) : (
									<span>No Data</span>
								)
							}
							{
								<span>
									<Button
										className="flex my-20 mx-auto"
										justify="center"
										align="center"
										variant="contained"
										color="secondary"
										onClick={() => setToggleSideModal(false)}
									>
										Close
									</Button>
								</span>
							}
						</>
					</SideModal>

					<SideModal
						open={toggleUpdateKpoModal}
						handleClose={() => setToggleUpdateKpoModal(false)}
						title="KPO Quarterly Review"
					>
						<>
							{kpoDetail.map((detail, index) => (
								<KpoContentCard
									index={index}
									theKpoCategory={detail?.kpoCategory?.name}
									description={detail?.kpoCategory?.description}
									target={detail?.target}
									pipTarget={detail?.kpoPipTarget}
									entireData={detail}
									update={true}
								/>
							))}
						</>
					</SideModal>
					<SideModal
						open={toggleModificationTimeLineModal}
						handleClose={() => setToggleModificationTimeLineModal(false)}
						title="Modification Timeline"
					>
						<ModificationRequestTimeline />
					</SideModal>
				</div>
			}
		/>
	);
};

withReducer('kpoCategory', kpoCategoryReducer)(EmployeeKpoDetails);
export default withReducer('kpo', reducer)(EmployeeKpoDetails);
