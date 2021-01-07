const endpoints = [
  {
    id: 1,
    name: 'Loan',
    endpoints: [
      {
        name: 'Get all Loan',
        path: '/loans',
        methods: [],
      },
      {
        name: 'Get all pending Loan',
        path: '/loans/pending',
        methods: [],
      },
      {
        name: 'Get all approved Loan',
        path: '/loans/approved',
        methods: [],
      }
    ]
  },
];

export default endpoints;