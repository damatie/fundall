export const maritalStatus = [
  {id: 'Single', name: 'Single'},
  {id: 'Married', name: 'married'},
  {id: 'Engaged', name: 'Engaged'},
  {id: 'Complicated', name: 'Complicated'},
];

const genSalaryGrade = () => {
  const arr = [];
  for(let i = 1; i <= 17; i+=1) {
    arr.push({
      id: `Grade level ${i}`,
      name: `Grade level ${i}`
    });
  }

  return  arr;
};

const genYearsOfService = () => {
  const arr = [];
  for(let i = 1; i <= 35; i+=1) {
    arr.push({
      id: i,
      name: `${i} Years`
    });
  }

  return  arr;
};

export const salaryGrade = [
  ...genSalaryGrade()
];

export const yearsOfService = [
  ...genYearsOfService()
];

export const qualification = [
  {id: 'Bachelors degree', name: 'Bachelors degree'},
  {id: 'Diploma', name: 'Diploma'},
  {id: 'Certificate', name: 'Certificatioin'}
];

export const natureOfEmployement = [
  {id: 'Permanent', name: 'Permanent'},
  {id: 'Consultant', name: 'Consultant'}
];

export const confirmationStatus = [
  {id: 'Confirmed', name: 'Confirmed'},
  {id: 'Not Confirmed', name: 'Not Confirmed'},
  {id: 'Deffered For 3 Months', name: 'Deffered For 3 Months'},
  {id: 'Not applicable', name: 'Not applicable'}
];

export const gradeLevel = [
  {id: 'MB1', name: 'MB1'},
  {id: 'MB2', name: 'MB2'},
  {id: 'MB3', name: 'MB3'},
  {id: 'MB4', name: 'MB4'},
  {id: 'MB5', name: 'MB5'},
  {id: 'MG14', name: 'MG14'},
  {id: 'MG13', name: 'MG13'},
  {id: 'MG12', name: 'MG12'},
  {id: 'GL11', name: 'GL11'},
  {id: 'GL10', name: 'GL10'},
  {id: 'GL9', name: 'GL9'},
  {id: 'GL8', name: 'GL8'},
  {id: 'GL7', name: 'GL7'},
  {id: 'GL6', name: 'GL6'}
];