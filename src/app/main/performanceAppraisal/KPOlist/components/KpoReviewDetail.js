import React from 'react';
import ApprovedKpoReviewDetail from './ApprovedKpoReviewDetail';
import { makeStyles } from '@material-ui/core/styles';
import QuarterlyKpoReviewForm from './QuarterlyKpoReviewForm';
import ApprovedQuarterlyKpoReview from './ApprovedQuarterlyKpoReview';

const useStyles = makeStyles(theme => ({
	approvedKpoReviewDetail: {
		width: '85%',
		margin: 'auto',

		[theme.breakpoints.down('xs')]: {
			width: '100%'
		}
	},
	completedQuarterlies: {
		backgroundColor: '#E8E8E8',
		marginTop: '10%',
		borderRadius: 10,
		padding: 50
	},
	employeeJobTitle: {
		fontSize: '1.9rem',

		[theme.breakpoints.down('xs')]: {
			fontSize: '1.5rem'
		}
	},
	hide: {
		display: 'none'
	}
}));

const KpoReviewDetail = ({ kpoDetailArray, currentlyShownKpoDetail, updateKpo }) => {
	const classes = useStyles();

	const [completedQuarterlies, setCompletedQuarterlies] = React.useState([]);

	const currentKpo = kpoDetailArray[currentlyShownKpoDetail];

	React.useEffect(() => {
		const completedOnes = [];

		if (currentKpo?.Q1?.comment) {
			completedOnes.push(currentKpo?.Q1);
		}
		if (currentKpo?.Q2?.comment) {
			completedOnes.push(currentKpo?.Q2);
		}
		if (currentKpo?.Q3?.comment) {
			completedOnes.push(currentKpo?.Q3);
		}
		if (currentKpo?.Q4?.comment) {
			completedOnes.push(currentKpo?.Q4);
		}

		if (completedOnes.length > 0) {
			setCompletedQuarterlies([...completedQuarterlies, ...completedOnes]);
		}

		return () => setCompletedQuarterlies([]);
	}, []);

	React.useEffect(() => console.log(completedQuarterlies, 'completedQuarterlies'), [completedQuarterlies]);

	return (
		<div className={` ${classes.approvedKpoReviewDetail} ${completedQuarterlies.length === 0 && classes.hide}`}>
			<ApprovedKpoReviewDetail kpoIndividualDetail={currentKpo} kpoIndexPosition={currentlyShownKpoDetail} />
			<div className={` ${classes.completedQuarterlies}`}>
				{completedQuarterlies.map((quarterly, index) => (
					<ApprovedQuarterlyKpoReview key={index} list={quarterly} />
				))}
			</div>
			<QuarterlyKpoReviewForm
				kpoQuarter={currentKpo}
				qLabel={
					currentKpo?.Q1?.comment === ''
						? 'Q1'
						: currentKpo?.Q2?.comment === ''
						? 'Q2'
						: currentKpo?.Q3?.comment === ''
						? 'Q3'
						: currentKpo?.Q4?.comment === '' && 'Q4'
				}
				updateKpo={updateKpo}
			/>
		</div>
	);
};

export default KpoReviewDetail;
