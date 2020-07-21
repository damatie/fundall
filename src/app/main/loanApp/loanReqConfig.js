import React from 'react';

const LoanReqConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/loan/review/list/details/:id',
      component: React.lazy(() => import('./loan_management/loanDetails'))
    },
    {
      path: '/loan/review/list',
      component: React.lazy(() => import('./loan_management/manageLoan'))
    },
    {
      path: '/loan/request/details/:id',
      component: React.lazy(() => import('./loan_request/loanReq'))
    },
    {
      path: '/loan/request/new',
      component: React.lazy(() => import('./loan_request/loanReq'))
    },
    {
      path: '/loan/request/list',
      component: React.lazy(() => import('./loan_request/loanReqs'))
    },
    {
      path: '/loan/request/salaryadvance_request/new',
      component: React.lazy(() => import('./salaryAdvance/salaryAdvance'))
    },
    {
      path: '/loan/request/salaryadvance_request/list',
      component: React.lazy(() => import('./salaryAdvance/salaryAdvanceTable'))
    },
    {
      path: '/loan/review',
      component: React.lazy(() => import('./reviewLoan'))
    },
    {
      path: '/loan/request',
      component: React.lazy(() => import('./loanHome'))
    }
  ]
}

export default LoanReqConfig;