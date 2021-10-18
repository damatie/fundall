import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	root: {
		backgroundColor: '#fff',
		borderRadius: 25,
		boxShadow: '0 1rem 2rem rgba(0, 0, 0, 0.05)',
		padding: '2rem',
		// display: 'grid',
		// placeItems: 'center',
		width: '100%'
	}
}));

const Card = ({ children, className, ...rest }) => {
	const classes = useStyles();

	return (
		<div className={`${classes.root} ${className && className}`} {...rest}>
			{children}
		</div>
	);
};

export default Card;
