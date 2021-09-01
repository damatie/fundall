import React, { useEffect, useState } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Skeleton } from '@material-ui/lab';
import withReducer from 'app/store/withReducer';
import PageLayout from 'app/shared/pageLayout/PageLayout';
import {Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Table from './components/CandidatesTable';
import { useAuth } from 'app/hooks/useAuth';
import AddApplicant from './components/AddApplicant';
import SharedButton from 'app/shared/button/SharedButton';

const useStyles = makeStyles(theme => ({
	button: {
		marginRight: theme.spacing(3)
	},
}));
const CandidateList = ({positionId, candidateHook}) => {
	const classes = useStyles();
	const [search, setSearch] = useState('');
	const [tabValue, setTabValue] = useState(0);

	const {
		shortlistedRows,
		activeRows,
		isManager,
		rows,
		showButton,
		loading,
		onShortlising
	} = candidateHook;


	function handleChangeTab(event, value) {
		setTabValue(value);
	}


	return (
		loading ? (
			<Skeleton animation="wave" width="100%" height="350px" variant="rect" />
		) : (
		<>
			<Grid container lg={12} md={12} sm={12} xs={12}>
				<Grid item lg={6} md={6} sm={6} xs={6} spacing={6} align="left" className="">
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
						<Tab className="text-14 normal-case" label="All" />
						<Tab className="text-14 normal-case" label="Shortlisted" />
					</Tabs>
				</Grid>
				<Grid item lg={6} md={6} sm={6} xs={6} spacing={6} align="right" className="">
					{(tabValue === 0 && isManager()) && (
						<SharedButton
							variant="contained"
							color="secondary"
							type="button"
							className={`my-10 ${classes.button}`}
							disabled={!showButton}
							onClick={() => {
								onShortlising();
							}}
						>
							Shortlist Selected Candidates
						</SharedButton>
					)}
				</Grid>
			</Grid>

			<div className=" sm:px-24 py-16 ">
			<AddApplicant customHook={candidateHook}/>
			{tabValue === 0 && (
				<Table
					customHook = {candidateHook}
					rows={activeRows}
					showCheckBox={isManager()}
				/>
			)}
			{tabValue === 1 && (
				<Table
					customHook = {candidateHook}
					rows={shortlistedRows}
					showCheckBox={false}
				/>
			)}
			</div>
		</>
		)
	)
}

export default CandidateList;
