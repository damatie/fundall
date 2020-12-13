import React from 'react';
import Typography from '@material-ui/core/Typography';

const LoanStatus = (props) => {
  const { status } = props;

  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <Typography className={'bg-orange text-white inline text-11 font-500 px-8 py-4 rounded-4'}>{status}</Typography>
      );
      break;

    case 'approved':
      return (
        <Typography className={'bg-blue text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
          {status}
        </Typography>
      );
      break;

    case 'open':
      return (
        <Typography className={'bg-green text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
          {status}
        </Typography>
      );
      break;

    case 'rejected':
      return (
        <Typography className={'bg-red text-white inline text-11 font-500 px-8 py-4 rounded-4'}>{status}</Typography>
      );
      break;
    case 'reviewed':
      return (
        <Typography className={'bg-orange text-bold text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
          {status}
        </Typography>
      );
      break;
    case 'reviewed1':
      return (
        <Typography className={'bg-orange text-bold text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
          Line Manager Approved
        </Typography>
      );
      break;
    case 'reviewed2':
      return (
        <Typography className={'bg-orange text-bold text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
          Finance Manager Approved
        </Typography>
      );
      break;
    case 'corrected':
      return (
        <Typography className={'bg-orange text-bold text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
          {status}
        </Typography>
      );
      break;
    case 'closed':
      return (
        <Typography className={'bg-black text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
          {status}
        </Typography>
      );
      break;

    default:
      return { status };
      break;
  }
};

export default LoanStatus;