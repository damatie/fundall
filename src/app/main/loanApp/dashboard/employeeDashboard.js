import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React from 'react';
import { useSelector } from 'react-redux';
import useLMTrainingDashboard from './hooks/customHook';
import SimplePage from 'app/shared/SimplePage';
import BarChart from 'app/shared/charts/BarChart';
import EnhancedTable from 'app/shared/table/EnhancedTable';
import Paper from '@material-ui/core/Paper';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';


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

const barChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Months',
      data: [5, 4, 3, 5, 2, 3, 2, 4, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

function EmployeeDashboard(props) {
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

  const classes = useStyles(props);

  const { doughnutChartData } = useLMTrainingDashboard();

  const columns = React.useMemo(
    () => [
      {
        Header: 'Requested amount',
        accessor: 'requestedAmount',
        // className: 'font-bold',
        sortable: true
      },
      {
        Header: 'Loan duration',
        accessor: 'loanDuration',
        sortable: true
      },
      {
        Header: 'Date applied',
        accessor: 'dateApplied',
        sortable: true
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row: { values: { status } } }) => {
          return <Status status={status} />
        },
        className: 'justify-center',
        // width: 64,
        sortable: false
      },
    ],
  );

  return (
    <SimplePage title='EMPLOYEE LOAN DASHBOARD'>
      <Paper className='p-20 mx-10 mb-20 rounded-8 h-sm'>

        <Grid container spacing={1} alignItems='center'>
          <Grid item lg={1}>
            <SelectTextField
              value={2020}
              size='small'
              label='Year'
            >
              {[2019, 2020].map(item => (
                <MenuItem value={item}>
                  {item}
                </MenuItem>
              ))}
            </SelectTextField>
          </Grid>
          <Grid item lg={11}>
            <Typography variant="h6" color="initial" className='font-semibold text-center'>Number of Loans Taken per Year.</Typography>
          </Grid>
        </Grid>
        <BarChart data={barChartData} height='80%'/>
      </Paper>
      <Paper className='p-20 mx-10 rounded-8'>
      <Grid container spacing={1} alignItems='center'>
          <Grid item lg={1}>
            <SelectTextField
              value={'all'}
              size='small'
              label='Loan Status'
            >
              {['all', 'Approved', 'Pending', 'Rejected'].map(item => (
                <MenuItem value={item}>
                  {item}
                </MenuItem>
              ))}
            </SelectTextField>
          </Grid>
          <Grid item lg={11}>
            <Typography variant="h6" color="initial" className='font-semibold text-center'>Loans status</Typography>
          </Grid>
        </Grid>
        <EnhancedTable
          columns={columns}
          data={data}
        />
      </Paper>
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

export default withReducer('personalTraining', null)(EmployeeDashboard);
