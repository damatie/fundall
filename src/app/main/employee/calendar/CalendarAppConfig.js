import React from 'react';

const CalendarAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/employee/request_leave',
			component: React.lazy(() => import('./CalendarApp'))
		}
	]
};

export default CalendarAppConfig;
