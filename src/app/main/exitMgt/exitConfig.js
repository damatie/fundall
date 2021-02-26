import React from 'react';

const AttendanceConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/exit/dashboard',
            component: React.lazy(() => import('./exitDash'))
        },
        {
            path: '/exit/home',
            component: React.lazy(() => import('./exitHome'))
        },
        // {
        //     path: '/exit/apply/',
        //     component: React.lazy(() => import('./newExitRequest'))
        // },
        {
            path: '/exit/list/department',
            component: React.lazy(() => import('./departmentDash'))
        },
        {
            path: '/exit/list/company',
            component: React.lazy(() => import('./companyDash'))
        }
    ]
};

export default AttendanceConfig;
