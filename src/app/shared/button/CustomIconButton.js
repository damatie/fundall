import React, { useEffect, useState } from 'react';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

const CustomIconButton = props => {
  const { className, children, onClick, icon, type, disabled, submit } = props;

  const [classes, setClasses] = useState('');

  useEffect(() => {
    switch (type) {
      case 'success': {
        setClasses('w-1/4 bg-green-300 text-white hover:bg-green-700');
        break;
      }
      case 'error': {
        setClasses('w-1/4 bg-red-A400 hover:bg-red-700 text-white');
        break;
      }
      default: {
        setClasses('');
        break;
      }
    }
  }, []);

  return (
    <Button
      className={type ? classes : className}
      startIcon={<Icon>{icon}</Icon>}
      onClick={onClick}
      style={{ padding: "1rem 0" }}
      disabled={disabled ? disabled : false}
      type={submit ? 'submit' : ''}
    >
      <span className='normal-case'>
        {children}
      </span>
    </Button>
  );
};

export default CustomIconButton;