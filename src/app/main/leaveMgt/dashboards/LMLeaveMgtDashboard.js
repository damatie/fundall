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
import useLMLeaveDashboard from '../hooks/useLMLeaveDashboard';
import SimplePage from 'app/shared/SimplePage';

const LMLeaveMgtDashboard = () => {

  const { doughnutChartData, barChartData, employeeData } = useLMLeaveDashboard();
  return (
    <SimplePage title='LINE MANAGER LEAVE MANAGEMENT DASHBOARD'>
<main>
      <section className='flex flex-row justify-between item-center'>
        <CardWidget
          count={20}
          title='Total Number Of Employees On Leave'
          color='blue'
        />
        <CardWidget
          count={20}
          title='Total Number Of Pending Leave'
          color='yellow'
        />
        <CardWidgetWithChart data={doughnutChartData} customStyle='h-full'/>
      </section>
      <TableComponent data={employeeData} lineManager/>
    </main>
    </SimplePage>
  );
};

export default LMLeaveMgtDashboard;