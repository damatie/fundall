import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withReducer from 'app/store/withReducer';
import PageLayout from 'app/shared/pageLayout/PageLayout';
// import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import * as Actions from '../store/actions';
import AddIcon from '@material-ui/icons/Add';
import reducer from '../store/reducers';
import Table from '../RecruitmentTable.js';
import { useAuth } from 'app/hooks/useAuth';
import useRecruitmentOpening from '../hooks/useRecruitmentOpening';
import CreateNewOpening from './CreateNewOpening';

const columns = [
	{
		id: 'jobTitle',
		// align: 'center',
		disablePadding: false,
		label: 'Job title',
		sort: true
	},
	{
		id: 'jobDescription',
		// align: 'center',
		disablePadding: false,
		label: 'Job Description',
		sort: true
	},
	{
		id: 'employeeStatus',
		// align: 'center',
		disablePadding: false,
		label: 'Employee status',
		sort: true
	},
	{
		id: 'urgency',
		// align: 'center',
		disablePadding: false,
		label: 'Urgency',
		sort: true
	},
	{
		id: 'createdAt',
		// align: 'center',
		disablePadding: false,
		label: 'Created At',
		sort: true
	},
	{
		id: 'status',
		// align: 'center',
		disablePadding: false,
		label: 'Status',
		sort: true
	},
	{
		id: 'actions',
		// align: 'center',
		disablePadding: false,
		label: 'Actions',
		sort: true
	},
];

function Recruitment(props) {
	const dispatch = useDispatch();

	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const state = useSelector(state => state.Recruitment);
	const userData = useAuth().getUserData;

	const [search, setSearch] = useState('');
	const [tabValue, setTabValue] = useState(0);
	
	const RecruitmentHook = useRecruitmentOpening({
		state,
		dispatch,
		userInfo: userData,
	});



	const {
		approvedRows, 
		pendingRows,
		closedRow,
		isManager,
		rows,
		handleOpenModal
	} = RecruitmentHook;

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	return (
		<PageLayout
			header={{
				icon: '',
				title: 'RECRUITMENT LIST',
				handleSearch: ({ target: { value } }) => console.log(value)
			}}
			button={{
				showButton: isManager(),
				btnTitle: 'CREATE NEW REQUEST',
				onClick: handleOpenModal,
				btnComponent: false,
			}}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="off"
					// className="w-full border-b-1 px-24"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="text-14 normal-case" label="Unpublished" />
					<Tab className="text-14 normal-case" label="Published" />
					<Tab className="text-14 normal-case" label="Closed" />
				</Tabs>
			}
			content={
				<div className=" sm:px-24 py-16 ">
				<CreateNewOpening customHook={RecruitmentHook} />
					{tabValue === 0 && (
						<Table
							customHook = {RecruitmentHook}
							// columns={columns}
							// rows={pendingRows}
							// search={search}
						/>
					)}
					{tabValue === 1 && (
						<Table
						customHook = {RecruitmentHook}
						// columns={columns}
						// rows={pendingRows}
						// search={search}
						/>
					)}
					{tabValue === 2 && (
						<Table
						customHook = {RecruitmentHook}
						// columns={columns}
						// rows={pendingRows}
						// search={search}
						/>
					)}
				</div>
			}
		/>
	);
}

export default withReducer('Recruitment', reducer)(Recruitment);
