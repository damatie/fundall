import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as Actions from '../store/actions';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import NewOpeningTab from '../tabs/newOpeningTab';
import entityReducer from 'app/main/HR/business_unit/store/reducers';
import departmentReducer from 'app/main/HR/business_unit/department/store/reducers';
import rolesReducer from 'app/main/HR/roles/store/reducers';
import Header from '../recruitmentHeader';

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

function CreateOpening(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);

	useEffect(() => {
		dispatch(Actions.getEntities());
	}, [])

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				<Header heading='New opening' />
			}
			content={
					<div className=" sm:p-24 ">
						<NewOpeningTab />
					</div>
			}
			innerScroll
		/>
	);
}

export default withReducer('createOpening', reducer)(CreateOpening);
