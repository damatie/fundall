import SimplePage from 'app/shared/SimplePage';
import CardWidget from 'app/shared/widgets/CardWidget';
import CardWidgetWithChart from 'app/shared/widgets/CardWidgetWithChart';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import LineGraphChart from 'app/shared/charts/LineGraphChart';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useLMperformanceAppraisalDashboard from '../hooks/useLMperformanceDashboard';


const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"],
  datasets: [
    {
      label: "Complete Performance Appraisals",
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
      data: [46, 35, 26, 26, 26, 26, 55, 79, 10, 61, 66, 45, 50]
    },
    {
      label: "Incomplete Performance Appraisals",
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
      data: [65, 59, 80, 81, 56, 55, 40, 46, 35, 26, 26, 26, 26]
    }
  ]
};

const HrPerformanceAppraisalDashboard = () => {
  const { lineGraphData } = useLMperformanceAppraisalDashboard();
  return (
    <SimplePage title='LINE MANAGER PERFORMANCE APPRAISAL MANAGEMENT DASHBOARD'>
      <main>
        <section>

          <Paper className='p-20 mt-24'>
            <div className="w-full p-12">
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
                    value={2020}
                    size='small'
                    label='Entity'
                  >
                    {[2019, 2020].map(item => (
                      <MenuItem value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </SelectTextField>
                </Grid>
                <Grid item lg={2} >
                  <SelectTextField
                    value={2020}
                    size='small'
                    label='Department'
                  >
                    {[2019, 2020].map(item => (
                      <MenuItem value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </SelectTextField>
                </Grid>
              </Grid>
              <LineGraphChart data={lineGraphData.kpos} />
            </div>
          </Paper>

          <Paper className='p-20 mt-24'>
            <div className="w-full p-12 mt-24">
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
                    value={2020}
                    size='small'
                    label='Entity'
                  >
                    {[2019, 2020].map(item => (
                      <MenuItem value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </SelectTextField>
                </Grid>
                <Grid item lg={2} >
                  <SelectTextField
                    value={2020}
                    size='small'
                    label='Department'
                  >
                    {[2019, 2020].map(item => (
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

        </section >
      </main >
    </SimplePage >
  );
};

export default HrPerformanceAppraisalDashboard;