import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({data}) => {
    return (
      <div className="flex flex-col items-center h-full">
        <Bar
          data={data}
          width={100}
          height={'30%'}
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