import React from 'react';
import SharedButton from 'app/shared/button/SharedButton';
import Input from 'app/shared/TextInput/Input';

const GradeAndPromotionForm = () => {
  const inputs = React.useMemo(() => [
    {
      name: '',
      label: 'Job Title',
      type: '',
      defaultValue: '',
      className: 'my-20'
    },
    {
      name: '',
      label: 'Start Date',
      type: '',
      defaultValue: '',
      className: 'my-20'
    },
    {
      name: '',
      label: 'End Date',
      type: '',
      defaultValue: '',
      className: 'my-20'
    }
  ])
  return (
    <form>
      { inputs.map((input) => ( <Input {...input} /> )) }
      <SharedButton
        type='submit'
        variant='contained'
        color='secondary'
        className='flex mx-auto'
      >
        Create
      </SharedButton>
    </form>
  );
};

export default GradeAndPromotionForm;