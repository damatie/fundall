import React from 'react';

const PerformanceAppraisalConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/hr/performance_appraisal/dashboard',
			component: React.lazy(() => import('./dashboards/HrPerformanceAppraisalDashboard'))
    },
    {
			path: '/line_manager/performance_appraisal/dashboard',
			component: React.lazy(() => import('./dashboards/LMperformanceAppraisalDashboard'))
    },
    {
			path: '/finance_manager/performance_appraisal/dashboard',
			component: React.lazy(() => import('./dashboards/FMperformanceAppraisalDashboard'))
		},
		{
			path: '/hr/performance_appraisal/kpoCategory',
			component: React.lazy(() => import('./KPOcategoryList/KPOcategoryList'))
		},
	]
};

export default PerformanceAppraisalConfig;
