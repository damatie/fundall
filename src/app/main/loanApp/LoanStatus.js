import React from 'react';
import Typography from '@material-ui/core/Typography';

const LoanStatus = (props) => {
  const { status } = props;
  if (!status) return (<></>);

  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div>
        <Typography className={'bg-orange text-white inline text-11 font-500 px-8 py-4 rounded-4'}>{status}</Typography>
        </div>
      );
      break;

    case 'approved':
      return (
        <div>
        <Typography className={'bg-blue text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
          {status}
        </Typography>
        </div>
      );
      break;

    case 'open':
      return (
        <div>
        <Typography className={'bg-green text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
          {status}
        </Typography>
        </div>
      );
      break;

    case 'rejected':
      return (
        <div>
        <Typography className={'bg-red text-white inline text-11 font-500 px-8 py-4 rounded-4'}>{status}</Typography>
        </div>
      );
      break;
    case 'reviewed':
      return (
        <div>
        <Typography className={'bg-orange text-bold text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
          {status}
        </Typography>
        </div>
      );
      break;
    case 'reviewed1':
      return (
        <div>
        <Typography className={'bg-orange text-bold text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
          Line Manager Approved
        </Typography>
        </div>
      );
      break;
    case 'reviewed2':
      return (
        <div>
        <Typography className={'bg-orange text-bold text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
          HR Manager Approved
        </Typography>
        </div>
      );
      break;
    case 'approved':
      return (
        <div>
        <Typography className={'bg-green text-bold text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
          Finanace Manager Approved
        </Typography>
        </div>
      );
      break;
    case 'disbursed':
      return (
        <div>
        <Typography className={'bg-green text-bold text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
          Cash Disbursed
        </Typography>
        </div>
      );
      break;
    case 'corrected':
      return (
        <div>
        <Typography className={'bg-orange text-bold text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
          {status}
        </Typography>
        </div>
      );
      break;
    case 'closed':
      return (
        <div>
        <Typography className={'bg-black text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
          {status}
        </Typography>
        </div>
      );
      break;

    default:
      return (
        <div>
          <Typography className={'inline text-11 font-500 px-8 py-4 rounded-4'}>
            {status}
          </Typography>
        </div>
      );
      break;
  }
};

export default LoanStatus;