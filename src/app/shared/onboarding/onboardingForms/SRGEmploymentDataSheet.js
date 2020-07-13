import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Formsy from 'formsy-react';
import { TextFieldFormsy, SelectFormsy, CheckboxFormsy } from '@fuse/core/formsy';
import { inputStyles } from '../../EmployeeFormInput';
import Button from '@material-ui/core/Button';
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  section: {
    alignItems: 'center',
    margin: '2rem 0',
  }
}));

const SRGEmploymentDataSheet = () => {
  //styles
  const classes = useStyles();
  const card = inputStyles();

  return (
    <Formsy>
      <div className={card.formField}>
        <div className={card.container}>
          <header className={card.title}>
            <h2>
              <span className={card.AuthIcon}><StorageRoundedIcon /></span>
              <b>EMPLOYEE DATA SHEET</b>
            </h2>
          </header>

          <Grid container spacing="4">
            <Grid item xs="6">
              <span>Personnel number</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                label="Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="6">
              <span>Date</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="name"
                // label="Name"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <div className={classes.section}>
            <h4><b>PERSONAL DATA</b></h4>
          </div>

          <Grid container spacing="4">
            <Grid item xs="6">
              <span>Title</span>
              <SelectFormsy
                className="mb-16 w-full"
                name="related"
                Placeholder="Title"
                value="none"
                validations="equals:none"
                validationError="Must be None"
              // variant="outlined"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Mrs">Mrs</MenuItem>
                <MenuItem value="Ms">Ms</MenuItem>
                <MenuItem value="Miss">Miss</MenuItem>
              </SelectFormsy>
            </Grid>
            <Grid item xs="6">
              <span>Second titles</span>
              <SelectFormsy
                className="mb-16 w-full"
                name="related"
                Placeholder="Second titles"
                value="none"
                validations="equals:none"
                validationError="Must be None"
              // variant="outlined"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Dr">Dr</MenuItem>
                <MenuItem value="Phd">Phd</MenuItem>
              </SelectFormsy>
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="6">
              <span>Last name</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Last name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="6">
              <span>Birth date</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="name"
                // Placeholder="First name"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="6">
              <span>First name</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="First name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="6">
              <span>Gender</span>
              <SelectFormsy
                className="mb-16 w-full"
                name="related"
                Placeholder="Gender"
                value="none"
                validations="equals:none"
                validationError="Must be None"
              // variant="outlined"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </SelectFormsy>
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="6">
              <span>Middle name</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Middle name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="6">
              <span>Nationality</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Nationality"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="6">
              <span>National identity number</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="National identity number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="6">
              <span>Country of birth</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Country of birth"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" >
            <Grid item xs="4">
              <span>Marital status</span>
              <SelectFormsy
                className="mb-16 w-full"
                name="related"
                Placeholder="Marital status"
                value="none"
                validations="equals:none"
                validationError="Must be None"
              // variant="outlined"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
                <MenuItem value="Divorced">Divorced</MenuItem>
                <MenuItem value="Legally separated">Legally separated</MenuItem>
                <MenuItem value="Common-law">Common -law</MenuItem>
              </SelectFormsy>
            </Grid>
            <Grid item xs="4">
              <span>Since date</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="name"
                // Placeholder="Since date"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="4">
              <span>No. Of eligible dependent children</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="No. Of eligible dependent children"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <div className={classes.section}>
            <h4><b>FAMILY INFORMATION</b></h4>
          </div>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="3">
              <span>Spouse name</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Spouse full name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="3">
              <span>Birth date</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="3">
              <span>Nationality</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Nationality"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="3">
              <span>Gender</span>
              <SelectFormsy
                className="mb-16 w-full"
                name="related"
                Placeholder="Gender"
                value="none"
                validations="equals:none"
                validationError="Must be None"
              // variant="outlined"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </SelectFormsy>
            </Grid>

          </Grid>

          <Grid container spacing="4">
            <Grid item xs="2">
              <p><b>Dependent children Names</b></p>
            </Grid>
            <Grid item xs="2">
              <p><b>Birth date</b></p>
            </Grid>
            <Grid item xs="2">
              <p><b>Nationality</b></p>
            </Grid>
            <Grid item xs="2">
              <p><b>Relationship</b></p>
            </Grid>
            <Grid item xs="2">
              <p><b>Student</b></p>
            </Grid>
            <Grid item xs="2">
              <p><b>Gender</b></p>
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="2">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                label="Full name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="name"
                // label="Birth date"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                label="Nationality"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <SelectFormsy
                className="mb-16 w-full"
                name="related"
                Placeholder="Relationship"
                value="none"
                validations="equals:none"
                validationError="Must be None"
              // variant="outlined"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Birth Child">Birth Child</MenuItem>
                <MenuItem value="Adopted Child">Adopted Child</MenuItem>
                <MenuItem value="Stepchild">Stepchild</MenuItem>
                <MenuItem value="Legal Guardian">Legal Guardian</MenuItem>
              </SelectFormsy>
            </Grid>
            <Grid item xs="2">
              <SelectFormsy
                className="mb-16 w-full"
                name="related"
                Placeholder="Student"
                value="none"
                validations="equals:none"
                validationError="Must be None"
              // variant="outlined"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="K-12">K-12</MenuItem>
                <MenuItem value="University">Trade School</MenuItem>
                <MenuItem value="Trade School">Trade School</MenuItem>
              </SelectFormsy>
            </Grid>
            <Grid item xs="2">
              <SelectFormsy
                className="mb-16 w-full"
                name="related"
                Placeholder="Gender"
                value="none"
                validations="equals:none"
                validationError="Must be None"
              // variant="outlined"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </SelectFormsy>
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="2">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                label="Full name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="name"
                // Placeholder="Birth date"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                label="Nationality"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <SelectFormsy
                className="mb-16 w-full"
                name="related"
                Placeholder="Relationship"
                value="none"
                validations="equals:none"
                validationError="Must be None"
              // variant="outlined"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Birth Child">Birth Child</MenuItem>
                <MenuItem value="Adopted Child">Adopted Child</MenuItem>
                <MenuItem value="Stepchild">Stepchild</MenuItem>
                <MenuItem value="Legal Guardian">Legal Guardian</MenuItem>
              </SelectFormsy>
            </Grid>
            <Grid item xs="2">
              <SelectFormsy
                className="mb-16 w-full"
                name="related"
                Placeholder="Student"
                value="none"
                validations="equals:none"
                validationError="Must be None"
              // variant="outlined"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="K-12">K-12</MenuItem>
                <MenuItem value="University">Trade School</MenuItem>
                <MenuItem value="Trade School">Trade School</MenuItem>
              </SelectFormsy>
            </Grid>
            <Grid item xs="2">
              <SelectFormsy
                className="mb-16 w-full"
                name="related"
                Placeholder="Gender"
                value="none"
                validations="equals:none"
                validationError="Must be None"
              // variant="outlined"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </SelectFormsy>
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="2">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                label="Full name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="name"
                // Placeholder="Birth date"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                label="Nationality"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <SelectFormsy
                className="mb-16 w-full"
                name="related"
                Placeholder="Relationship"
                value="none"
                validations="equals:none"
                validationError="Must be None"
              // variant="outlined"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Birth Child">Birth Child</MenuItem>
                <MenuItem value="Adopted Child">Adopted Child</MenuItem>
                <MenuItem value="Stepchild">Stepchild</MenuItem>
                <MenuItem value="Legal Guardian">Legal Guardian</MenuItem>
              </SelectFormsy>
            </Grid>
            <Grid item xs="2">
              <SelectFormsy
                className="mb-16 w-full"
                name="related"
                Placeholder="Student"
                value="none"
                validations="equals:none"
                validationError="Must be None"
              // variant="outlined"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="K-12">K-12</MenuItem>
                <MenuItem value="University">Trade School</MenuItem>
                <MenuItem value="Trade School">Trade School</MenuItem>
              </SelectFormsy>
            </Grid>
            <Grid item xs="2">
              <SelectFormsy
                className="mb-16 w-full"
                name="related"
                Placeholder="Gender"
                value="none"
                validations="equals:none"
                validationError="Must be None"
              // variant="outlined"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </SelectFormsy>
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="2">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                label="Full name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="name"
                // Placeholder="Birth date"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                label="Nationality"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <SelectFormsy
                className="mb-16 w-full"
                name="related"
                Placeholder="Relationship"
                value="none"
                validations="equals:none"
                validationError="Must be None"
              // variant="outlined"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Birth Child">Birth Child</MenuItem>
                <MenuItem value="Adopted Child">Adopted Child</MenuItem>
                <MenuItem value="Stepchild">Stepchild</MenuItem>
                <MenuItem value="Legal Guardian">Legal Guardian</MenuItem>
              </SelectFormsy>
            </Grid>
            <Grid item xs="2">
              <SelectFormsy
                className="mb-16 w-full"
                name="related"
                Placeholder="Student"
                value="none"
                validations="equals:none"
                validationError="Must be None"
              // variant="outlined"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="K-12">K-12</MenuItem>
                <MenuItem value="University">Trade School</MenuItem>
                <MenuItem value="Trade School">Trade School</MenuItem>
              </SelectFormsy>
            </Grid>
            <Grid item xs="2">
              <SelectFormsy
                className="mb-16 w-full"
                name="related"
                Placeholder="Gender"
                value="none"
                validations="equals:none"
                validationError="Must be None"
              // variant="outlined"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </SelectFormsy>
            </Grid>
          </Grid>

          <div className={classes.section}>
            <h4><b>NEXT OF KIN -1</b></h4>
          </div>

          <Grid container spacing="4">
            <Grid item xs="2">
              <span>Name</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Full name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <span>Birth date</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="name"
                // Placeholder="Birth date"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <span>Nationality</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Nationality"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <span>Relationship</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Relationship"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <span>Phone number</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Phone number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <SelectFormsy
                className="mb-16 w-full"
                name="related"
                Placeholder="Gender"
                value="none"
                validations="equals:none"
                validationError="Must be None"
              // variant="outlined"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </SelectFormsy>
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="12">
              <p>Address</p>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Address"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <div className={classes.section}>
            <h4><b>JOB REFEREE (LAST PLACE OF WORK)</b></h4>
          </div>

          <Grid container spacing="4">
            <Grid item xs="2">
              <span>Name of referee</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Name of referee"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <span>Relationship</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Relationship"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <span>Company name</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Company name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <span>Address</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Address"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <span>Phone number</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Phone number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="2">
              <span>Email</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Email"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="12">
              <p>Address</p>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Address"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <div className={classes.section}>
            <h4><b>ADDRESS INFORMATION</b></h4>
          </div>

          <Grid container spacing="4">
            <Grid item xs="8">
              <p>Home Address</p>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Home Address"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="8">
              <p>Phone number</p>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Phone number"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <div className={classes.section}>
            <p><b>I certify that the answers to the foregoing questions are true, complete and accurate to the best of my knowledge</b></p>
          </div>

          <Grid container spacing="4">
            <Grid item xs="12">
              <p>Upload your signature</p>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="file"
                name="name"
                Placeholder="Address"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <div className={classes.section}>
            <h4><b>STATUTORY DETAILS</b></h4>
          </div>

          <Grid container spacing="4">
            <Grid item xs="12">
              <span><b>PIN (Personal Income Tax) Name</b></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="PIN (Personal Income Tax) Name"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="12">
              <span><b>Pension account name and RSA pin</b></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Pension account name and RSA pin"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="12">
              <span><b>Pension account RSA pin</b></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Pension account RSA pin"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="12">
              <span><b>Pension fund adminstration name</b></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Pension fund adminstration name"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="12">
              <span><b>NHF name/number</b></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="NHF name/number"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="12">
              <span><b>Valid ID card type</b></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Valid ID card type"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="12">
              <span><b>Valid ID card number (attach photocopy)</b></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Valid ID card number (attach photocopy)"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <div className={classes.section}>
            <h4>
              SALARY BANK ACCOUNT INFORMATION
            </h4>
          </div>

          <Grid container spacing="4">
            <Grid item xs="12">
              <span><b>Bank name</b></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Bank name"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="12">
              <span><b>Bank branch</b></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Bank branch"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="12">
              <span><b>Bank address</b></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Bank address"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="12">
              <span><b>Account number</b></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Account number"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="12">
              <span><b>ABA routing no.</b></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="ABA routing no."
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="12">
              <span><b>Swift code</b></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Swift code"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="12">
              <span><b>Sort code</b></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="Sort code"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="12">
              <span><b>IBAN</b></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                Placeholder="IBAN"
                variant="outlined"
              />
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

export default SRGEmploymentDataSheet;
