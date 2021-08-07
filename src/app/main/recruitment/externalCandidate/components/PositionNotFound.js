import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	root: {
        backgroundColor: '#fff',
		padding: theme.spacing(5),
        textAlign: 'center',
        position: 'relative',
        alignItems: 'center',
        height: '100%',
	},
	sub: {
        backgroundColor: '#fff',
		padding: theme.spacing(5),
        textAlign: 'center',
        position: 'relative',
        alignItems: 'center',
        height: '100%',
        top: '10%'
	},
    img: {
        width: '250px',
        height: '50px',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
    },
	title: {
		marginTop: theme.spacing(2),
		color: '#121212',
		fontWeight: 800,
        fontSize: '70px',
        textTransform: 'uppercase'
	},
	description: {
		margin: theme.spacing(2),
        color: '#121212',
		fontWeight: 500,
        color: '#bbbbbb',
        fontSize: '20px'
	},
	divder: {
		width: '390px',
		margin: theme.spacing(2)
	}
}));

const PositionNotFound = ({text}) => {
	const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.sub}>
                <img 
                    className={classes.img}
                    src="data:image/png;base64,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"
                    alt="Logo"
                />
                <Typography variant="h4" className={classes.title}>
                    SORRY
                </Typography>
                <Typography variant="h4" className={classes.title}>
                    Job Not Found
                </Typography>

                <Typography variant="body1" className={classes.description}>
                    {text || 'Sorry but we could not find the page you are looking for'}
                </Typography>
            </div>
        </div>
    )
}

export default PositionNotFound;