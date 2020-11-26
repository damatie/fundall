import React from 'react';

const dataOne = {
  labels: ['Employee on leave', 'Total employee'],
  datasets: [
    {
      data: [30, 150,],
      backgroundColor: ['#FF6384', '#36A2EB',],
      hoverBackgroundColor: ['#FF6384', '#36A2EB',]
    }
  ]
};


const data = {
  labels: ['Finance', 'HR', 'IT', 'Finance', 'Production', 'Research and Development', 'Purchasing', 'Marketing ', 'Purchasing', 'Production', 'Finance', 'Finance'],
  datasets: [
    {
      label: 'Departments',
      data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const employeeData = [
  {
    profilePicture: 'assets/images/avatars/Abbott.jpg',
    fullName: 'Abbot',
    email: 'Abbot@test.com',
    total: 28,
    taken: 20,
    remain: 8
  },
  {
    profilePicture: 'assets/images/avatars/Arnold.jpg',
    fullName: 'Arnold',
    email: 'Arnold@test.com',
    total: 28,
    taken: 20,
    remain: 8
  },
  {
    profilePicture: 'assets/images/avatars/Barrera.jpg',
    fullName: 'Barrera',
    email: 'Barrera@test.com',
    total: 28,
    taken: 20,
    remain: 8
  },
  {
    profilePicture: 'assets/images/avatars/Blair.jpg',
    fullName: 'Blair',
    email: 'Blair@test.com',
    total: 28,
    taken: 20,
    remain: 8
  }
]

const useHrDashboard = () => {
  const [doughnutChartData] = React.useState({
    data: dataOne,
    percentage: `${dataOne.datasets[0].data[0] * 100 / dataOne.datasets[0].data[1]}%`
  })
  const [barChartData] = React.useState(data);

  return {
    doughnutChartData,
    barChartData,
    employeeData
  };
};

export default useHrDashboard;