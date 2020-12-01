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
import useFMperformanceAppraisalDashboard from '../hooks/useFMperformanceAppraisalDashboard';
import BarChart from 'app/shared/charts/BarChart';

const FMperformanceAppraisalDashboard = () => {
  const { chartData } = useFMperformanceAppraisalDashboard();
  return (
    <SimplePage title='FINANCE MANAGER PERFORMANCE APPRAISAL MANAGEMENT DASHBOARD'>
      <main>
        <section className='flex flex-row justify-between items-center'>
          <div className="widget flex w-full sm:w-1/2 md:w-1/2 p-12">
            <CardWidget
              title='Total PIP in the Organization'
              count={20}
              color='green'
            />
          </div>
          <div className="widget flex w-full sm:w-1/2 md:w-1/2 p-12">
            <CardWidget
              title='Cost of PIP in the Organization'
              count={"90%"}
              color='orange'
            />
          </div>
        </section>

        <section>
          <Paper className='p-24 mt-24'>
            <h2 className="text-center mb-48"> Total Number of PIP awarded per department</h2>
            <Grid container spacing={3} alignItems='center' className="my-24">
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
            <BarChart data={chartData} height='80%' />

          </Paper>
        </section>
      </main>
    </SimplePage >
  );
};

export default FMperformanceAppraisalDashboard;