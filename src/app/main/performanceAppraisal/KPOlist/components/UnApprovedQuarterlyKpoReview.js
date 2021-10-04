import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import editIcon from '../../../../../assets/icons/editIcon.svg';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	unApprovedQuarterlyKpoReview: {
		backgroundColor: '#ffffff',
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
	},
	divWithEditIcon: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '3%'
	},
	editBtn: {
		backgroundColor: '#e0e0e0',
		width: '15%',
		// textTransform: 'capitalize',
		fontSize: 12
	},
	editIcon: {
		width: '15%',

		[theme.breakpoints.down('md')]: {
			width: '20%'
		}
	},
	editText: {
		display: 'inline-block',
		marginLeft: '15%'
	}
}));

const UnApprovedQuarterlyKpoReview = ({ list }) => {
	const classes = useStyles();

	return (
		<div className={` ${classes.unApprovedQuarterlyKpoReview}`}>
			<section>
				<div className={` ${classes.divWithEditIcon}`}>
					<span className={` ${classes.kpoDetailLabel}`}>{list.label}</span>
					<Button variant="contained" color="default" className={` ${classes.editBtn}`}>
						<img src={editIcon} className={` ${classes.editIcon}`} />
						<span className={` ${classes.editText}`}>Edit</span>
					</Button>
				</div>
				<p className={` ${classes.kpoDetailContent}`}>{list.content}</p>
			</section>
			<section>
				<span className={` ${classes.kpoDetailLabel}`}>Comment</span>
				<p className={` ${classes.kpoDetailContent}`}>{list.comment}</p>
			</section>
		</div>
	);
};

export default UnApprovedQuarterlyKpoReview;
