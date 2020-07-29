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
import { Link, useParams, useHistory } from 'react-router-dom';
import RequestLoanTab from '../tabs/requestLoanTab';
import reducer from '../store/reducers';
import ProgressBtn from 'app/shared/progressBtn';
import * as Actions from '../store/actions';

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

function LoanReq(props) {
	const dispatch = useDispatch();
	const theme = useTheme();

	const classes = useStyles(props);

	const { id } = useParams();

	const history = useHistory();

	const loan = useSelector(({ loan }) => loan.loan);

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-col items-start max-w-full">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography
									className="normal-case flex items-center sm:mb-12"
									component={Link}
									role="button"
									to="/loan/request/list"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4">Leave options</span>
								</Typography>
							</FuseAnimate>

							<div className="flex items-center max-w-full">
								
							</div>
						</div>
            <div className="flex items-center max-w-full">
								<FuseAnimate animation="transition.expandIn" delay={300}>
										<img
											className="w-32 sm:w-48 rounded"
											src="assets/images/ecommerce/product-image-placeholder.png"
											alt={'form.name'}
										/>
								</FuseAnimate>
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										{id ? 
										<ProgressBtn success={loan.success} loading={loan.closing} content='Cancel Loan' onClick={e => {
											dispatch(Actions.cancelLoan(id, history))
										}} color='red'/> :
										<Typography className="text-16 sm:text-20 truncate">
										  New Loan Request
										</Typography>}
									</FuseAnimate>
									{/* <FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography variant="caption">Leave options details</Typography>
									</FuseAnimate> */}
								</div>
							</div>
					</div>
			}
			content={
					<div className=" sm:p-24 ">
						<RequestLoanTab />
					</div>
			}
			innerScroll
		/>
	);
}

export default withReducer('loan', reducer)(LoanReq);
