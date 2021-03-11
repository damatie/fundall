import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React from 'react';
import { useSelector } from 'react-redux';
import SimplePage from 'app/shared/SimplePage';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import EnrollmentListTable from './components/EnrollmentListTable';


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

const data = [
  {
    requestedAmount: '₦200,000',
    loanDuration: '3 Months',
    dateApplied: '23 june 2020',
    status: 'Approved'
  },
  {
    requestedAmount: '₦100,000',
    loanDuration: '2 Months',
    dateApplied: '23 june 2019',
    status: 'Rejected'
  },
  {
    requestedAmount: '₦500,000',
    loanDuration: '3 Months',
    dateApplied: '23 may 2020',
    status: 'Pending'
  },
  {
    requestedAmount: '₦240,000',
    loanDuration: '3 Months',
    dateApplied: '23 june 2020',
    status: 'Approved'
  },
];


const employees = [];
    const entities = [];
    const departments = [];
    const years = ["2018", "2019", "2020"];
	
function handleChangeRange(ev) {
	setCurrentRange(ev.target.value);
}
function FinanceSrepDashboard(props) {

  return (
    <SimplePage title='FINANCE SREP DASHBOARD'>
      <div className="flex flex-row w-full justify-between">
        <Paper className="w-full rounded-8 shadow-none border-1 flex flex-col justify-center items-center mr-6">
			<div className="text-center pt-12">
				<Typography className="text-16" color="textSecondary">
					{"Number Of  Approved Applications"}
				</Typography>
				<Typography className="text-32" >
					{"9,000"}
				</Typography>
			</div>
			<div className="pt-20"></div>
		</Paper>
        <Paper className="w-full rounded-8 shadow-none border-1 flex flex-col justify-center items-center mr-6">
			<div className="text-center pt-12">
				<Typography className="text-16" color="textSecondary">
					{"Number of SREP Pending Applications"}
				</Typography>
				<Typography className="text-32" >
					{"13,000"}
				</Typography>
			</div>
			<div className="pt-20"></div>
		</Paper>
        </div>
        <div className="flex w-full pt-12 pr-6">
            <EnrollmentListTable data={{ employees, entities, departments, years, }} />
	    </div>
    </SimplePage>
  );
}

const Status = ({ status }) => {
  switch (status.toUpperCase()) {
    case 'APPROVED':
      return (
        <Typography className={'bg-green text-white inline text-11 font-500 px-8 py-4 rounded-4'}>{status}</Typography>
      );
    case 'PENDING':
      return (
        <Typography className={'bg-yellow text-white inline text-11 font-500 px-8 py-4 rounded-4'}>{status}</Typography>
      );
    case 'REJECTED':
      return (
        <Typography className={'bg-red text-white inline text-11 font-500 px-8 py-4 rounded-4'}>{status}</Typography>
      );
    default: {
      return status;
    }
  }
};

export default withReducer('personalTraining', null)(FinanceSrepDashboard);
