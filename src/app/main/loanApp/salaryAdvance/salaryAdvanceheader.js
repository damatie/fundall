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

function SalaryAdvanceHeader(props) {
	const dispatch = useDispatch();
	// const searchText = useSelector(({ businessUnits }) => businessUnits.businessUnits.searchText);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
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

				<div className="flex flex-1 items-center justify-center px-12">
					<ThemeProvider theme={mainTheme}>
					</ThemeProvider>
				</div>
				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Button
						component={Link}
						to="/loan/request/salaryadvance_request/new"
						className="whitespace-no-wrap normal-case"
						variant="contained"
						color="secondary"
					>
						<span className="hidden sm:flex">Salary Advance Request</span>
						<span className="flex sm:hidden">Request</span>
					</Button>
				</FuseAnimate>
			</div>
	);
}

export default SalaryAdvanceHeader;
