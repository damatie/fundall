import React, { useState } from 'react';
import PromotionalKpoEmployeeProfile from './PromotionalKpoEmployeeProfile';
import { makeStyles } from '@material-ui/core/styles';
import EmployeeInformationContent from './EmployeeInformationContent';
import EmployeeInformationContentLabel from './EmployeeInformationContentLabel';
import EmployeeInformationComponent from './EmployeeInformationComponent';

const useStyles = makeStyles(theme => ({
	employeeInformationSubDiv: {
		marginTop: '10%',
		// borderLeft: '2px solid #c8c8c8'
		backgroundColor: '#F5F5F5',
		display: 'flex',
		marginLeft: '8%'
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

const EmployeeInformation = ({ userData }) => {
	const classes = useStyles();
	const [showContent, setShowContent] = useState('Employee Information');
	const [contentToShow, setContentToShow] = useState({
		title: 'Mr',
		staffId: 'SRG219',
		firstName: 'Jon',
		gender: 'Male',
		middleName: 'John',
		surname: 'Doe',
		maritalStatus: 'Married',
		nickName: 'DJOE',
		officialNo: '0902172712',
		officeNo: '119828337',
		officeExtension: '3322',
		privateNo: '992991182',
		officeEmail: 'joe@contoso.com',
		alternativeEmail: 'joe@gmail.com',
		fbHandle: 'Djoe23',
		linkedInHandle: 'Jon Doe',
		instaHandle: 'Jon_Doe',
		twitterHandle: 'Jon_Doe'
	});

	return (
		<div>
			<PromotionalKpoEmployeeProfile userData={userData} />
			<div className={` ${classes.employeeInformationSubDiv}`}>
				<div className={` ${classes.labelOuterDiv}`}>
					{userData.employeeInformationTab.map(({ id, labelImg, name, content, color }) => (
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
				{/* {userData.employeeInformationTab.map(({ id, labelImg, name, content, color }) => (
					<EmployeeInformationContent key={id} labelImg={labelImg} name={name} content={content} color={color} />
				))} */}
				<div className={` ${classes.contentOuterDiv} ${showContent !== 'Employee Information' && classes.noContent}`}>
					{showContent === 'Employee Information' ? (
						<EmployeeInformationComponent content={contentToShow} />
					) : (
						<div>THERE IS NO DATA TO SHOW HERE FOR NOW</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default EmployeeInformation;
