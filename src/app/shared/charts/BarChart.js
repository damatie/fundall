import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data, height }) => {
  return (
    // <div className="flex flex-col justify-center items-center h-full w-full">
      <Bar
        data={data}
        height={height}
        options={{
          legend: {
            position: 'top'
          }
        }}
      />
    // </div>
  );
}

export default BarChart;