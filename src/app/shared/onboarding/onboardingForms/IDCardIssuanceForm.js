import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Formsy from 'formsy-react';
import { TextFieldFormsy, CheckboxFormsy } from '@fuse/core/formsy';
import { inputStyles } from '../../EmployeeFormInput';
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
  const card = inputStyles();

  return (
    <Formsy>
      <div className={card.formField}>
        <div className={card.container} >
          <header className={card.title}>
            <h2><span className={card.AuthIcon}><FeaturedVideoRoundedIcon /></span>ID CARD ISSUANCE FORM</h2>
          </header>
          <Grid container spacing="2" alignItems="center" >
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <div>
                <span><strong>Name:</strong></span>
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="text"
                  name="name"
                  label="Name"
                  variant="outlined"
                />
                <span><strong>ID Number:</strong></span>
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="text"
                  name="number"
                  label="ID Number"
                  variant="outlined"
                />
                <span className={classes.span}><strong>Signature upload:</strong></span>
                <CheckboxFormsy
                  className="mb-16 w-full"
                  name="accept"
                  value={false}
                  label="Upload signature"
                  validations={{
                    equals: true,
                  }}
                  validationErrors={{
                    equals: "You need to accept"
                  }}
                />
              </div>
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
              <div className={classes.align}>
                <p><strong>Upload passport</strong></p>
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="file"
                  variant="outlined"
                  name="passport"
                />
              </div>
            </Grid>
          </Grid>

          <div className={classes.border}></div>

          <Grid container spacing="2" alignItems="center" >
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <div>
                <span><strong>Name:</strong></span>
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="text"
                  name="name"
                  label="Name"
                  variant="outlined"
                />
                <span><strong>ID Number:</strong></span>
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="text"
                  name="number"
                  label="ID Number"
                  variant="outlined"
                />
                <span className={classes.span}><strong>Signature upload:</strong></span>
                <CheckboxFormsy
                  className="mb-16 w-full"
                  name="accept"
                  value={false}
                  label="Upload signature"
                  validations={{
                    equals: true,
                  }}
                  validationErrors={{
                    equals: "You need to accept"
                  }}
                />
              </div>
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
              <div className={classes.align}>
                <p><strong>Upload passport</strong></p>
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="file"
                  name="number"
                  variant="outlined"
                />
              </div>
            </Grid>
          </Grid>

          <div className={classes.border}></div>

          <Grid container spacing="2" alignItems="center" >
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <div>
                <span><strong>Name:</strong></span>
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="text"
                  name="name"
                  label="name"
                  variant="outlined"
                />
                <span><strong>ID Number:</strong></span>
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="text"
                  name="number"
                  label="ID Number"
                  variant="outlined"
                />
                <span className={classes.span}><strong>Signature upload:</strong></span>
                <CheckboxFormsy
                  className="mb-16 w-full"
                  name="accept"
                  value={false}
                  label="Upload signature"
                  validations={{
                    equals: true,
                  }}
                  validationErrors={{
                    equals: "You need to accept"
                  }}
                />
              </div>
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
              <div className={classes.align}>
                <p><strong>Upload passport</strong></p>
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="file"
                  name="passport"
                  variant="outlined"
                />
              </div>
            </Grid>
          </Grid>

          <div className={classes.border}></div>

          <Grid container spacing="2" alignItems="center" >
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <div>
                <span><strong>Name:</strong></span>
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="text"
                  name="Name"
                  label="Name"
                  variant="outlined"
                />
                <span><strong>ID Number:</strong></span>
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="text"
                  name="number"
                  label="ID Number"
                  variant="outlined"
                />
                <span className={classes.span}><strong>Signature upload:</strong></span>
                <CheckboxFormsy
                  className="mb-16 w-full"
                  name="accept"
                  value={false}
                  label="Upload signature"
                  validations={{
                    equals: true,
                  }}
                  validationErrors={{
                    equals: "You need to accept"
                  }}
                />
              </div>
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
              <div className={classes.align}>
                <p><strong>Upload passport</strong></p>
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="file"
                  name="passport"
                  variant="outlined"
                />
              </div>
            </Grid>
          </Grid>

          <Grid alignItems="center" container item sm="12" md="12" lg="12" xl="12">
            {/* <div className={card.submit}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mx-auto mt-32 mb-80 w-6/12"
                aria-label="LOG IN"
              // disabled={!isFormValid}
              >
                Submit
              </Button>
            </div> */}
          </Grid>
        </div>
      </div>
    </Formsy>
  );
};

export default IDCardIssuanceForm;
