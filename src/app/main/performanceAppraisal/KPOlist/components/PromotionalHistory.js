import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	promotionalHistoryDiv: {
		marginLeft: '35%',

		[theme.breakpoints.down('sm')]: {
			marginTop: '4%',
			marginLeft: '13.5%'
		}
	},
	promotionalHistory: {
		borderLeft: '8px solid #17005A',
		marginBottom: '1%',
		color: '#000000',

		'& p': {
			fontWeight: 700,
			fontSize: 13,
			marginLeft: '1%'
		}
	},
	jobTitle: {
		fontSize: '21px !important'
	},
	tag: {
		color: '#3D3D3D',
		fontWeight: 700,
		fontSize: 11
	}
}));

const PromotionalHistory = ({ history }) => {
	const classes = useStyles();

	return (
		<div className={` ${classes.promotionalHistoryDiv}`}>
			{history.map(({ id, jobTitle, companyName, department, dateFrom, dateTo, tag }) => (
				<div key={id}>
					<span className={` ${classes.tag}`}>{tag}</span>
					<div className={` ${classes.promotionalHistory}`}>
						<p className={` ${classes.jobTitle}`}>{jobTitle}</p>
						<p>{companyName}</p>
						<p>{department}</p>
						<p>
							{dateFrom} <span>-</span> {dateTo}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default PromotionalHistory;
