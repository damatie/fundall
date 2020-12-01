import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosRounded';
import IconButton from '@material-ui/core/IconButton';
import CardWidget from 'app/shared/widgets/CardWidget';
import useLMTrainingDashboard from './hooks/customHook';
import Widget from './components/widget';
import widgets from "./data.json";
import CardWidgetWithChart from 'app/shared/widgets/CardWidgetWithChart';
import SimplePage from 'app/shared/SimplePage';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import BarChart from 'app/shared/charts/BarChart';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import LineGraphChart from 'app/shared/charts/LineGraphChart';
import PieChart from 'app/shared/charts/PieChart';

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

function HRDashboard(props) {
  const dispatch = useDispatch();
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

  const classes = useStyles(props);
  const [search, setSearch] = useState('');

  const { doughnutChartData, employeeData } = useLMTrainingDashboard();

  return (
    <SimplePage title='HR LOAN DASHBOARD'>
      <div className="widget flex flex-wrap w-full">
        <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
          <CardWidget count={'₦1,000,000'} title={"Total Loan Amount Pending"} color="green" />
        </div>
        <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
          <CardWidget count={'₦500,000'} title={"Total Amount Issued"} color="yellow" />
        </div>
        <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12 items-align-end">
          <CardWidget count={15} title={"Pending Loans"} color="red" />
        </div>
        <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12 items-align-end">
          <CardWidget count={9} title={"Approved Loans"} color="red" />
        </div>
      </div>

      <Grid container spacing={2} className='m-10'>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Paper className='rounded-8 p-10 h-full'>
            <BarChart data={barChartData}/>
          </Paper>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12} className='h-full'>
          <Paper className='rounded-8 p-10 h-full'>
            <PieChart />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} className='m-10'>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Paper className='rounded-8 p-10 h-full'>
            <LineGraphChart />
          </Paper>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Paper className='rounded-8 p-10 h-full'>
            <BarChart data={barChartData}/>
          </Paper>
        </Grid>
      </Grid>
    </SimplePage>
  );
}

export default withReducer('personalTraining', null)(HRDashboard);
