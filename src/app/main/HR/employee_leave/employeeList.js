import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseUtils from '@fuse/utils';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import EmployeeTab from './tabs/employeeTab';
import { Divider } from '@material-ui/core';
// import * as Actions from '../store/actions';
// import MailListItem from './MailListItem';


function EmployeeList(props) {
	const dispatch = useDispatch();
	const [ employees, setEmployees ] = useState([]);
	// const onboarding = useSelector(({ onboarding }) => onboarding.onboarding.data);
	// const searchText = useSelector(({ mailApp }) => mailApp.mails.searchText);

	const employeeList = useSelector(({ employeeList }) => employeeList);

	useEffect(() => {
		setEmployees(employeeList.data)
	}, [employeeList.update, employeeList])

	useEffect(() => {
		console.log(employeeList.data);
	}, [])
	const routeParams = useParams();
	const { t } = useTranslation('mailApp');

	useDeepCompareEffect(() => {
		// dispatch(Actions.getMails(routeParams));
	}, [dispatch, routeParams]);

	// useEffect(() => {
	// 	function getFilteredArray() {
	// 		const arr = Object.keys(mails).map(id => mails[id]);
	// 		if (searchText.length === 0) {
	// 			return arr;
	// 		}
	// 		return FuseUtils.filterArrayByString(arr, searchText);
	// 	}

	// 	if (mails) {
	// 		setFilteredData(getFilteredArray());
	// 	}
	// }, [mails, searchText]);

	// if (!filteredData) {
	// 	return null;
	// }

	if (employees.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						{t('NO_EMPLOYEES')}
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<List className="p-0">
			<FuseAnimateGroup
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
			>
				{employees.map((mail, i) => (
					// <MailListItem mail={mail} key={mail.id} />
					<>
          <EmployeeTab data={mail} key={mail.id}/>
					<Divider />
					</>
				))}
			</FuseAnimateGroup>
		</List>
	);
}

export default withRouter(EmployeeList);
