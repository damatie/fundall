import React from 'react';

const KpoContentStatus = ({status}) => {
  return (
    <>
      {
        (!status) && (
          <p className='bg-blue-100 text-blue-800 text-center p-4 rounded-4'>Not Requested</p>
        )
      }
      {
        status === 'requested' && (
          <p className='bg-yellow-100 text-yellow-800 text-center p-4 rounded-4'>Requested</p>
        )
      }
      {
        status === 'approved' && (
          <p className='bg-green-100 text-green-800 text-center p-4 rounded-4'>Approved</p>
        )
      }
    </>
  );
};

export default KpoContentStatus;