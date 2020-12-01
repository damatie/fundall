import BarChart from 'app/shared/charts/BarChart';
import CardWidget from 'app/shared/widgets/CardWidget';
import CardWidgetWithChart from 'app/shared/widgets/CardWidgetWithChart';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import TableComponent from './components/TableComponent';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FusePageCarded from '@fuse/core/FusePageCarded';
import useHrLeaveDashboard from '../hooks/useHrLeaveDashboard';
import SimplePage from 'app/shared/SimplePage';

const HrLeaveMgtDashboard = () => {

  const { doughnutChartData, barChartData, employeeData } = useHrLeaveDashboard();
  return (
    <SimplePage title='HR LEAVE MANAGEMENT DASHBOARD'>
      <main>
        <section className='flex flex-row justify-between item-center'>
          <CardWidget
            count={20}
            title='Total Number of Employees On Leave In Org'
            color='blue'
          />
          <CardWidgetWithChart data={doughnutChartData} />
        </section>
        <Paper className='p-20'>

          <Typography variant="subtitle1" color="initial" className='mb-20 text-center font-semibold'>Total number of employees on leave per department</Typography>
            <section className='flex flex-row justify-between items-center w-2/4'>
              <SelectTextField label='Year' value={2020} size='small'>
                {[2019,2020].map(item => (
                  <MenuItem value={item}>
                    {item}
                  </MenuItem>
                ))}
              </SelectTextField>
              <SelectTextField label='Entity' value='SREL' size='small'>
                {['SREL', '5C', 'C-BIT'].map(item => (
                  <MenuItem value={item}>
                    {item}
                  </MenuItem>
                ))}
              </SelectTextField>
            </section>
          <BarChart data={barChartData} height='100%'/>
        </Paper>
        <TableComponent data={employeeData} />
      </main>
    </SimplePage>
  );
};

export default HrLeaveMgtDashboard;