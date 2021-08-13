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
	promotionalContentDiv: {
		marginTop: '7.5%'
	}
}));

const PromotionalEmployeeKpoDetail = () => {
	const classes = useStyles();

	const [tabValue, setTabValue] = React.useState(0);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}
	// React.useEffect(() => console.log(tabValue), [tabValue]);

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
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'h-64' }}
					className={` ${classes.kpoDetailsTab}`}
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
					<>JUST TEXT NOTHING YET</>
					{/* <SideModal
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
					</SideModal> */}
				</div>
			}
		/>
	);
};

withReducer('kpoCategory', kpoCategoryReducer)(PromotionalEmployeeKpoDetail);
export default withReducer('kpo', reducer)(PromotionalEmployeeKpoDetail);
