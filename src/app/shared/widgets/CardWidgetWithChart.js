import React from 'react';
import Paper from '@material-ui/core/Paper';
import DoughnutChart from '../charts/DoughnutChart';

const CardWidgetWithChart = ({ data, customStyle, title, doughnutStyle }) => {
  // console.log(doughnutStyle)
  return (
    <Paper className={`w-full rounded-8 shadow-none border-1 ${customStyle}`}>
      <h2 className={"my-24 text-center"}>{title}</h2>
      <DoughnutChart data={data.data} percentage={data.percentage} doughnutStyle={doughnutStyle} />
    </Paper>
  );
};

export default CardWidgetWithChart;