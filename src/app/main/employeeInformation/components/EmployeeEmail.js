import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';

const EmployeeEmail = () => {
  const inputs = React.useMemo(() => [
    {
      name: '',
      label: 'Office Email',
      type: 'email',
      defaultValue: ''
    },
    {
      name: '',
      label: 'Alternative Email',
      type: 'email',
      defaultValue: ''
    },
    {
      name: '',
      label: 'Facebook Handle',
      type: 'url',
      defaultValue: ''
    },
    {
      name: '',
      label: 'LinkedIn Handle',
      type: 'url',
      defaultValue: ''
    },
    {
      name: '',
      label: 'Instagram Handle',
      type: 'url',
      defaultValue: ''
    },
    {
      name: '',
      label: 'Twitter Handle',
      type: 'url',
      defaultValue: ''
    }
  ], []);
  return (
    <BasicCard
      title='Email'
    >
      <GridSystem>
        {
          inputs.map((input) => (
            <Input { ...input } />
          ))
        }
      </GridSystem>
    </BasicCard>
  );
};

export default EmployeeEmail;