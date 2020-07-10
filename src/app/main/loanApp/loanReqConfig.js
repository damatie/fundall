import React from 'react';

const LoanReqConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/hr/loan/loan_management/details/:id',
      component: React.lazy(() => import('./loan_management/loanDetails'))
    },
    {
      path: '/hr/loan/loan_management',
      component: React.lazy(() => import('./loan_management/manageLoan'))
    },
    {
      path: '/loan/loan_request/details/:id',
      component: React.lazy(() => import('./loan_request/loanReq'))
    },
    {
      path: '/loan/loan_request/new',
      component: React.lazy(() => import('./loan_request/loanReq'))
    },
    {
      path: '/loan/loan_request',
      component: React.lazy(() => import('./loan_request/loanReqs'))
    }
  ]
}

export default LoanReqConfig;