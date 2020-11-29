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

const HrPerformanceAppraisalDashboard = () => {
  const { lineGraphData } = useLMperformanceAppraisalDashboard();
  return (
    <SimplePage title='LINE MANAGER PERFORMANCE APPRAISAL MANAGEMENT DASHBOARD'>
      <main>
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
            <Typography variant="subtitle1" color="initial" className='font-semibold text-center'>Total number of KPOs completed and not completed per department</Typography>
          </Grid>
        </Grid>
        <LineGraphChart data={lineGraphData.kpos}/>
      </Paper>
          
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
            <Typography variant="subtitle1" color="initial" className='font-semibold text-center'>Total number of performance appraisal completed and pending in the org</Typography>
          </Grid>
        </Grid>
        <LineGraphChart data={lineGraphData.performanceAppraisal}/>
      </Paper>
        </section>
      </main>
    </SimplePage>
  );
};

export default HrPerformanceAppraisalDashboard;