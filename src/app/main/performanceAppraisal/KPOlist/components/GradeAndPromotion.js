import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GradeAndPromotionContent from './GradeAndPromotionContent';
import PromotionalKpoEmployeeProfile from './PromotionalKpoEmployeeProfile';

const useStyles = makeStyles(theme => ({
	gradeAndPromotionDiv: {
		marginTop: '10%',
		borderLeft: '2px solid #c8c8c8'
	}
}));

const GradeAndPromotion = ({ userData }) => {
	const classes = useStyles();
	useEffect(() => console.log(userData), [userData]);

	return (
		<div>
			<PromotionalKpoEmployeeProfile userData={userData} />
			<div className={` ${classes.gradeAndPromotionDiv}`}>
				<GradeAndPromotionContent userData={userData} name="Employee Information" />
				<GradeAndPromotionContent userData={userData} name="Promotional History" />
			</div>
		</div>
	);
};

export default GradeAndPromotion;
