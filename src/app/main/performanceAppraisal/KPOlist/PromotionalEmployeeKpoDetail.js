import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import PromotionalKpoContentList from './components/PromotionalKpoContentList';
import CreateKpoContent from './components/CreateKpoContent';
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
	}
}));

const PromotionalEmployeeKpoDetail = () => {
	const classes = useStyles();

	const [tabValue, setTabValue] = React.useState(0);

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
		]
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
						/* onClick={customHook.handleOpenModal} */ startIcon={<AddIcon />}
					>
						Add Employee
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
						<EmployeeInformation />
					) : tabValue === 1 ? (
						<GradeAndPromotion userData={userData} />
					) : tabValue === 2 ? (
						<Compensation />
					) : tabValue === 3 ? (
						<Exit />
					) : (
						tabValue === 4 && <ConfidentialInformation />
					)}
				</div>
			}
		/>
	);
};

{
	/* <SideModal
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
					</SideModal> */
}

withReducer('kpoCategory', kpoCategoryReducer)(PromotionalEmployeeKpoDetail);
export default withReducer('kpo', reducer)(PromotionalEmployeeKpoDetail);
