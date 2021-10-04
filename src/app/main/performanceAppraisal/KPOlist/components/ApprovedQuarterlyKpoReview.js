import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	approvedQuarterlyKpoReview: {
		backgroundColor: '#C8C8C8',
		padding: '15px 30px 30px 40px',
		borderRadius: 10,
		marginBottom: '5%',

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
}));

const ApprovedQuarterlyKpoReview = ({ list }) => {
	const classes = useStyles();

	return (
		<div className={` ${classes.approvedQuarterlyKpoReview}`}>
			<section>
				<span className={` ${classes.kpoDetailLabel}`}>{list.label}</span>
				<p className={` ${classes.kpoDetailContent}`}>{list.content}</p>
			</section>
			<section>
				<span className={` ${classes.kpoDetailLabel}`}>Comment</span>
				<p className={` ${classes.kpoDetailContent}`}>{list.comment}</p>
			</section>
		</div>
	);
};

export default ApprovedQuarterlyKpoReview;
