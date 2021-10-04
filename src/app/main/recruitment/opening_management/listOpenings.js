import _ from '@lodash';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import withReducer from 'app/store/withReducer';
import PageLayout from 'app/shared/pageLayout/PageLayout';
// import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import * as Actions from '../store/actions';
import AddIcon from '@material-ui/icons/Add';
import reducer from '../store/reducers';
import Table from '../RecruitmentTable.js';
import { useAuth } from 'app/hooks/useAuth';
import useRecruitmentOpening from '../hooks/useRecruitmentOpening';
import CreateNewOpening from './components/CreateNewOpening';

function Recruitment(props) {
	const dispatch = useDispatch();
	const { push } = useHistory();

	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const state = useSelector(state => state.Recruitment);
	const userData = useAuth().getUserProfile;

	const [search, setSearch] = useState('');
	const [tabValue, setTabValue] = useState(0);
	const [description, setDescription] = React.useState('');
	
	const RecruitmentHook = useRecruitmentOpening({
		state,
		id: '',
		dispatch,
		push,
		userInfo: userData,
		description,
		setDescription
	});



	const {
		publishedRows,
		unpublishedRows,
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
				handleSearch: ({ target: { value } }) => setSearch(value)
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
				<CreateNewOpening customHook={RecruitmentHook}/>
					{tabValue === 0 && (
						<Table
							customHook = {RecruitmentHook}
							rows={unpublishedRows}
							search={search}
						/>
					)}
					{tabValue === 1 && (
						<Table
						customHook = {RecruitmentHook}
						rows={publishedRows}
						search={search}
						/>
					)}
					{tabValue === 2 && (
						<Table
						customHook = {RecruitmentHook}
						rows={closedRow}
						search={search}
						/>
					)}
				</div>
			}
		/>
	);
}

export default withReducer('Recruitment', reducer)(Recruitment);
