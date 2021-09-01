import React, { useState } from 'react';
import PromotionalKpoEmployeeProfile from './PromotionalKpoEmployeeProfile';
import { makeStyles } from '@material-ui/core/styles';
import EmployeeInformationContentLabel from './EmployeeInformationContentLabel';
import EmployeeInformationComponent from './EmployeeInformationComponent';
import GradeEmployeeInformationContent from './GradeEmployeeInformationContent';

const useStyles = makeStyles(theme => ({
	employeeInformationSubDiv: {
		marginTop: '10%',
		// borderLeft: '2px solid #c8c8c8'
		backgroundColor: '#F5F5F5',
		display: 'flex',
		marginLeft: '8%',
		width: '85%'
	},
	labelOuterDiv: {
		backgroundColor: '#fcfcfc',
		width: '35%'
	},
	contentOuterDiv: {
		width: '65%'
	},
	noContent: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontWeight: 800,
		color: '#00CCF2'
	}
}));

const GradeAndPromotion = ({ userData }) => {
	const classes = useStyles();
	const [showContent, setShowContent] = useState('Employee Information');
	const [contentToShow, setContentToShow] = useState({
		employeeGrade: 'GL234',
		natureOfEngagement: 'New Hire',
		confirmationDate: '12/8/2019',
		dateOfEmployment: '12/9/2019',
		dateOfLastPromotion: '12/2/2020'
	});

	return (
		<div>
			<PromotionalKpoEmployeeProfile userData={userData} />
			<div className={` ${classes.employeeInformationSubDiv}`}>
				<div className={` ${classes.labelOuterDiv}`}>
					{userData.gradeAndPromotionTab.map(({ id, labelImg, name, content, color }) => (
						<EmployeeInformationContentLabel
							key={id}
							labelImg={labelImg}
							labelText={name}
							content={content}
							showContent={showContent}
							setShowContent={setShowContent}
							contentToShow={contentToShow}
							setContentToShow={setContentToShow}
						/>
					))}
				</div>
				<div className={` ${classes.contentOuterDiv} ${showContent !== 'Employee Information' && classes.noContent}`}>
					{showContent === 'Employee Information' ? (
						<GradeEmployeeInformationContent content={contentToShow} />
					) : (
						<div>THERE IS NO DATA TO SHOW HERE FOR NOW</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default GradeAndPromotion;
