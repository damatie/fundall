import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import reducer from './store/reducers';
import withReducer from 'app/store/withReducer';
import kpoCategoryReducer from '../KPOcategoryList/store/reducers/categoryList.reducer';
import Button from '@material-ui/core/Button';
import SideModal from 'app/shared/modal/SideModal';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import { MenuItem } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import EmployeeInformation from './components/EmployeeInformation';
import GradeAndPromotion from './components/GradeAndPromotion';
import Compensation from './components/Compensation';
import Exit from './components/Exit';
import ConfidentialInformation from './components/ConfidentialInformation';
import Input from 'app/shared/TextInput/Input';
import SharedButton from 'app/shared/button/SharedButton';
import Education from '../../../../assets/icons/teacher.svg';
import Emergency from '../../../../assets/icons/emergency-bulb.svg';
import EmployeeInfo from '../../../../assets/icons/user.svg';
import Family from '../../../../assets/icons/people.svg';
import Organization from '../../../../assets/icons/briefcase.svg';
import Trainings from '../../../../assets/icons/note-2.svg';
import Travel from '../../../../assets/icons/airplane.svg';
import Work from '../../../../assets/icons/gps.svg';
import UserSquare from '../../../../assets/icons/user-square.svg';
import PromotionHistory from '../../../../assets/icons/promotion-history.svg';

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
		fontWeight: theme.typography.fontWeightBold,
		marginRight: theme.spacing(4),
		'&:hover': {
			color: '#40a9ff',
			opacity: 1
		},
		'&$selected': {
			color: '#000000',
			fontWeight: theme.typography.fontWeightBold
		},
		'&:focus': {
			color: '#000000'
		},
		'&:disabled': {
			color: '#c1c1c1'
		}
	},
	selected: {}
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
	promotionalContentDiv: {
		marginTop: '7.5%'
	},
	toolBarCustomDiv: {
		width: '80%',
		margin: 'auto'
	},
	row: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	newPromotionalKpoInput: {
		width: '45%'
	},
	newPromotionalKpoSelect: {
		width: '100%'
	},
	saveButton: {
		marginTop: '10%'
	}
}));

const PromotionalEmployeeKpoDetail = () => {
	const classes = useStyles();

	const [tabValue, setTabValue] = React.useState(0);
	const [toggleAddContentModal, setToggleAddContentModal] = React.useState(false);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}
	// React.useEffect(() => console.log(tabValue), [tabValue]);

	const userData = {
		image: `${process.env.PUBLIC_URL}/assets/images/avatars/Velazquez.jpg`,
		firstName: 'Tanjiro',
		lastName: 'Kamado',
		email: 'tanjiro@anime.com',
		jobTitle: 'Recruitment Officer',
		companyName: '5C Limited',
		department: 'Human Resources',
		employeeInformation: {
			dateOfEmployment: '12/9/2019',
			dateOfConfirmation: '12/8/2019',
			dateOfLastPromotion: '12/2/2020',
			natureOfEngagement: 'New Hire',
			grade: 'GL234'
		},
		promotionHistory: [
			{
				id: 1,
				jobTitle: 'Recruitment Manager',
				companyName: 'C-BIT Industries Limited',
				department: 'Human Resources',
				dateFrom: '12-07-2019',
				dateTo: '12/2/2020',
				tag: 'Recent'
			},
			{
				id: 2,
				jobTitle: 'Recruitment Manager',
				companyName: 'C-BIT Industries Limited',
				department: 'Human Resources',
				dateFrom: '12-07-2019',
				dateTo: '12/2/2020',
				tag: 'Recent'
			}
		],
		employeeInformationTab: [
			{
				id: 1,
				labelImg: EmployeeInfo,
				name: 'Employee Information',
				color: '#000000',
				content: {
					title: 'Mr',
					staffId: 'SRG219',
					firstName: 'Jon',
					gender: 'Male',
					middleName: 'John',
					surname: 'Doe',
					maritalStatus: 'Married',
					nickName: 'DJOE',
					officialNo: '0902172712',
					officeNo: '119828337',
					officeExtension: '3322',
					privateNo: '992991182',
					officeEmail: 'joe@contoso.com',
					alternativeEmail: 'joe@gmail.com',
					fbHandle: 'Djoe23',
					linkedInHandle: 'Jon Doe',
					instaHandle: 'Jon_Doe',
					twitterHandle: 'Jon_Doe'
				}
			},
			{
				id: 2,
				labelImg: Travel,
				name: 'Travel and Vacation Schedule',
				color: '#0063D7',
				content: {}
			},
			{
				id: 3,
				labelImg: Work,
				name: 'Work Location',
				color: '#B4B722',
				content: {}
			},
			{
				id: 4,
				labelImg: Organization,
				name: 'Organization',
				color: '#DD763D',
				content: {}
			},
			{
				id: 5,
				labelImg: Education,
				name: 'Education',
				color: '#00BD79',
				content: {}
			},
			{
				id: 6,
				labelImg: Trainings,
				name: 'Trainings',
				color: '#CD4991',
				content: {}
			},
			{
				id: 7,
				labelImg: Emergency,
				name: 'Emergency Contacts',
				color: '#49CDCD',
				content: {}
			},
			{
				id: 8,
				labelImg: Family,
				name: 'Family',
				color: '#2700C3',
				content: {}
			}
		],
		gradeAndPromotionTab: [
			{
				id: 1,
				labelImg: UserSquare,
				name: 'Employee Information',
				color: '#2700C3',
				content: {
					employeeGrade: 'GL234',
					natureOfEngagement: 'New Hire',
					confirmationDate: '12/8/2019',
					dateOfEmployment: '12/9/2019',
					dateOfLastPromotion: '12/2/2020'
				}
			},
			{
				id: 2,
				labelImg: PromotionHistory,
				name: 'Promotion History',
				color: '#2700C3',
				content: {}
			}
		]
	};

	const filterStateData = {
		jobTitles: ['Front End Developer', 'Back End Developer', 'UI/UX Designer']
	};

	return (
		<PageLayout
			noSearch={true}
			customToolBarSearchDivClass={true}
			header={{
				icon: '',
				title: 'EMPLOYEE LIST',
				handleSearch: ({ target: { value } }) => console.log(value)
			}}
			button={{
				showButton: true,
				btnComponent: (
					<Button
						variant="contained"
						color="secondary"
						onClick={() => setToggleAddContentModal(true)}
						startIcon={<AddIcon />}
					>
						Add Promotion
					</Button>
				)
			}}
			contentToolbar={
				<CustomTabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="black"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'h-64' }}
					className={` ${classes.toolBarCustomDiv}`}
				>
					<CustomTab className="h-64 normal-case" label="Employee Information" />
					<CustomTab className="h-64 normal-case" label="Grade And Promotion" />
					<CustomTab className="h-64 normal-case" label="Compensation" />
					<CustomTab className="h-64 normal-case" label="Exit" />
					<CustomTab className="h-64 normal-case" label="Confidential Information" disabled />
				</CustomTabs>
			}
			content={
				<div className={`sm:p-24 ${classes.promotionalContentDiv}`}>
					{tabValue === 0 ? (
						<EmployeeInformation userData={userData} />
					) : tabValue === 1 ? (
						<GradeAndPromotion userData={userData} />
					) : tabValue === 2 ? (
						<Compensation />
					) : tabValue === 3 ? (
						<Exit />
					) : (
						tabValue === 4 && <ConfidentialInformation />
					)}

					<SideModal
						open={toggleAddContentModal}
						handleClose={() => setToggleAddContentModal(false)}
						title="Add Promotion"
					>
						<div>
							<div className={` ${classes.row}`}>
								<Input
									className={`my-16 ${classes.newPromotionalKpoInput}`}
									name="jobTitle"
									id="jobTitle"
									label="Job Title"
									value={''}
									type="text"
									noFullWidth={true}
								/>
								<Input
									className={`my-16 ${classes.newPromotionalKpoInput}`}
									name="role"
									id="role"
									label="Role"
									value={''}
									type="text"
									noFullWidth={true}
								/>
							</div>
							<div className={` ${classes.row}`}>
								<SelectTextField
									name="entityFilter"
									label="Entity"
									value={''}
									className={` ${classes.newPromotionalKpoSelect}`}
									noFullWidth={true}
								>
									{filterStateData.jobTitles?.length > 0 &&
										['', ...filterStateData.jobTitles].map((entity, index) => (
											<MenuItem value={entity} key={index}>
												{entity === '' ? 'Default Selection' : entity}
											</MenuItem>
										))}
								</SelectTextField>
								<SelectTextField
									name="department"
									label="Department"
									value={''}
									className={` ${classes.newPromotionalKpoSelect}`}
									noFullWidth={true}
								>
									{filterStateData.jobTitles?.length > 0 &&
										['', ...filterStateData.jobTitles].map((entity, index) => (
											<MenuItem value={entity} key={index}>
												{entity === '' ? 'Default Selection' : entity}
											</MenuItem>
										))}
								</SelectTextField>
							</div>
							<div className={` ${classes.row}`}>
								<SelectTextField
									name="gradeLevel"
									label="Grade Level"
									value={''}
									className={` ${classes.newPromotionalKpoSelect}`}
									noFullWidth={true}
									mySixTeen={true}
								>
									{filterStateData.jobTitles?.length > 0 &&
										['', ...filterStateData.jobTitles].map((entity, index) => (
											<MenuItem value={entity} key={index}>
												{entity === '' ? 'Default Selection' : entity}
											</MenuItem>
										))}
								</SelectTextField>
								<Input
									className={`my-16 ${classes.newPromotionalKpoInput}`}
									name="effectiveFrom"
									id="effectiveFrom"
									// label="Effective From"
									value={''}
									type="date"
									noFullWidth={true}
								/>
							</div>
							<div className={` ${classes.row}`}>
								<SelectTextField
									name="lineManager"
									label="Line Manager"
									value={''}
									className={` ${classes.newPromotionalKpoSelect}`}
									noFullWidth={true}
									mySixTeen={true}
								>
									{filterStateData.jobTitles?.length > 0 &&
										['', ...filterStateData.jobTitles].map((entity, index) => (
											<MenuItem value={entity} key={index}>
												{entity === '' ? 'Default Selection' : entity}
											</MenuItem>
										))}
								</SelectTextField>
								<Input
									className={`my-16 ${classes.newPromotionalKpoInput}`}
									name="functionalManager"
									id="functionalManager"
									label="Functional Manager"
									value={''}
									type="text"
									noFullWidth={true}
								/>
							</div>
							<SharedButton
								variant="contained"
								color="primary"
								type="button"
								className={`flex mx-auto ${classes.saveButton}`}
							>
								SAVE
							</SharedButton>
						</div>
					</SideModal>
				</div>
			}
		/>
	);
};

withReducer('kpoCategory', kpoCategoryReducer)(PromotionalEmployeeKpoDetail);
export default withReducer('kpo', reducer)(PromotionalEmployeeKpoDetail);
