import _ from '@lodash';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import {
	TextFieldFormsy
} from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import reducer from '../store/reducers';
import ProgressBtn from 'app/shared/progressBtn';
import * as Actions from '../store/actions';

const pathToRegexp = require('path-to-regexp');

const useStyles = makeStyles(theme => ({
	mailItem: {
		borderBottom: `1px solid  ${theme.palette.divider}`,

		'&.unread': {
			background: 'rgba(0,0,0,0.03)'
		},
		'&.selected': {
			'&::after': {
				content: '""',
				position: 'absolute',
				left: 0,
				display: 'block',
				height: '100%',
				width: 3,
				backgroundColor: theme.palette.primary.main
			}
		}
	},
	avatar: {
		backgroundColor: theme.palette.primary[500]
	}
}));

const EmployeeTab = props => {
	const dispatch = useDispatch();
	const routeParams = useParams();

	const classes = useStyles(props);

	return (
		<ListItem
			dense
		>
			<div className="flex flex-1 flex-col relative overflow-hidden">
				<div className="flex items-center justify-between px-16 pb-8">
					<div className="flex items-center">
					<Avatar alt={'props.data.name'} src={props.data.avatar} /> 
						<Typography variant="subtitle1" className="mx-8">
							{props.data.name}
						</Typography>
					</div>
					<AllocateLeave id={props.data.id}/>
				</div>
			</div>
		</ListItem>
	);
};

const useStyles2 = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		height: 21,
		borderRadius: 2,
		padding: '0 6px',
		fontSize: 11,
		backgroundColor: 'rgba(0,0,0,.08);'
	},
	color: {
		width: 8,
		height: 8,
		marginRight: 4,
		borderRadius: '50%'
	}
}));


const AllocateLeave = ({id}) => {
	const classes = useStyles2();
	const [showInput, setShowInput] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);
	const allocate = useSelector(({allocate}) => allocate.allocate);
	const [userId, setUserId] = useState(null);
	
	const dispatch = useDispatch();

	function disableButton()
	{
		setIsFormValid(false);
	}

	function enableButton()
	{
		setIsFormValid(true);
	}

	function handleSubmit(model)
	{
		console.info('submit', model);
		dispatch(Actions.allocateLeave(
			{
				employeeId: id,
				allotedYear: `${new Date().getFullYear()}`,
				originalAllocatedDays: parseInt(model.name)
			}
		));
	}
	
	useEffect(() => {
		if(!allocate.loading) {
			setUserId(null)
		}
	}, [allocate.loading])
	return (
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex items-center"
			>
			<TextFieldFormsy
				className="m-16"
				type="number"
				name="name"
				label="Leave days"
				variant='outlined'
				required
				value='0'
				size='small'
			/>
			{/* <Button
				size='small'
				type="submit"
				variant="contained"
				color="primary"
				className="m-auto"
				aria-label="LOG IN"
				disabled={!isFormValid}
			>
				allocate
			</Button> */}

			<ProgressBtn success={userId === id ? allocate.success : false} loading={userId === id ? allocate.loading : false} content='Allocate' disable={!isFormValid} onClick={e => {
				setUserId(id);
				}}/>
			
			</Formsy>
	);
};


export default EmployeeTab;
