import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DoughnutChart from '../charts/DoughnutChart';

const CardWidgetWithChart = ({data}) => {
  return (
    <Paper className="w-full rounded-8 shadow-none border-1">
      <DoughnutChart data={data.data} percentage={data.percentage}/>
		</Paper>
  );
};

export default CardWidgetWithChart;