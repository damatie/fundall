import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <Bar
        data={data}
        options={{
          legend: {
            position: 'bottom'
          }
        }}
      />
    </div>
  );
}

export default BarChart;