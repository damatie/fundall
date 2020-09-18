import React from 'react';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

const CustomIconButton = props => {
  const { className, children, onClick, icon } = props;

  return (
    <Button
      className={className}
      startIcon={<Icon>{icon}</Icon>}
      onClick={onClick}
    >
      <span className='normal-case'>
        {children}
      </span>
    </Button>
  );
};

export default CustomIconButton;