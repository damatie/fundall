import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import usePermission from 'app/hooks/usePermission';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	root: {
		background: theme.palette.primary.main,
		color: theme.palette.getContrastText(theme.palette.primary.main)
	},
	board: {
		cursor: 'pointer',
		boxShadow: theme.shadows[0],
		transitionProperty: 'box-shadow border-color',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		background: theme.palette.primary.dark,
		color: theme.palette.getContrastText(theme.palette.primary.dark),
		'&:hover': {
			boxShadow: theme.shadows[6]
		}
	},
	newBoard: {
		borderWidth: 2,
		borderStyle: 'dashed',
		borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.6),
		'&:hover': {
			borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.8)
		}
	}
}));

function LoanBanner(props) {

	const classes = useStyles(props);

	const { handleClick } = usePermission();


	return (
		<div className={clsx(classes.root, 'flex flex-grow flex-shrink-0 flex-col items-center')}>
			<div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
				<FuseAnimate>
					<Typography className="mt-44 sm:mt-88 sm:py-24 text-32 sm:text-40 font-300" color="inherit">
						{props.title}
					</Typography>
				</FuseAnimate>

				<div>
					<FuseAnimateGroup
						className="flex flex-wrap w-full justify-center py-32 px-16"
						enter={{
							animation: 'transition.slideUpBigIn',
							duration: 300
						}}
					>
						<div className="w-224 h-224 p-16">
							<Link
								// to={isPermitted ? props.personalUrl : pathname}
								className={clsx(
									classes.board,
									'flex flex-col items-center justify-center w-full h-full rounded py-24'
								)}
								role="button"
								onClick={e => handleClick(props.personalUrl)}
							>
								<Icon className="text-56">attach_money</Icon>
								<Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">
									Personal loan
								</Typography>
							</Link>
						</div>
						<div className="w-224 h-224 p-16">
							<Link
								// to={isPermitted ? props.salaryUrl : pathname}
								className={clsx(
									classes.board,
									'flex flex-col items-center justify-center w-full h-full rounded py-24'
								)}
								role="button"
								onClick={e => handleClick(props.salaryUrl)}
							>
								<Icon className="text-56">money</Icon>
								<Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">
									Salary advance loan
								</Typography>
							</Link>
						</div>
					</FuseAnimateGroup>
				</div>
			</div>
		</div>
	);
}

export default LoanBanner;
