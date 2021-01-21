import React from 'react';
import SharedButton from 'app/shared/button/SharedButton';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const BehaviouralAttributeList = ({headerId, data, config, handleChange }) => {
  const { type } = config;
  return (
      <section>

        <Grid container spacing={1} alignItems='center'>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="subtitle1" color="initial"><strong>{data.subject}</strong></Typography>
            <Typography variant="subtitle1" color="initial" className='my-10'>{data.subtext}</Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
          <RadioGroup row aria-label="position" name="position" value={data.score} onChange={handleChange({data, headerId})}>
          <FormControlLabel
            value={"1"}
            control={<Radio color="primary" />}
            label="Development Needed"
            labelPlacement="top"
          />
          <FormControlLabel
            value={"1.5"}
            control={<Radio color="primary" />}
            label="Satisfactory"
            labelPlacement="top"
          />
          <FormControlLabel
            value={"2"}
            control={<Radio color="primary" />}
            label="Key Strength"
            labelPlacement="top"
          />
          <FormControlLabel
            value={"2.5"}
            control={<Radio color="primary" />}
            label="Leader"
            labelPlacement="top"
          />
          </RadioGroup>
          </Grid>
        </Grid>
        {/* <SharedButton
          variant='contained'
          className='my-10'
          color='primary'
        >
          Save
        </SharedButton> */}
      </section>
  );
};

export default BehaviouralAttributeList;