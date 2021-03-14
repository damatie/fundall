import React from 'react';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import { NoData } from 'app/shared/NoData';

const DisplayEmployeeInfo = ({inputs, data, title, handleClick}) => {
  return (
    <section className='p-20'>
      <Button variant="contained" color="primary" className='my-4' onClick={handleClick(title)}>
        {`Add ${title}`}
      </Button>
      {
        data.length === 0 ? (<NoData title={title} />) :
        data.map((item, i) => (
          <>
          <Typography className='my-12' key={i} variant="h6" color="initial"><b>{`${title} - ${i + 1}`}</b></Typography>
          {
          inputs.map(({name, label}, idx) => (
            <Typography className='my-8' key={idx} variant="body1" color="initial">
              <b>
                {label}:
              </b>
              &nbsp;{item[name]}
            </Typography>
          ))
        }
        </>
        ))
      }
    </section>
  );
};

export default DisplayEmployeeInfo;