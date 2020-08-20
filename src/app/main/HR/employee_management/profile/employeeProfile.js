import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import withReducer from 'app/store/withReducer';
import reducers from '../store/reducers';
import departmentsReducer from 'app/main/HR/business_unit/department/store/reducers';
import { useSelector, useDispatch } from 'react-redux';
import AboutTab from 'app/main/employee/profile/tabs/AboutTab';
import ProfilePicture from 'app/main/employee/profile/profilePicture';
import EmployeementInfoTab from 'app/main/employee/profile/tabs/employeementInfoTab';
import PromotionHistory from '../employee/tabs/promotionHistory';


const useStyles = makeStyles(theme => ({
	layoutHeader: {
		height: 320,
		minHeight: 320,
		[theme.breakpoints.down('md')]: {
			height: 240,
			minHeight: 240
		}
	}
}));

function EmployeeProfile() {
	const classes = useStyles();
	const [selectedTab, setSelectedTab] = useState(0);
	const EmployeeProfileState = useSelector(({ employeesDetails }) => employeesDetails);
	const [data, setData] = useState({});

	useEffect(() => {
		setData(EmployeeProfileState.employee.info);
	}, [EmployeeProfileState]);

	function handleTabChange(event, value) {
		setSelectedTab(value);
	}

	if(Object.entries(data).length === 0) {
		return <>Loading </>
	}

	return (
		<FusePageSimple
			classes={{
				header: classes.layoutHeader,
				toolbar: 'px-16 sm:px-24'
			}}
			header={
				<div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-column md:items-center">
					<div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
						<FuseAnimate animation="transition.expandIn" delay={300}>
							<ProfilePicture />
						</FuseAnimate>
						
					</div>
					{/* <FuseAnimate animation="transition.slideLeftIn" delay={300}> */}
							<Typography className="md:mx-24" variant="h4" color="inherit">
								{`${data.firstName} ${data.lastName}`}
							</Typography>
							<Typography className="md:mx-24" variant="subtitle1" color="inherit">
								{`${data.email}`}
							</Typography>
					{/* </FuseAnimate> */}
				</div>
			}
			contentToolbar={
				<Tabs
					value={selectedTab}
					onChange={handleTabChange}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="off"
					classes={{
						root: 'h-64 w-full border-b-1'
					}}
				>
					<Tab
						classes={{
							root: 'h-64'
						}}
						label="About"
					/>
					<Tab
						classes={{
							root: 'h-64'
						}}
						label="Employeement information"
					/>
          <Tab
						classes={{
							root: 'h-64'
						}}
						label="Employee promotion history"
					/>
				</Tabs>
			}
			content={
				<div className="p-16 sm:p-24">
					{selectedTab === 0 && <AboutTab />}
					{selectedTab === 1 && data.info && <EmployeementInfoTab /> }
					{selectedTab === 2 && <PromotionHistory />}
				</div>
			}
		/>
	);
}

withReducer('departments', departmentsReducer)(EmployeeProfile);
withReducer('employeesDetails', reducers)(EmployeeProfile)
export default EmployeeProfile;
