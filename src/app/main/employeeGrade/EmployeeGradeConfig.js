import React from 'react';

const EmployeeGradeConfig = {
  settings: {
		layout: {
			config: {}
		}
  },
  routes: [
    {
      path: '/employeeGrade/all',
      component: React.lazy(() => import('./EmployeeGrade'))
    }
  ]
};

export default EmployeeGradeConfig;