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
import LoanReqTab from '../tabs/loanRegTab';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

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

function ManageLoan(props) {
	const dispatch = useDispatch();
  const theme = useTheme();
	const [tabValue, setTabValue] = useState(0);
	const loans = useSelector(({ loans }) => loans.loans);


  const classes = useStyles(props);
  
  function handleChangeTab(event, value) {
		setTabValue(value);
	}

	useEffect(() => {
		dispatch(Actions.getPendingLoan());
		dispatch(Actions.getApprovedLoan());
	}, [dispatch]);

	// useEffect(() => window.location.reload(false), [])

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
                    monetization_on
									</Icon>
									<span className="mx-4">Loan Management</span>
								</Typography>
							</FuseAnimate>

							<div className="flex items-center max-w-full">
								
							</div>
						</div>
            
					</div>
      }
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
					<Tab className="h-64 normal-case" label="Pending Loan" />
					<Tab className="h-64 normal-case" label="Approved Loan" />
				</Tabs>
			}
			content={
        <div className=" sm:p-24 ">
          {tabValue === 0 && (<LoanReqTab loans={loans.pendingLoan}/>)}
          {tabValue === 1 && (<LoanReqTab loans={loans.approvedLoan}/>)}
        </div>
			}
			innerScroll
		/>
	);
}

export default withReducer('loans', reducer)(ManageLoan);
