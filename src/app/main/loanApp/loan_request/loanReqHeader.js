import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function LoanReqHeader(props) {
	const dispatch = useDispatch();
	// const searchText = useSelector(({ businessUnits }) => businessUnits.businessUnits.searchText);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<div>
					<FuseAnimate animation="transition.slideRightIn" delay={300}>
						<Typography
							className="normal-case flex items-center sm:mb-12"
							component={Link}
							role="button"
							to="/loan/request"
							color="inherit"
						>
							<Icon className="text-20">
							arrow_back
							</Icon>
							<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
								Loan Request
							</Typography>
						</Typography>
					</FuseAnimate>
				</div>
			</div>

			<div className="flex flex-1 items-center justify-center px-12">
				{/* <ThemeProvider theme={mainTheme}> */}
				<div>
					
				</div>
					{/* <FuseAnimate animation="transition.slideDownIn" delay={300}>
						<Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
							<Icon color="action">search</Icon>

							<Input
								placeholder="Search"
								className="flex flex-1 mx-8"
								disableUnderline
								fullWidth
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								onChange={ev => dispatch(Actions.setBusinesUnitsSearchText(ev))}
							/>
						</Paper>
					</FuseAnimate> */}
				{/* </ThemeProvider> */}
			</div>
			<FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Button
					component={Link}
					to="/loan/request/new"
					className="whitespace-no-wrap normal-case"
					variant="contained"
					color="secondary"
				>
					<span className="hidden sm:flex">Request Loan</span>
					<span className="flex sm:hidden">Request</span>
				</Button>
			</FuseAnimate>
		</div>
	);
}

export default LoanReqHeader;
