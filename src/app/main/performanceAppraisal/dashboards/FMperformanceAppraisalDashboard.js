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
          <CardWidget
            title='Total number of PIP awarded'
            count={20}
            color='green'
          />
          <CardWidget
            title='Total cost of PIP awarded'
            count={10}
            color='yellow'
          />
        </section>
        <section>
        <Paper className='p-20'>
        
        <Grid container spacing={1} alignItems='center'>
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
          <Grid item lg={10}>
            <Typography variant="subtitle1" color="initial" className='font-semibold text-center'>Total number of PIP awarded per department</Typography>
          </Grid>
        </Grid>
        <BarChart data={chartData} />
      </Paper>
          
        </section>
      </main>
    </SimplePage>
  );
};

export default FMperformanceAppraisalDashboard;