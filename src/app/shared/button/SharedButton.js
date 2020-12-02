import React from 'react';
import Button from '@material-ui/core/Button';
import AutorenewRoundedIcon from '@material-ui/icons/AutorenewRounded';

const SharedButton = (props) => {
  const {
    children,
    loading,
  } = props;
  return (
    <Button {...props }>
      <>
        {loading ? <AutorenewRoundedIcon className="animate-spin" /> : null}
        {' '}
        {children}
      </>
    </Button>
  );
};

export default SharedButton;