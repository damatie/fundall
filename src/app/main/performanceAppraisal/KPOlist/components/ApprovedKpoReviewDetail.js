import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	approvedKpoDetail: {
		width: '100%',
		backgroundColor: '#E8E8E8',
		borderRadius: 10,
		display: 'flex'
	},
	indexNumber: {
		width: '10%',
		backgroundColor: '#C8C8C8',
		color: '#ffffff',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		fontSize: 40,
		// lineHeight: 50.2,

		[theme.breakpoints.down('xs')]: {
			fontSize: 20
		}
	},
	mainContent: {
		width: '90%',
		display: 'flex',
		flexDirection: 'column',

		'& section': {
			margin: '2%',

			[theme.breakpoints.down('xs')]: {
				margin: '1% 2%'
			}
		}
	},
	kpoDetailLabel: {
		fontWeight: 600,
		fontSize: 12,
		// lineHeight: 15,
		color: '#6F6F6F',

		[theme.breakpoints.down('xs')]: {
			fontSize: 10
		}
	},
	kpoDetailContent: {
		fontWeight: 600,
		fontSize: 14,
		// lineHeight: 20,
		textAlign: 'justify',
		color: '#000000',

		[theme.breakpoints.down('xs')]: {
			fontSize: 11
		}
	}

	// employeeJobTitle: {
	// 	fontSize: '1.9rem',

	// 	[theme.breakpoints.down('xs')]: {
	// 		fontSize: '1.5rem'
	// 	}
	// }
}));

const ApprovedKpoReviewDetail = ({ kpoIndividualDetail, kpoIndexPosition }) => {
	const classes = useStyles();

	const numbering = theIndexNo => {
		let finalIndex;

		if (theIndexNo >= 0 && theIndexNo <= 8) {
			finalIndex = `0${theIndexNo + 1}`;
		} else {
			finalIndex = theIndexNo;
		}

		return finalIndex;
	};

	return (
		<div className={` ${classes.approvedKpoDetail}`}>
			<div className={` ${classes.indexNumber}`}>{numbering(kpoIndexPosition)}</div>
			<div className={` ${classes.mainContent}`}>
				<section>
					<span className={` ${classes.kpoDetailLabel}`}>KPO Category</span>
					<p className={` ${classes.kpoDetailContent}`}>{kpoIndividualDetail.kpoCategory.name}</p>
				</section>
				<section>
					<span className={` ${classes.kpoDetailLabel}`}>Description</span>
					<p className={` ${classes.kpoDetailContent}`}>{kpoIndividualDetail.kpoCategory.description}</p>
				</section>
				<section>
					<span className={` ${classes.kpoDetailLabel}`}>Target</span>
					<p className={` ${classes.kpoDetailContent}`}>{kpoIndividualDetail.target}</p>
				</section>
				<section>
					<span className={` ${classes.kpoDetailLabel}`}>PIP Target</span>
					<p className={` ${classes.kpoDetailContent}`}>{kpoIndividualDetail.kpoPipTarget}</p>
				</section>
			</div>
		</div>
	);
};

export default ApprovedKpoReviewDetail;
