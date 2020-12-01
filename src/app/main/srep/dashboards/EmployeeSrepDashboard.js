import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React from 'react';
import { useSelector } from 'react-redux';
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
    sn: 1,
    name: 'Adams Smith',
    relationship: 'Son',
    fund: '₦200,000',
    status: 'pending'
  },
  {
    sn: 2,
    name: 'Joy Smith',
    relationship: 'Daughter',
    fund: '₦100,000',
    status: 'approved'
  },
  {
    sn: 3,
    name: 'John Doe',
    relationship: 'brother',
    fund: '₦200,000',
    status: 'rejected'
  },
  {
    sn: 4,
    name: 'Adams Smith',
    relationship: 'Son',
    fund: '₦200,000',
    status: 'pending'
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

function EmployeeSrepDashboard(props) {

  const columns = React.useMemo(
    () => [
      {
        Header: 'S/N',
        accessor: 'sn',
        // className: 'font-bold',
        sortable: true
      },
      {
        Header: 'Name of Beneficiary',
        accessor: 'name',
        sortable: true
      },
      {
        Header: 'Relationship to Employee',
        accessor: 'relationship',
        sortable: true
      },
      {
        Header: 'Capital Fund to be Contributed',
        accessor: 'fund',
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
    <SimplePage title='EMPLOYEE SREP DASHBOARD'>
      <Paper className='p-20 mx-10 rounded-8'>
      <Grid container spacing={1} alignItems='center'>
          <Grid item lg={2}>
            <SelectTextField
              value={'all'}
              size='small'
              label='SREP applications status'
            >
              {['all', 'Approved', 'Pending', 'Rejected'].map(item => (
                <MenuItem value={item}>
                  {item}
                </MenuItem>
              ))}
            </SelectTextField>
          </Grid>
          <Grid item lg={10}>
            <Typography variant="subtitle1" color="initial" className='font-semibold text-center'>Status of SREP Applications</Typography>
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

export default withReducer('personalTraining', null)(EmployeeSrepDashboard);
