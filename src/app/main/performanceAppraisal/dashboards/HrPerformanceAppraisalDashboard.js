import withReducer from 'app/store/withReducer';
import SimplePage from 'app/shared/SimplePage';
import { makeStyles } from '@material-ui/core/styles';
import { Line } from 'react-chartjs-2';
import { Polar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import CardWidget from 'app/shared/widgets/CardWidget';
import CardWidgetWithChart from 'app/shared/widgets/CardWidgetWithChart';
import React, { Component, Fragment, useEffect, useState  } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import LineGraphChart from 'app/shared/charts/LineGraphChart';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Icon from '@material-ui/core/Icon';
import * as UtilActions from '../../../store/actions';
import { TextFieldFormsy } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { AppBar, Toolbar } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import AppraisalTable from './components/AppraisalTable';

const polarChartData = {
	datasets: [
		{
			data: [11, 16, 7, 3, 14],
			backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'],
			label: 'My dataset' // for legend
		}
	],
	labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue']
};

const doughnutChartData = {
	labels: ['Red', 'Green', 'Yellow'],
	datasets: [
		{
			data: [300, 50, 100],
			backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
			hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
		}
	]
};

const doughnutChartData2 = {
	labels: ['Red', 'Green', 'Yellow'],
	datasets: [
		{
			data: [300, 50, 100],
			backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
			hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
		}
	]
};

const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December" ];

const lineChartData = {
    labels: monthNames,
    datasets: [
        {
            label: 'Above Expectation',
            fill: false,			
            lineTension: 0.1,
            backgroundColor: '#2CD9C5',
            borderColor: '#2CD9C5',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#2CD9C5',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#2CD9C5',
            pointHoverBorderColor: '#2CD9C5',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            label: 'Meets Expectation',
            fill: false,			
            lineTension: 0.1,
            backgroundColor: '#2D99FF',
            borderColor: '#2D99FF',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#2D99FF',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#2D99FF',
            pointHoverBorderColor: '#2D99FF',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            label: 'Below Expectation',
            fill: false,			
            lineTension: 0.1,
            backgroundColor: '#FF6C40',
            borderColor: '#FF6C40',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#FF6C40',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#FF6C40',
            pointHoverBorderColor: '#FF6C40',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          label: 'Outstanding',
          fill: false,			
          lineTension: 0.1,
          backgroundColor: '#826AF9',
          borderColor: '#826AF9',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#826AF9',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#826AF9',
          pointHoverBorderColor: '#826AF9',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
};

const columns1 = [
  {
      id: 'name',
      field: 'name',
      align: 'left',
      disablePadding: false,
      label: 'Name',
      sort: true
  },
  {
      id: 'employeeEmail',
      field: 'employeeEmail',
      align: 'left',
      disablePadding: false,
      label: 'Email',
      sort: true
  },
  {
      id: 'entity',
      field: 'entity',
      newId: 'entityId',
      align: 'left',
      disablePadding: false,
      label: 'Entity',
      sort: true,
  },
  {
      id: 'department',
      field: 'department',
      newId: 'departmentId',
      align: 'left',
      disablePadding: false,
      label: 'Dept.',
      sort: true,
  },
  {
      align: 'left',
      disablePadding: false,
      label: 'Capital',
      field: 'capitalFund',
      sort: true,
  }
];

const columns2 = [
  {
      id: 'name',
      field: 'name',
      align: 'left',
      disablePadding: false,
      label: 'Name',
      sort: true
  },
  {
      id: 'employeeEmail',
      field: 'employeeEmail',
      align: 'left',
      disablePadding: false,
      label: 'Email',
      sort: true
  },
  {
      id: 'entity',
      field: 'entity',
      newId: 'entityId',
      align: 'left',
      disablePadding: false,
      label: 'Entity',
      sort: true,
  },
  {
      id: 'department',
      field: 'department',
      newId: 'departmentId',
      align: 'left',
      disablePadding: false,
      label: 'Dept.',
      sort: true,
  },
  {
      align: 'left',
      disablePadding: false,
      label: 'Capital',
      field: 'capitalFund',
      sort: true,
  }
];

const columns3 = [
  {
      id: 'name',
      field: 'name',
      align: 'left',
      disablePadding: false,
      label: 'Name',
      sort: true
  },
  {
      id: 'employeeEmail',
      field: 'employeeEmail',
      align: 'left',
      disablePadding: false,
      label: 'Email',
      sort: true
  },
  {
      id: 'entity',
      field: 'entity',
      newId: 'entityId',
      align: 'left',
      disablePadding: false,
      label: 'Entity',
      sort: true,
  },
  {
      id: 'department',
      field: 'department',
      newId: 'departmentId',
      align: 'left',
      disablePadding: false,
      label: 'Dept.',
      sort: true,
  },
  {
      align: 'left',
      disablePadding: false,
      label: 'Capital',
      field: 'capitalFund',
      sort: true,
  }
];

const columns4 = [
  {
      id: 'name',
      field: 'name',
      align: 'left',
      disablePadding: false,
      label: 'Name',
      sort: true
  },
  {
      id: 'employeeEmail',
      field: 'employeeEmail',
      align: 'left',
      disablePadding: false,
      label: 'Email',
      sort: true
  },
  {
      id: 'entity',
      field: 'entity',
      newId: 'entityId',
      align: 'left',
      disablePadding: false,
      label: 'Entity',
      sort: true,
  },
  {
      id: 'department',
      field: 'department',
      newId: 'departmentId',
      align: 'left',
      disablePadding: false,
      label: 'Dept.',
      sort: true,
  },
  {
      align: 'left',
      disablePadding: false,
      label: 'Capital',
      field: 'capitalFund',
      sort: true,
  }
];

const horizontalChartData1 = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    xAxes: [{ stacked: true }],
    yAxes: [{
        stacked: true,
        ticks: {
        beginAtZero: true,
        },
    }],
	datasets: [
		{
			label: 'First dataset',
			backgroundColor: '#26C0C7',
			borderColor: '#26C0C7',
			borderWidth: 1,
			hoverBackgroundColor: '#26C0C7',
			hoverBorderColor: '#26C0C7',
			data: [65, 59, 80, 81, 56, 55, 40]
		},
        {
			label: 'Second dataset',
			backgroundColor: '#FF0000',
			borderColor: '#FF0000',
			borderWidth: 1,
			hoverBackgroundColor: '#FF0000',
			hoverBorderColor: '#FF0000',
			data: [5, 19, 14, 31, 26, 15, 10]
		}
	]
};

const horizontalChartData2 = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: [65, 59, 80, 81, 56, 55, 40]
		}
	]
};

const horizontalChartData3 = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: [65, 59, 80, 81, 56, 55, 40]
		}
	]
};

const horizontalChartData4 = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: [65, 59, 80, 81, 56, 55, 40]
		}
	]
};

const HrPerformanceAppraisalDashboard = () => {
    const dispatch = useDispatch();
    const entities = [{id: 'all', entityName: 'all'}, ...((useSelector(({ entities }) => entities.entityList)) ? useSelector(({ entities }) => entities.entityList) : [])];
    const thisYear = (new Date).getFullYear();
    const thisYearString = (new Date).getFullYear().toString();
    const years = ['all', `${thisYear}`,`${thisYear - 1}`, `${thisYear - 2}`, `${thisYear - 3}`, `${thisYear - 4}`];
    // const [filter, setFilter] = useState('all');
    // const [filterNew, setFilterNew] = useState('all');
    const [lineYearfilter, setLineYearfilter] = useState(thisYearString);
    const [horiYearfilter1, setHoriYearfilter1] = useState(thisYearString);
    const [entityHoriFilter1, setEntityHoriFilter1] = useState('all');
    const [horiYearfilter2, setHoriYearfilter2] = useState(thisYearString);
    const [entityHoriFilter2, setEntityHoriFilter2] = useState('all');
    const [horiYearfilter3, setHoriYearfilter3] = useState(thisYearString);
    const [entityHoriFilter3, setEntityHoriFilter3] = useState('all');
    const [horiYearfilter4, setHoriYearfilter4] = useState(thisYearString);
    const [entityHoriFilter4, setEntityHoriFilter4] = useState('all');
    const [search, setSearch] = useState('');
    const [search2, setSearch2] = useState('');
    const [search3, setSearch3] = useState('');
    const [search4, setSearch4] = useState('');
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);


    useEffect(() => {
        dispatch(UtilActions.getEntities());
    }, []);

    const handleFilter = (event) => {
        setFilter(event.target.value);
        const value = entities.filter(e => {
            return e.entityName.toUpperCase() === event.target.value.toUpperCase();
        })
        const depts = value[0].department ?? [];
        let newDepts = [{departmentName: 'all'}];
        newDepts.push(...depts);
        setDepartments(newDepts);
    }

    const handleFilterNew = (event) => {
        setFilterNew(event.target.value);
        }
        
    const handleHoriYearFilter1 = (event) => {
        setHoriYearFilter1(event.target.value);
    }
    
    const handleEntityHoriFilter1 = (event) => {
        setEntityHoriFilter1(event.target.value);
    }

    const handleHoriYearFilter2 = (event) => {
        setHoriYearFilter2(event.target.value);
    }
    
    const handleEntityHoriFilter2 = (event) => {
        setEntityHoriFilter2(event.target.value);
    }

    const handleHoriYearFilter3 = (event) => {
        setHoriYearFilter3(event.target.value);
    }
    
    const handleEntityHoriFilter3 = (event) => {
        setEntityHoriFilter3(event.target.value);
    }

    const handleHoriYearFilter4 = (event) => {
        setHoriYearFilter4(event.target.value);
    }
    
    const handleEntityHoriFilter4 = (event) => {
        setEntityHoriFilter4(event.target.value);
    }
    
    const handleLineYearfilter = (event) => {
        setLineYearfilter(event.target.value);
    }

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    const handleSearch2 = (event) => {
        setSearch2(event.target.value);
    }

    const handleSearch3 = (event) => {
        setSearch3(event.target.value);
    }

    const handleSearch4 = (event) => {
        setSearch4(event.target.value);
    }

    const ClickOpen = (n) => {
        setSelectedRow(n);
        setOpen(true);
    };

    const ClickOpen2 = (n) => {
        setSelectedRow(n);
        setOpen2(true);
    };

    const ClickOpen3 = (n) => {
        setSelectedRow(n);
        setOpen3(true);
    };

    const ClickOpen4 = (n) => {
        setSelectedRow(n);
        setOpen4(true);
    };
    
    return (
        <SimplePage title='HR PERFORMANCE APPRAISAL DASHBOARD'>
        <main>
            <section>
            <div className="flex flex-row w-full justify-between ml-2 mr-13 mb-12 mt-12">
                <Paper className="w-full rounded-8 shadow-none border-1 flex flex-col justify-center items-center mr-10">
                    <div className="text-center pt-12">
                    <Typography className="text-16" color="textSecondary">
                        {"Total Completed Performance Appraisal"}
                    </Typography>
                    <Typography className="text-32">
                        {0}
                    </Typography>
                    </div>
                    <div className="text-center pb-12 pt-20">
                    <Typography className="text-16" color="textSecondary">
                        {"Total Pending Performance Appraisal"}
                    </Typography>
                    <Typography className="text-32">
                        {0}
                    </Typography>
                    </div>
                </Paper>
                <Paper className="w-full rounded-8 shadow-none border-1 flex flex-col mr-10">
                <div className="flex items-center justify-between px-8 h-64 border-b-1">
                <Grid container spacing={1} className="flex flex-row w-full justify-between">
                    <Grid item lg={3}>
                    <Typography className="text-16 whitespace-no-wrap font-semibold mt-8"></Typography>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={6}>
                        <SelectTextField value={thisYearString} label="Year" size='small' value={horiYearfilter1} onChange={ev => handleHoriYearFilter1(ev)}>
                            {years.map((year) => (<MenuItem key={year} value={year}> {year} </MenuItem>))}
                        </SelectTextField>
                    </Grid>
                    </Grid>
                </div>
                <div className="flex flex-col items-center w-full max-w-md">
                <Doughnut data={doughnutChartData} />
                </div>
                </Paper>
                <Paper className="w-full rounded-8 shadow-none border-1 flex flex-col mr-10">
                <div className="flex items-center justify-between px-8 h-64 border-b-1">
                <Grid container spacing={1} className="flex flex-row w-full justify-between">
                    <Grid item lg={6}>
                    <Typography className="text-10 whitespace-no-wrap font-semibold mt-8">Rating Distribution in Organization</Typography>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={6}>
                        <SelectTextField value={thisYearString} label="Year" size='small' value={horiYearfilter1} onChange={ev => handleHoriYearFilter1(ev)}>
                            {years.map((year) => (<MenuItem key={year} value={year}> {year} </MenuItem>))}
                        </SelectTextField>
                    </Grid>
                    </Grid>
                </div>
                <div className="flex flex-col items-center w-full max-w-md">
                <Polar data={polarChartData} />
                </div>
                </Paper>
                <Paper className="w-full rounded-8 shadow-none border-1 flex flex-col mr-10">
                <div className="flex items-center justify-between px-8 h-64 border-b-1">
                <Grid container spacing={1} className="flex flex-row w-full justify-between">
                    <Grid item lg={3}>
                    <Typography className="text-16 whitespace-no-wrap font-semibold mt-8"></Typography>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={6}>
                        <SelectTextField value={thisYearString} label="Year" size='small' value={horiYearfilter1} onChange={ev => handleHoriYearFilter1(ev)}>
                            {years.map((year) => (<MenuItem key={year} value={year}> {year} </MenuItem>))}
                        </SelectTextField>
                    </Grid>
                    </Grid>
                </div>
                <div className="flex flex-col items-center w-full max-w-md">
                    <Doughnut data={doughnutChartData2} />
                </div>
                </Paper>
            </div>
            </section>

            <section>
            <div className="flex flex-row w-full justify-between ml-2 mr-13 mb-12 mt-12">
            <Paper className="w-full rounded-8 shadow-none border-1 flex flex-col mr-10">
                <div className="flex items-center justify-between px-16 h-64 border-b-1">
                <Grid container spacing={1} className="flex flex-row w-full justify-between">
                    <Grid item lg={8}>
                    <Typography className="text-16 whitespace-no-wrap font-semibold mt-8">Number of KPO’s Not Updated Per Departments</Typography>
                    </Grid>
                    <Grid item lg={2} md={2} sm={4} xs={4}>
                        <SelectTextField value={thisYearString} label="Year" size='small' value={horiYearfilter1} onChange={ev => handleHoriYearFilter1(ev)}>
                            {years.map((year) => (<MenuItem key={year} value={year}> {year} </MenuItem>))}
                        </SelectTextField>
                    </Grid>
                    <Grid item lg={2}>
                    <SelectTextField
                        value={'all'}
                        size='small'
                        label='Entity'
                        value={entityHoriFilter1}
                        onChange={ev => handleEntityHoriFilter1(ev)}
                    >
                        {entities.map(({id, entityName}) => (
                        <MenuItem value={entityName} key={id}>
                        {entityName}
                    </MenuItem>
                        ))}
                    </SelectTextField>
                    </Grid>
                    </Grid>
                </div>
                <div className="flex flex-col items-center w-full max-w-md">
                    <HorizontalBar data={horizontalChartData1} />
                </div>
                </Paper>
                <Paper className="w-full rounded-8 shadow-none border-1 flex flex-col mr-10">
                <div className="flex items-center justify-between px-16 h-64 border-b-1">
                <Grid container spacing={1} className="flex flex-row w-full justify-between">
                    <Grid item lg={8}>
                    <Typography className="text-16 whitespace-no-wrap font-semibold mt-8">Number of KPO’s  Updated Per Departments</Typography>
                    </Grid>
                    <Grid item lg={2} md={2} sm={4} xs={4}>
                        <SelectTextField value={thisYearString} label="Year" size='small' value={horiYearfilter2} onChange={ev => handleHoriYearFilter2(ev)}>
                            {years.map((year) => (<MenuItem key={year} value={year}> {year} </MenuItem>))}
                        </SelectTextField>
                    </Grid>
                    <Grid item lg={2}>
                    <SelectTextField
                        value={'all'}
                        size='small'
                        label='Entity'
                        value={entityHoriFilter2}
                        onChange={ev => handleEntityHoriFilter2(ev)}
                    >
                        {entities.map(({id, entityName}) => (
                        <MenuItem value={entityName} key={id}>
                        {entityName}
                    </MenuItem>
                        ))}
                    </SelectTextField>
                    </Grid>
                    </Grid>
                </div>
                <div className="flex flex-col items-center w-full max-w-md">
                    <HorizontalBar data={horizontalChartData2} />
                </div>
                </Paper>
            </div>
            </section>

            <section>
            <div className="flex flex-row w-full justify-between ml-2 mr-13 mb-12 mt-12">
            <Paper className="w-full rounded-8 shadow-none border-1 flex flex-col mr-10">
                <div className="flex items-center justify-between px-16 h-64 border-b-1">
                <Grid container spacing={1} className="flex flex-row w-full justify-between">
                    <Grid item lg={8}>
                    <Typography className="text-16 whitespace-no-wrap font-semibold mt-8">No. of Pending Performance Appraisals Per Dept</Typography>
                    </Grid>
                    <Grid item lg={2} md={2} sm={4} xs={4}>
                        <SelectTextField value={thisYearString} label="Year" size='small' value={horiYearfilter3} onChange={ev => handleHoriYearFilter3(ev)}>
                            {years.map((year) => (<MenuItem key={year} value={year}> {year} </MenuItem>))}
                        </SelectTextField>
                    </Grid>
                    <Grid item lg={2}>
                    <SelectTextField
                        value={'all'}
                        size='small'
                        label='Entity'
                        value={entityHoriFilter3}
                        onChange={ev => handleEntityHoriFilter3(ev)}
                    >
                        {entities.map(({id, entityName}) => (
                        <MenuItem value={entityName} key={id}>
                        {entityName}
                    </MenuItem>
                        ))}
                    </SelectTextField>
                    </Grid>
                    </Grid>
                </div>
                <div className="flex flex-col items-center w-full max-w-md">
                    <HorizontalBar data={horizontalChartData3} />
                </div>
                </Paper>
                <Paper className="w-full rounded-8 shadow-none border-1 flex flex-col mr-10">
                <div className="flex items-center justify-between px-16 h-64 border-b-1">
                <Grid container spacing={1} className="flex flex-row w-full justify-between">
                    <Grid item lg={8}>
                    <Typography className="text-16 whitespace-no-wrap font-semibold mt-8">No. of Completed Performance Appraisals Per Dept</Typography>
                    </Grid>
                    <Grid item lg={2} md={2} sm={4} xs={4}>
                        <SelectTextField value={thisYearString} label="Year" size='small' value={horiYearfilter4} onChange={ev => handleHoriYearFilter4(ev)}>
                            {years.map((year) => (<MenuItem key={year} value={year}> {year} </MenuItem>))}
                        </SelectTextField>
                    </Grid>
                    <Grid item lg={2}>
                    <SelectTextField
                        value={'all'}
                        size='small'
                        label='Entity'
                        value={entityHoriFilter4}
                        onChange={ev => handleEntityHoriFilter4(ev)}
                    >
                        {entities.map(({id, entityName}) => (
                        <MenuItem value={entityName} key={id}>
                        {entityName}
                    </MenuItem>
                        ))}
                    </SelectTextField>
                    </Grid>
                    </Grid>
                </div>
                <div className="flex flex-col items-center w-full max-w-md">
                    <HorizontalBar data={horizontalChartData4} />
                </div>
                </Paper>
            </div>
            </section>

            <section>
            <div className="flex flex-row w-full justify-between ml-2 mr-13 mb-12 mt-12">
                <Paper className="w-full rounded-8 shadow-none border-1 flex flex-col mr-10">
                <div className="flex items-center justify-between px-16 h-64 border-b-1">
                    <Grid container spacing={1} className="flex flex-row w-full justify-between">
                    <Grid item lg={10}>
                        <Typography className="text-16 whitespace-no-wrap font-semibold mt-8">Overall Department Rating Distribution</Typography>
                    </Grid>
                    <Grid item lg={2} md={4} sm={4} xs={4}>
                        <SelectTextField value={thisYearString} label="Year" size='small' value={lineYearfilter} onChange={ev => handlelineYearFilter(ev)}>
                            {years.map((year) => (<MenuItem key={year} value={year}> {year} </MenuItem>))}
                        </SelectTextField>
                    </Grid>
                    </Grid>
                </div>
                <div className="flex w-full p-32">
                    <Line options={{ legend: { position: "right", labels: {boxWidth: 10,
                        fontSize: 12, padding: 10 } } }} height={220} width={860} data={lineChartData} />
                </div>
                </Paper>
            </div>
            </section>
            
            <section>
            <div className="flex flex-row w-full justify-between ml-2 mr-13 mb-12 mt-12">
                <Paper className="w-full sm:w-1/2 rounded-8 shadow-none border-1 flex flex-col mr-10">
                <div className="w-full p-20">
                        <Grid container spacing={1}>
                            <Grid className="flex w-full flex-row" style={{ marginTop: "10px" }}>
                                <Grid item lg={10} md={12} sm={12} xs={12} className="font-semibold text-16">
                                Employee List - Completed Peformance Appraisal
                                </Grid>
                            </Grid>
                            
                            <Grid container spacing={1} className="mt-6 mb-6" >
                                <Grid item lg={5} md={5} sm={5} xs={5}>
                                    <div className="flex items-center">
                                        <Paper className="flex items-center w-full px-8 py-4 rounded-8">
                                            <Icon color="action">search</Icon>
                                            <Input
                                                placeholder="Filter Employee List"
                                                className="flex flex-1 mx-8"
                                                disableUnderline
                                                fullWidth
                                                value={search}
                                                inputProps={{
                                                    'aria-label': 'Search'
                                                }}
                                                onChange={e => handleSearch(e)}
                                            />
                                        </Paper>
                                    </div>
                                </Grid>
                                {/* <Grid item lg={3} md={3} sm={4} xs={4}>
                                    <SelectTextField value={'all'} label="Entity" size='small' value={Entityfilter} onChange={ev => handleEntityFilter(ev)} >
                                        {entities.map(({id, entityName}) => (<MenuItem key={id} value={entityName}> {entityName} </MenuItem>))}
                                    </SelectTextField>
                                </Grid> */}
                                {/* <Grid item lg={2} md={3} sm={4} xs={4}>
                                    <SelectTextField value={'all'} label="Department" size='small' value={Departmentfilter} onChange={ev => handleDepartmentFilter(ev)}>
                                        {departments.map(({id, departmentName}) => (<MenuItem key={departmentName} value={departmentName}> {departmentName}</MenuItem>))}
                                    </SelectTextField>
                                </Grid> */}
                                {/* <Grid item lg={2} md={2} sm={4} xs={4}>
                                    <SelectTextField value={'all'} label="Year" size='small' value={Yearfilter} onChange={ev => handleYearFilter(ev)}>
                                        {years.map((year) => (<MenuItem key={year} value={year}> {year} </MenuItem>))}
                                    </SelectTextField>
                                </Grid>  */}
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <AppraisalTable data={[]} rows={columns1} handleClick={ClickOpen} type="default"/>
                    </div>
                </Paper>
                <Paper className="w-full sm:w-1/2 rounded-8 shadow-none border-1 flex flex-col mr-10">
                <div className="flex flex-wrap w-full p-20">
                        <Grid container spacing={1} >
                            <Grid className="flex w-full flex-row" style={{ marginTop: "10px" }}>
                                <Grid item lg={10} md={12} sm={12} xs={12} className="font-semibold text-16">
                                Employee List - Completed Peformance Appraisal
                                </Grid>
                            </Grid>
                            
                            <Grid container spacing={1} className="mt-6 mb-6" >
                                <Grid item lg={5} md={5} sm={5} xs={5}>
                                    <div className="flex items-center">
                                        <Paper className="flex items-center w-full px-8 py-4 rounded-8">
                                            <Icon color="action">search</Icon>
                                            <Input
                                                placeholder="Filter Employee List"
                                                className="flex flex-1 mx-8"
                                                disableUnderline
                                                fullWidth
                                                value={search2}
                                                inputProps={{
                                                    'aria-label': 'Search'
                                                }}
                                                onChange={e => handleSearch2(e)}
                                            />
                                        </Paper>
                                    </div>
                                </Grid>
                                {/* <Grid item lg={3} md={3} sm={4} xs={4}>
                                    <SelectTextField value={'all'} label="Entity" size='small' value={Entityfilter} onChange={ev => handleEntityFilter(ev)} >
                                        {entities.map(({id, entityName}) => (<MenuItem key={id} value={entityName}> {entityName} </MenuItem>))}
                                    </SelectTextField>
                                </Grid> */}
                                {/* <Grid item lg={2} md={3} sm={4} xs={4}>
                                    <SelectTextField value={'all'} label="Department" size='small' value={Departmentfilter} onChange={ev => handleDepartmentFilter(ev)}>
                                        {departments.map(({id, departmentName}) => (<MenuItem key={departmentName} value={departmentName}> {departmentName}</MenuItem>))}
                                    </SelectTextField>
                                </Grid> */}
                                {/* <Grid item lg={2} md={2} sm={4} xs={4}>
                                    <SelectTextField value={'all'} label="Year" size='small' value={Yearfilter} onChange={ev => handleYearFilter(ev)}>
                                        {years.map((year) => (<MenuItem key={year} value={year}> {year} </MenuItem>))}
                                    </SelectTextField>
                                </Grid>  */}
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <AppraisalTable data={[]} rows={columns2} handleClick={ClickOpen2} type="default"/>
                    </div>
                </Paper>
            </div>
            </section>

            <section>
            <div className="flex flex-row w-full justify-between ml-2 mr-13 mb-12 mt-12">
            <Paper className="w-full sm:w-1/2 rounded-8 shadow-none border-1 flex flex-col mr-10">
                <div className="flex flex-wrap w-full p-20">
                        <Grid container spacing={1} >
                            <Grid className="flex w-full flex-row" style={{ marginTop: "10px" }}>
                                <Grid item lg={10} md={12} sm={12} xs={12} className="font-semibold text-16">
                                Employee List - Completed Peformance Appraisal
                                </Grid>
                            </Grid>
                            
                            <Grid container spacing={1} className="mt-6 mb-6" >
                                <Grid item lg={5} md={5} sm={5} xs={5}>
                                    <div className="flex items-center">
                                        <Paper className="flex items-center w-full px-8 py-4 rounded-8">
                                            <Icon color="action">search</Icon>
                                            <Input
                                                placeholder="Filter Employee List"
                                                className="flex flex-1 mx-8"
                                                disableUnderline
                                                fullWidth
                                                value={search3}
                                                inputProps={{
                                                    'aria-label': 'Search'
                                                }}
                                                onChange={e => handleSearch3(e)}
                                            />
                                        </Paper>
                                    </div>
                                </Grid>
                                {/* <Grid item lg={3} md={3} sm={4} xs={4}>
                                    <SelectTextField value={'all'} label="Entity" size='small' value={Entityfilter} onChange={ev => handleEntityFilter(ev)} >
                                        {entities.map(({id, entityName}) => (<MenuItem key={id} value={entityName}> {entityName} </MenuItem>))}
                                    </SelectTextField>
                                </Grid> */}
                                {/* <Grid item lg={2} md={3} sm={4} xs={4}>
                                    <SelectTextField value={'all'} label="Department" size='small' value={Departmentfilter} onChange={ev => handleDepartmentFilter(ev)}>
                                        {departments.map(({id, departmentName}) => (<MenuItem key={departmentName} value={departmentName}> {departmentName}</MenuItem>))}
                                    </SelectTextField>
                                </Grid> */}
                                {/* <Grid item lg={2} md={2} sm={4} xs={4}>
                                    <SelectTextField value={'all'} label="Year" size='small' value={Yearfilter} onChange={ev => handleYearFilter(ev)}>
                                        {years.map((year) => (<MenuItem key={year} value={year}> {year} </MenuItem>))}
                                    </SelectTextField>
                                </Grid>  */}
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <AppraisalTable data={[]} rows={columns3} handleClick={ClickOpen3} type="default"/>
                    </div>
                </Paper>
            <Paper className="w-full sm:w-1/2 rounded-8 shadow-none border-1 flex flex-col mr-10">
                <div className="flex flex-wrap w-full p-20">
                        <Grid container spacing={1} >
                            <Grid className="flex w-full flex-row" style={{ marginTop: "10px" }}>
                                <Grid item lg={10} md={12} sm={12} xs={12} className="font-semibold text-16">
                                Employee List - Completed Peformance Appraisal
                                </Grid>
                            </Grid>
                            
                            <Grid container spacing={1} className="mt-6 mb-6" >
                                <Grid item lg={5} md={5} sm={5} xs={5}>
                                    <div className="flex items-center">
                                        <Paper className="flex items-center w-full px-8 py-4 rounded-8">
                                            <Icon color="action">search</Icon>
                                            <Input
                                                placeholder="Filter Employee List"
                                                className="flex flex-1 mx-8"
                                                disableUnderline
                                                fullWidth
                                                value={search4}
                                                inputProps={{
                                                    'aria-label': 'Search'
                                                }}
                                                onChange={e => handleSearch4(e)}
                                            />
                                        </Paper>
                                    </div>
                                </Grid>
                                {/* <Grid item lg={3} md={3} sm={4} xs={4}>
                                    <SelectTextField value={'all'} label="Entity" size='small' value={Entityfilter} onChange={ev => handleEntityFilter(ev)} >
                                        {entities.map(({id, entityName}) => (<MenuItem key={id} value={entityName}> {entityName} </MenuItem>))}
                                    </SelectTextField>
                                </Grid> */}
                                {/* <Grid item lg={2} md={3} sm={4} xs={4}>
                                    <SelectTextField value={'all'} label="Department" size='small' value={Departmentfilter} onChange={ev => handleDepartmentFilter(ev)}>
                                        {departments.map(({id, departmentName}) => (<MenuItem key={departmentName} value={departmentName}> {departmentName}</MenuItem>))}
                                    </SelectTextField>
                                </Grid> */}
                                {/* <Grid item lg={2} md={2} sm={4} xs={4}>
                                    <SelectTextField value={'all'} label="Year" size='small' value={Yearfilter} onChange={ev => handleYearFilter(ev)}>
                                        {years.map((year) => (<MenuItem key={year} value={year}> {year} </MenuItem>))}
                                    </SelectTextField>
                                </Grid>  */}
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <AppraisalTable data={[]} rows={columns4} handleClick={ClickOpen4} type="default"/>
                    </div>
                </Paper>
            </div>
            </section>
        </main>
        </SimplePage>
    );
    };

export default HrPerformanceAppraisalDashboard;