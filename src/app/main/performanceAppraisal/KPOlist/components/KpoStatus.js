import React from 'react';

const KpoStatus = ({status}) => {
  return (
    <>
      {
        status === 'completed' ? (
          <span className='bg-green-100 text-green-800 text-center p-4 rounded-4'>{status?.toLowerCase()}</span>
        ) : (
          <span className='bg-yellow-100 text-yellow-800 text-center p-4 rounded-4'>{status?.toLowerCase()}</span>
        )
      }
    </>
  );
};

export default KpoStatus;