import React from 'react';

const HrTrainingConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/hr/training/management',
      component: React.lazy(() => import('./trainingManagement/trainingManagement'))
    },
    {
      path: '/hr/training/category',
      component: React.lazy(() => import('./trainingManagement/trainingCategory/trainingCategory'))
    }
  ]
}

export default HrTrainingConfig;