import React from 'react';
import TextInput from '../../../../../shared/inputs/textInputs';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { boxShadows } from '../../../../../styles/boxShadow';
import container from '../../../../../styles/container';
import authIcon from '../../../../../styles/authIcon';
import title from '../../../../../styles/title';
import FileInput from '../../../../../shared/inputs/fileInput';
import FeaturedVideoRoundedIcon from "@material-ui/icons/FeaturedVideoRounded";

const useStyles = makeStyles((theme) => ({
  border: {
    width: '100%',
    height: '5px',
    borderTop: '2px solid #000',
    margin: '2rem 0',
  },
  align: {
    textAlign: 'start',
    marginLeft: '25rem',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
    }
  },
  span: {
    marginBottom: '1rem',
    display: 'inline-block',
  }
}));

const IDCardIssuanceForm = () => {
  //styles
  const classes = useStyles();
  const card = boxShadows();
  const wrapper = container();
  const heading = title();
  const icon = authIcon();

  return (
    <div className={card.card_boxshadow}>
      <div className={wrapper.container} >
        <header className={heading.title}>
          <h2><span className={icon.authIcon}><FeaturedVideoRoundedIcon /></span>ID CARD ISSUANCE FORM</h2>
        </header>
        <Grid container spacing="2" alignItems="center" >
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <div>
              <span><strong>Name:</strong></span>
              <TextInput textInputData={''} />
              <span><strong>ID Number:</strong></span>
              <TextInput textInputData={''} />
              <span className={classes.span}><strong>Signature upload:</strong></span>
              <FileInput onChange={''} />
            </div>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
            <div className={classes.align}>
              <p><strong>Upload passport</strong></p>
              <FileInput onChange={''} />
            </div>
          </Grid>
        </Grid>

        <div className={classes.border}></div>

        <Grid container spacing="2" alignItems="center" >
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <div>
              <span><strong>Name:</strong></span>
              <TextInput textInputData={''} />
              <span><strong>ID Number:</strong></span>
              <TextInput textInputData={''} />
              <span className={classes.span}><strong>Signature upload:</strong></span>
              <FileInput onChange={''} />
            </div>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
            <div className={classes.align}>
              <p><strong>Upload passport</strong></p>
              <FileInput onChange={''} />
            </div>
          </Grid>
        </Grid>

        <div className={classes.border}></div>

        <Grid container spacing="2" alignItems="center" >
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <div>
              <span><strong>Name:</strong></span>
              <TextInput textInputData={''} />
              <span><strong>ID Number:</strong></span>
              <TextInput textInputData={''} />
              <span className={classes.span}><strong>Signature upload:</strong></span>
              <FileInput onChange={''} />
            </div>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
            <div className={classes.align}>
              <p><strong>Upload passport</strong></p>
              <FileInput onChange={''} />
            </div>
          </Grid>
        </Grid>

        <div className={classes.border}></div>

        <Grid container spacing="2" alignItems="center" >
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <div>
              <span><strong>Name:</strong></span>
              <TextInput textInputData={''} />
              <span><strong>ID Number:</strong></span>
              <TextInput textInputData={''} />
              <span className={classes.span}><strong>Signature upload:</strong></span>
              <FileInput onChange={''} />
            </div>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
            <div className={classes.align}>
              <p><strong>Upload passport</strong></p>
              <FileInput onChange={''} />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default IDCardIssuanceForm;
