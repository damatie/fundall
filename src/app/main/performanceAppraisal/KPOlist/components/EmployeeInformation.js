import React from 'react';
import PromotionalKpoEmployeeProfile from './PromotionalKpoEmployeeProfile';
import { makeStyles } from '@material-ui/core/styles';
import EmployeeInformationContent from './EmployeeInformationContent';

const useStyles = makeStyles(theme => ({
	employeeInformationSubDiv: {
		marginTop: '10%',
		borderLeft: '2px solid #c8c8c8'
	}
}));

const EmployeeInformation = ({ userData }) => {
	const classes = useStyles();

	return (
		<div>
			<PromotionalKpoEmployeeProfile userData={userData} />
			<div className={` ${classes.employeeInformationSubDiv}`}>
				{userData.employeeInformationTab.map(({ id, identifier, labelImg, name, content, color }) => (
					<EmployeeInformationContent
						key={id}
						identifier={identifier}
						labelImg={labelImg}
						name={name}
						content={content}
						color={color}
					/>
				))}
			</div>
		</div>
	);
};

export default EmployeeInformation;
