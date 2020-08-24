import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import LeaveTableTab from './tabs/leaveTableTab';
import reducer from 'app/store/reducers';

const useStyles = makeStyles(theme => ({
	productImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	productImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $productImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $productImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));

function LeaveManagement(props) {
	const dispatch = useDispatch();
  const theme = useTheme();
	const [tabValue, setTabValue] = useState(0);
	
	const leaveRequest = useSelector(({ leaveRequest }) => leaveRequest);

	const user = JSON.parse(localStorage.getItem('user_data'))

  const classes = useStyles(props);
  
  function handleChangeTab(event, value) {
		setTabValue(value);
	}

	useEffect(() => {
		
	}, []);

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-50 h-50 sm:h-136 sm:min-h-136'
			}}
			header={
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-col items-start max-w-full">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography
									className="normal-case flex items-center sm:mb-12"
									role="button"
									color="inherit"
								>
									<Icon className="text-20">
										event
									</Icon>
									<span className="mx-4">Leave</span>
								</Typography>
							</FuseAnimate>

							<div className="flex items-center max-w-full">
								
							</div>
						</div>
            
					</div>
      }
      contentToolbar={
				user.role === 'HR' ? 
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					{/* <Tab className="h-64 normal-case" label="Pending Leave" /> */}
					<Tab className="h-64 normal-case" label="Reviewed Leave" />
          <Tab className="h-64 normal-case" label="Approved Leave" />
				</Tabs> 
				:
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64 normal-case" label="Pending Leave" />
					{/* <Tab className="h-64 normal-case" label="Reviewed Leave" /> */}
          <Tab className="h-64 normal-case" label="Approved Leave" />
				</Tabs> 
			}
			content={
				user.role === 'HR' ? 
        <div className=" sm:p-24 ">
          {/* {tabValue === 0 && (<LeaveTableTab data={leaveRequest.pendingLeaves} user={props.config}/>)} */}
          {tabValue === 0 && (<LeaveTableTab data={leaveRequest.reviewedLeaves} user={props.config} />)}
          {tabValue === 1 && (<LeaveTableTab data={leaveRequest.approvedLeaves} user={props.config} />)}
        </div>
				:
				<div className=" sm:p-24 ">
          {tabValue === 0 && (<LeaveTableTab data={leaveRequest.pendingLeaves} user={props.config}/>)}
          {/* {tabValue === 1 && (<LeaveTableTab data={leaveRequest.reviewedLeaves} user={props.config} />)} */}
          {tabValue === 1 && (<LeaveTableTab data={leaveRequest.approvedLeaves} user={props.config} />)}
        </div>
			}
			innerScroll
		/>
	);
}

export default withReducer('leaveRequest', reducer)(LeaveManagement);
