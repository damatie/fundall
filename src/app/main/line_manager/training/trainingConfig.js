import React from 'react';

const TrainingConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/training/dept',
      component: React.lazy(() => import('./deptTraining/deptTraining'))
    }
  ]
}

export default TrainingConfig;