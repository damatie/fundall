import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
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
import { months } from 'data';

const barChartData1 = {
  labels: ['Finance', 'HR', 'IT', 'Finance', 'Production', 'Research and Development', 'Purchasing', 'Marketing ', 'Purchasing', 'Production', 'Finance', 'Finance'],
  datasets: [
    {
      label: 'Departments',
      data: [20, 19, 15, 14, 14, 13, 12, 11, 8, 7, 6, 5],
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

const pieChartData = {
	labels: ['Reject Loan', 'Approved Loan',],
	datasets: [
		{
			data: [80, 50,],
			backgroundColor: ['#FF6384', '#36A2EB'],
			hoverBackgroundColor: ['#FF6384', '#36A2EB']
		}
	]
};

const lineChartData = {
	labels: ['Finance', 'HR', 'IT', 'Finance', 'Production', 'Research and Development', 'Purchasing', 'Marketing ', 'Purchasing', 'Production', 'Finance', 'Finance'],
	datasets: [
		{
			label: "Approved Loans",
			fill: false,
			lineTension: 0.1,
			backgroundColor: 'rgba(75,192,192,0.4)',
			borderColor: '#2196F3',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: 'rgba(75,192,192,1)',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [65, 59, 80, 81, 56, 55, 40, 46, 35, 26, 26, 26]
		},
		{
			label: "Unapproved Loans",
			fill: false,
			lineTension: 0.1,
			backgroundColor: 'rgba(247, 224, 20, 0.06)',
			borderColor: 'rgba(247, 224, 20, 1)',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'round',
			pointBorderColor: 'rgba(75,192,192,1)',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [46, 35, 26, 26, 26, 26, 55, 79, 10, 61, 66, 45]
    },
    {
			label: "Rejected Loans",
			fill: false,
			lineTension: 0.1,
			backgroundColor: 'rgba(15,191,192,0.4)',
			borderColor: 'tomato',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'round',
			pointBorderColor: 'rgba(75,192,192,1)',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [51, 15, 36, 16, 46, 16, 50, 80, 30, 64, 51, 58]
		}
	]
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

function LMDashboard(props) {
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

    const classes = useStyles(props);

    const { doughnutChartData } = useLMTrainingDashboard();

    const goToPreviousRoute = () => {
        window.location = '/training/personal';
    }
    
    return (
      <SimplePage title='LINE MANAGER LOAN DASHBOARD'>
        <div className="flex flex-row w-full justify-between">
        <CardWidget count={9} title={"Approved Loans"} color="green" />
        <CardWidget count={15} title={"Pending Loans"} color="red"/>
        </div>

        <Grid container spacing={2} className='my-10'>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Paper className='rounded-8 h-full p-20'>
          <Typography variant="subtitle1" color="initial" className='mb-20 text-center font-semibold'>Loan Application per Department</Typography>
            <section className='flex flex-row justify-between items-center w-2/4'>
              <SelectTextField label='Year' value={2020} size='small'>
                {[2019,2020].map(item => (
                  <MenuItem value={item}>
                    {item}
                  </MenuItem>
                ))}
              </SelectTextField>
              <SelectTextField label='Month' value='December' size='small'>
                {months.map(item => (
                  <MenuItem value={item}>
                    {item}
                  </MenuItem>
                ))}
              </SelectTextField>
            </section>
            
            <BarChart data={barChartData1}/>
          </Paper>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12} className='h-full'>
          <Paper className='rounded-8 p-20 h-full'>
          <Typography variant="subtitle1" color="initial" className='mb-20 text-center font-semibold'>Reject Loans & Approved Loans</Typography>
            <section className='flex flex-row justify-between items-center w-full'>
              <SelectTextField label='Year' value={2020} size='small'>
                {[2019,2020].map(item => (
                  <MenuItem value={item}>
                    {item}
                  </MenuItem>
                ))}
              </SelectTextField>
              <SelectTextField label='Department' value='HR' size='small'>
                {['IT', 'HR', 'Finance'].map(item => (
                  <MenuItem value={item}>
                    {item}
                  </MenuItem>
                ))}
              </SelectTextField>
            </section>
            <section className='h-full flex flex-row justify-center items-center'>
            <PieChart data={pieChartData}/>
            </section>
            
          </Paper>
        </Grid>
      </Grid>
      <Paper className='rounded-8 p-20 h-full'>
          <Typography variant="subtitle1" color="initial" className='mb-20 text-center font-semibold'>Number of Approved, Unapproved & Rejected Loans Per Year for all Departments</Typography>
            <section className='flex flex-row justify-between items-center w-2/4'>
              <SelectTextField label='Year' value={2020} size='small'>
                {[2019,2020].map(item => (
                  <MenuItem value={item}>
                    {item}
                  </MenuItem>
                ))}
              </SelectTextField>
              <SelectTextField label='Months' value='December' size='small'>
                {months.map(item => (
                  <MenuItem value={item}>
                    {item}
                  </MenuItem>
                ))}
              </SelectTextField>
            </section>
            <LineGraphChart customData={lineChartData} height='80%'/>
          </Paper>
      </SimplePage>
    );
}

export default withReducer('personalTraining', null)(LMDashboard);