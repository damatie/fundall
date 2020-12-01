import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"],
	datasets: [
		{
			label: "Completed KPO's",
			fill: false,
			lineTension: 0.1,
			backgroundColor: 'rgba(75,192,192,0.4)',
			borderColor: '#2196F3',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: 'rgba(75,192,192,1)',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [65, 59, 80, 81, 56, 55, 40, 46, 35, 26, 26, 26, 26]
		},
		{
			label: "Uncompleted KPO's",
			fill: false,
			lineTension: 0.1,
			backgroundColor: 'rgba(15,191,192,0.4)',
			borderColor: 'tomato',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'round',
			pointBorderColor: 'rgba(75,192,192,1)',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [46, 35, 26, 26, 26, 26, 55, 79, 10, 61, 66, 45, 50]
		}
	]
};

const LineGraphChart = ({ customData, height }) => {
	return (
		// <div className="flex flex-col items-center w-full h-full">
			<Line
				data={customData ? customData : data}
				// width={'100%'}
				height={height}
				options={{
					legend: {
						position: 'bottom'
					}
				}}
			/>
		// </div>
	);
}

export default LineGraphChart;