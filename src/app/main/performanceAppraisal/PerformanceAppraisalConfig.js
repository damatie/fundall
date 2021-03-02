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
		{
			path: '/performance_appraisal/kpoList/details/:id/kpoContent/:kpoContentId',
			component: React.lazy(() => import('./KPOlist/EmployeeKpoContentDetails'))
		},
		{
			path: '/performance_appraisal/kpoList/details/:id',
			component: React.lazy(() => import('./KPOlist/EmployeeKpoDetails'))
		},
		{
			path: '/performance_appraisal/kpo/review/details/:id/kpoContent/:kpoContentId',
			component: React.lazy(() => import('./KPOlist/EmployeeKpoContentDetails'))
		},
		{
			path: '/performance_appraisal/kpo/review/details/:id',
			component: React.lazy(() => import('./KPOlist/EmployeeKpoDetails'))
		},
		{
			path: '/performance_appraisal/kpo/review',
			component: React.lazy(() => import('./KPOlist/EmployeeKpoReview'))
		},
		{
			path: '/performance_appraisal/kpoList',
			component: React.lazy(() => import('./KPOlist/EmployeeKpoList'))
		},
		
	]
};

export default PerformanceAppraisalConfig;
