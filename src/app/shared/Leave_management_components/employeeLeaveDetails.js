import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import EmployeeLeaveReq from './tabs/employeeLeaveReq';
import * as Actions from 'app/store/actions';
import { useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import { fetchHeaders } from '../fetchHeaders';
import ProgressBtn from '../progressBtn';
import swal from 'sweetalert2';
import LeaveActionBtn from './actionBtn';


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

function EmployeeLeaveDetails(props) {
	const classes = useStyles();
	const [selectedTab, setSelectedTab] = useState(0);
	const leaveDetails = useSelector(({ leaveRequestDetails }) => leaveRequestDetails);
	const user = JSON.parse(localStorage.getItem('user_data'))

	const { id } = useParams();

	const theme = useTheme();

	const history = useHistory();

	const dispatch = useDispatch();

	function handleTabChange(event, value) {
		setSelectedTab(value);
	}

	useEffect(() => {
		// console.log(props.config.user)
		dispatch(Actions.getLeaveReqDetails(id))
	}, [dispatch])

	return (
		<FusePageSimple
			classes={{
				header: classes.layoutHeader,
				toolbar: 'px-16 sm:px-24'
			}}
			header={
				<>
				<div className="flex absolute m-24">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography
									className="normal-case flex items-center"
									component={Link}
									role="button"
									// to="/hr/business_unit/"
									color="inherit"
									onClick={e => history.goBack()}
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4">Back</span>
								</Typography>
							</FuseAnimate>
						</div>
				<div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
						
					<div className="flex flex-1 flex-col items-center justify-center md:flex-row items-center md:justify-start">
						<FuseAnimate animation="transition.expandIn" delay={300}>
							<Avatar className="w-96 h-96" src="assets/images/avatars/Velazquez.jpg" />
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<div>
								<Typography className="md:mx-24" variant="h4" color="inherit">
									{leaveDetails.data.employeeName}
								</Typography>
								<Typography className="m-24" variant="subtitle1" color="inherit">
									Test@test.co
								</Typography>
							</div>
						</FuseAnimate>
					</div>
					{/* <LeaveActionBtn /> */}
				</div>
				</>
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
						label="Leave details"
					/>
					{/* <Tab
						classes={{
							root: 'h-64'
						}}
						label="About"
					/>
					<Tab
						classes={{
							root: 'h-64'
						}}
						label="Photos & Videos"
					/> */}
				</Tabs>
			}
			content={
				<div className="p-16 sm:p-24">
					{selectedTab === 0 && <EmployeeLeaveReq user={props.config.user}/>}
					{/* {selectedTab === 1 && <AboutTab />}
					{selectedTab === 2 && <PhotosVideosTab />} */}
				</div>
			}
		/>
	);
}

export default EmployeeLeaveDetails;
