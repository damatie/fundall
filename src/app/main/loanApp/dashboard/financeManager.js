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


const barChartData2 = {
  labels: ['January', 'February', 'March', '.ril', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
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
	labels: ['Rejected Loan', 'Approved Loan',],
	datasets: [
		{
			data: [80, 50,],
			backgroundColor: ['#FF6384', '#36A2EB'],
			hoverBackgroundColor: ['#FF6384', '#36A2EB']
		}
	]
};

const lineChartData = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"],
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
			data: [65, 59, 80, 81, 56, 55, 40, 46, 35, 26, 26, 26, 26]
		},
		{
			label: "Unapproved Loans",
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
			data: [46, 35, 26, 26, 26, 26, 55, 79, 10, 61, 66, 45, 50]
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

function FinanceManager(props) {
  const dispatch = useDispatch();
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

  const classes = useStyles(props);
  const [search, setSearch] = useState('');

  const { doughnutChartData, employeeData } = useLMTrainingDashboard();

  return (
    <SimplePage title='FINANCE MANAGER LOAN DASHBOARD'>
      <div className="flex flex-row w-full justify-between">
          <CardWidget count={'₦1,000,000'} title={"Total Loan Amount Pending"} color="green" className="mr-6"/>
        {/* </div> */}
        {/* <div className="mr-6"> */}
        
          <CardWidget count={'₦500,000'} title={"Total Amount Issued"} color="yellow" />
        {/* </div>
        <div className="mr-6"> */}
        <CardWidget count={9} title={"Approved Loans"} color="green" />
          <CardWidget count={15} title={"Pending Loans"} color="red"/>
        {/* </div> */}
        {/* <div className="widget flex w-full sm:w-1/2 md:w-1/4 m-5 items-align-end"> */}
          
        {/* </div> */}
      </div>

      <Grid container spacing={2} className='my-10'>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Paper className='rounded-8 h-full p-20'>
          <Typography variant="subtitle1" color="initial" className='mb-20 text-center font-semibold'>Department With the Higest Number of Loan Application</Typography>
            <section className='flex flex-row justify-between items-center w-2/4'>
              <SelectTextField label='Year' value={2020} size='small'>
                {[2019,2020].map(item => (
                  <MenuItem value={item}>
                    {item}
                  </MenuItem>
                ))}
              </SelectTextField>
              <SelectTextField label='Entity' value='SPRG' size='small'>
                {['SPRG', '5C', 'Cbit'].map(item => (
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
              <SelectTextField label='Entity' value='SPRG' size='small'>
                {['SPRG', '5C', 'Cbit'].map(item => (
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

      <Grid container spacing={2} className='my-10'>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Paper className='rounded-8 p-20 h-full'>
          <Typography variant="subtitle1" color="initial" className='mb-20 text-center font-semibold'>Number of Approved & Unapproved Loans Per Year for all Departments</Typography>
            <section className='flex flex-row justify-between items-center w-3/4'>
              <SelectTextField label='Year' value={2020} size='small'>
                {[2019,2020].map(item => (
                  <MenuItem value={item}>
                    {item}
                  </MenuItem>
                ))}
              </SelectTextField>
              <SelectTextField label='Entity' value='SPRG' size='small'>
                {['SPRG', '5C', 'Cbit'].map(item => (
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
            <LineGraphChart customData={lineChartData}/>
          </Paper>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Paper className='rounded-8 p-20 h-full'>
          <Typography variant="subtitle1" color="initial" className='mb-20 text-center font-semibold'>Loan Application per Month</Typography>
            <section className='flex flex-row justify-between items-center w-3/4'>
              <SelectTextField label='Year' value={2020} size='small'>
                {[2019,2020].map(item => (
                  <MenuItem value={item}>
                    {item}
                  </MenuItem>
                ))}
              </SelectTextField>
              <SelectTextField label='Entity' value='SPRG' size='small'>
                {['SPRG', '5C', 'Cbit'].map(item => (
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
            <BarChart data={barChartData2}/>
          </Paper>
        </Grid>
      </Grid>
    </SimplePage>
  );
}

export default withReducer('personalTraining', null)(FinanceManager);
