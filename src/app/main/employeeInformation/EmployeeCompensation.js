import React from 'react';
import Input from 'app/shared/TextInput/Input';
import BasicCard from './components/BasicCard';
import GridSystem from 'app/shared/gridSystem';

const EmployeeCompensation = () => {
  const inputs = React.useMemo(() => [
    {
      name: '',
      label: 'Guaranteed Cash (Annual) Consolidated'
    },
    {
      name: '',
      label: 'Basic Salary'
    },
    {
      name: '',
      label: 'Housing Allowance'
    },
    {
      name: '',
      label: 'Car / Transportation Allowance'
    },
    {
      name: '',
      label: 'Furniture Allowance '
    },
    {
      name: '',
      label: 'Utility Allowance'
    },
    {
      name: '',
      label: 'Leave and Vacation Travel Allowance'
    },
    {
      name: '',
      label: '13th Month'
    },
    {
      name: '',
      label: 'Reimbursable Expense (Annual)'
    },
    {
      name: '',
      label: 'One Club Subscription'
    }
  ], []);
  return (
    <BasicCard
     title='Compensation'
    >
      <form>
        <GridSystem>
        {
          inputs.map((input) => (
            <Input
              {...input}
              type='number'
            />
          ))
        }
        </GridSystem>
      </form>
    </BasicCard>
  );
};

export default EmployeeCompensation;