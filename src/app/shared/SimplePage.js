import FuseAnimate from '@fuse/core/FuseAnimate';
import _ from '@lodash';

import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosRounded';
import IconButton from '@material-ui/core/IconButton';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	header: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.getContrastText(theme.palette.primary.main)
	},
	headerIcon: {
		position: 'absolute',
		top: -64,
		left: 0,
		opacity: 0.04,
		fontSize: 512,
		width: 512,
		height: 512,
		pointerEvents: 'none'
	},
	pagination: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '32px',
		marginTop: '30px'
	},
	previousBtn: {
		marginBottom: 10,
		alignSelf: 'left',
		[theme.breakpoints.down('xs')]: {
		  display: 'none',
		},
		color: 'white',
		fontSize: 20
	},
}));

function SimplePage(props) {
	
  const { title, children, onClick, backBtn } = props;
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

	const classes = useStyles(props);
	const theme = useTheme();
	return (
		<ThemeProvider theme={mainTheme}>
			<div className="flex flex-col flex-auto flex-shrink-0 w-full">
				<div
					className={clsx(
						classes.header,
						'relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-100 sm:h-188'
					)}
				>	
					<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
						<Typography color="inherit" className="text-20 sm:text-24 font-semiBold">
							{title}
						</Typography>
					</FuseAnimate>
					<Icon className={classes.headerIcon}> school </Icon>
				</div>
				<div className={classes.header}>
					{!backBtn &&
						<IconButton className={classes.previousBtn} aria-label="go back" component="span" onClick={onClick}>
							<ArrowBackIcon />
						</IconButton>
					}
				</div>
				<div className="flex flex-col flex-1 w-full mx-auto px-8 sm:px-16 py-24">
            { children }
        </div>
			</div>
		</ThemeProvider>
	);
}

export default SimplePage;
