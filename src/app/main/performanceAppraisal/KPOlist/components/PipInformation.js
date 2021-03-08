import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const fields = [
  {
    name: 'compensationComponent',
    label: 'PIP Compansation Type'
  },
  {
    name: 'gradeName',
    label: 'Grade Name'
  },
  {
    name: 'totalPipAchieved',
    label: 'Total PIP Achieved'
  },
  {
    name: 'totalPipTarget',
    label: 'Total PIP Target'
  },
  {
    name: 'totalPipAwarded',
    label: 'Total PIP Awarded'
  }
]
const PipInformation = ({pip}) => {
  return (
    <Paper variant="outlined" className='w-1/2 flex flex-col mx-auto p-20'>
      {
        fields.map((field, i) => (
          <Typography
            className='my-16'
            variant="subtitle1"
            color="initial"
            key={i}
          >
            <strong>
              {field?.label}:
            </strong>
            &nbsp;{
              field.name === 'totalPipAwarded' ? 
                new Intl.NumberFormat("en-GB").format(pip[field.name])
               : pip[field.name]
            }
          </Typography>
        ))
      }
    </Paper>
  );
};

export default PipInformation;