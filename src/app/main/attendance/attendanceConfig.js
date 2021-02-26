import React from 'react';

const AttendanceConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        // {
        //     path: '//attendance/dashboard/mark',
        //     component: React.lazy(() => import('./forms/PreLearningForm'))
        // },
        {
            path: '/attendance/dashboard',
            component: React.lazy(() => import('./attendanceDash'))
        },
        {
            path: '/attendance/activity/new/:id',
            component: React.lazy(() => import('./newActivity'))
        },
        {
            path: '/attendance/activity/new',
            component: React.lazy(() => import('./newActivity'))
        },
        {
            path: '/activity/list',
            component: React.lazy(() => import('./activityList'))
        }
    ]
};

export default AttendanceConfig;
