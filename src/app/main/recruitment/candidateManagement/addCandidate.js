import FuseAnimate from './node_modules/@fuse/core/FuseAnimate';
import FuseChipSelect from './node_modules/@fuse/core/FuseChipSelect';
import FuseLoading from './node_modules/@fuse/core/FuseLoading';
import FusePageCarded from './node_modules/@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from './node_modules/@fuse/hooks';
import FuseUtils from './node_modules/@fuse/utils';
import _ from './node_modules/@lodash';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from './node_modules/app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
// import * as Actions from '../store/actions';
// import reducer from '../store/reducers';
import NewCandidateTab from '../tabs/newCandidateTab';
import entityReducer from './node_modules/app/main/HR/business_unit/store/reducers';
import departmentReducer from './node_modules/app/main/HR/business_unit/department/store/reducers';
import rolesReducer from './node_modules/app/main/HR/roles/store/reducers';
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
	const theme = useTheme();

	const classes = useStyles(props);

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				<Header heading='Add candidate' />
			}
			content={
        <div className=" sm:p-24 ">
          <NewCandidateTab />
        </div>
			}
			innerScroll
		/>
	);
}

// withReducer('roles', rolesReducer)(Employee);
// withReducer('entity', entityReducer)(Employee);
// withReducer('department', departmentReducer)(Employee);
// export default withReducer('employees', reducer)(Employee);

export default CreateOpening;
