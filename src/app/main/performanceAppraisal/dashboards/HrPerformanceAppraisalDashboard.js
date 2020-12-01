import SimplePage from 'app/shared/SimplePage';
import CardWidget from 'app/shared/widgets/CardWidget';
import CardWidgetWithChart from 'app/shared/widgets/CardWidgetWithChart';
import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import LineGraphChart from 'app/shared/charts/LineGraphChart';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useHRperformanceAppraisalDashboard from '../hooks/useHRperformanceAppraisalDashboard';

// test data, must be removed
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Completed Performance Appraisal',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#2196F3',
      borderColor: '#2196F3',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#2196F3',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#2196F3',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: 'Pending Performance Appraisal',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'tomato',
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
      data: [55, 79, 10, 61, 66, 45, 50]
    }
  ]
};

const HrPerformanceAppraisalDashboard = () => {
  const { lineGraphData } = useHRperformanceAppraisalDashboard();
  return (
    <SimplePage title='HR PERFORMANCE APPRAISAL MANAGEMENT DASHBOARD'>
      <main>
        <section className='flex flex-row justify-between items-center'>
          <div className="widget flex w-full sm:w-1/2 md:w-1/3 p-12">
            <CardWidget
              title='Performance appraisals completed'
              count={20}
              color='green'
            />
          </div>
          <div className="widget flex w-full sm:w-1/2 md:w-1/3 p-12">
            <CardWidget
              title='Performance appraisals pending'
              count={10}
              color='orange'
            />
          </div>
          <div className="widget flex w-full sm:w-1/2 md:w-1/3 p-12">
            <CardWidget
              title='Average Performance score'
              count={`${20}%`}
              color='blue'
            />
          </div>
        </section>

        <section>
          <Paper className='p-20 mt-24'>

            <div className="w-full p-12 mb-24 m-10">
              <Grid container spacing={3} alignItems='center' className="mb-24">
                <Grid item lg={2}>
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
                <Grid item lg={2}>
                  <SelectTextField
                    value={"SREP"}
                    size='small'
                    label='Entity'
                  >
                    {["5Cee", "SpringRock", "HRIS", "SREP"].map(item => (
                      <MenuItem value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </SelectTextField>
                </Grid>
                <Grid item lg={2} >
                  <SelectTextField
                    value={"HRIS"}
                    size='small'
                    label='Department'
                  >
                    {["5Cee", "SpringRock", "HRIS", "SREP", "Software"].map(item => (
                      <MenuItem value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </SelectTextField>
                </Grid>
              </Grid>
              <LineGraphChart data={lineGraphData.kpos} />
            </div>

            <div className="w-full p-12 mt-24 m-10">
              <Grid container spacing={3} alignItems='center' className="mb-24">
                <Grid item lg={2}>
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
                <Grid item lg={2}>
                  <SelectTextField
                    value={"SpringRock"}
                    size='small'
                    label='Entity'
                  >
                    {["5Cee", "SpringRock", "HRIS", "SREP"].map(item => (
                      <MenuItem value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </SelectTextField>
                </Grid>
                <Grid item lg={2} >
                  <SelectTextField
                    value={"Software"}
                    size='small'
                    label='Department'
                  >
                    {["5Cee", "SpringRock", "HRIS", "SREP", "Software"].map(item => (
                      <MenuItem value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </SelectTextField>
                </Grid>
              </Grid>
              <LineGraphChart customData={data} />
            </div>
          </Paper>
        </section>
      </main>
    </SimplePage>
  );
};

export default HrPerformanceAppraisalDashboard;