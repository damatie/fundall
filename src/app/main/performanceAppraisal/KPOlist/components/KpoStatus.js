import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	status: {
		display: 'flex',
		height: 35,
		alignItems: 'center',
		justifyContent: 'center',
		fontWeight: 700,
		backgroundColor: '#b0b0b0'
	},
	pendingStatus: {
		color: '#fb3232',
		backgroundColor: '#ffc3c3' /* ,

		[theme.breakpoints.down('xs')]: {
			fontSize: '1.5rem'
		} */
	},
	createdStatus: {
		backgroundColor: '#b0b0b0',
		color: '#000000'
	}
}));

const KpoStatus = ({ status }) => {
	const classes = useStyles();

	const capitalizeFirstLetter = str => {
		const capitalizedFirstLetter = str.charAt(0).toUpperCase() + str.slice(1);
		return capitalizedFirstLetter;
	};

	const checkStringAndCapitalizeFirstLetter = string => {
		if (string.includes('-')) {
			let strArr = string.split('-');
			strArr = strArr.map(singStr => capitalizeFirstLetter(singStr));

			let strText = strArr.join(' ');
			return strText;
		} else {
			const result = capitalizeFirstLetter(string);
			return result;
		}
	};

	return (
		<>
			{status === 'completed' ? (
				<span className={`bg-green-100 text-green-800 text-center p-4 rounded-4 ${classes.status}`}>
					{checkStringAndCapitalizeFirstLetter(status?.toLowerCase())}
				</span>
			) : status === 'created' ? (
				<span className={`text-center p-4 rounded-4 ${classes.createdStatus} ${classes.status}`}>Pending</span>
			) : status === 'pending' ? (
				<span className={`text-center p-4 rounded-4 ${classes.pendingStatus} ${classes.status}`}>Pending</span>
			) : (
				<span className={`bg-yellow-100 text-yellow-800 text-center p-4 rounded-4 ${classes.status}`}>
					{checkStringAndCapitalizeFirstLetter(status?.toLowerCase())}
				</span>
			)}
		</>
	);
};

export default KpoStatus;
