import React from 'react';
import { Typography, Button } from '@material-ui/core';
import RightArrowIcon from '@material-ui/icons/ArrowRightAlt';

// Components
import Card from './card';

const colors = ['#5351FB', '#00CD98', '#F6B900', '#FF6C40', '#A58382', '#58CDFF', '#C4C4C4', '#BD78E3', '#FF7E7E'];

const categories = [
	{
		title: 'work',
		duration: '8 days'
	},
	{
		title: 'field/offshore',
		duration: '8 days'
	},
	{
		title: 'training',
		duration: '8 days'
	},
	{
		title: 'work travel',
		duration: '8 days'
	},
	{
		title: 'avg clock-in-time',
		duration: '8:10 am'
	}
];

const AttendanceSummary = () => {
	return (
		<div>
			<Card>
				<Typography variant="h5" className="font-bold mb-20">
					Attendance Summary For Your Department
				</Typography>

				<div className="flex items-start">
					<img src="/assets/images/avatars/attendance-summary.png" alt="avatar" className="mr-20" />
					<div className="mt-20">
						<Typography className="font-bold mb-20">Based on activities for the last months</Typography>

						<div className="flex flex-wrap mb-36">
							{categories.map((category, index) => (
								<div className={`flex flex-auto items-center ${index !== categories.length && 'mr-20'}`}>
									<div className="flex items-start">
										<div
											style={{
												height: 10,
												width: 10,
												borderRadius: '50%',
												backgroundColor: colors[index],
												marginRight: '1rem',
												marginTop: '.5rem'
											}}
										/>

										<div>
											<Typography className="capitalize mb-5">{category.title}</Typography>
											<Typography variant="h6" className="font-bold">
												{category.duration}
											</Typography>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="flex justify-end w-full">
							<Button variant="contained" color="primary" endIcon={<RightArrowIcon />}>
								Go to full report
							</Button>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default AttendanceSummary;
