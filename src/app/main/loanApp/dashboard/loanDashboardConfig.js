import React from 'react';

const LoanDashboardConfig = {
    settings: {
        layout: {}
    },
    routes: [
        {
            path: '/employee/loan_mgt/',
            component: React.lazy(() => import('./employeeDashboard'))
        },
        {
            path: '/hr/loan_mgt/',
            component: React.lazy(() => import('./hrDashboard'))
        },
        {
            path: '/line_manager/loan_mgt/',
            component: React.lazy(() => import('./lineManagerDashboard'))
        },
        {
            path: '/finance_manager/loan_mgt/',
            component: React.lazy(() => import('./financeManager'))
        },
    ]
}

export default LoanDashboardConfig;