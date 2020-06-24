import React, { useState , useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Formsy from 'formsy-react';
import { TextFieldFormsy, CheckboxFormsy, RadioGroupFormsy, SelectFormsy} from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import { inputStyles } from '../../EmployeeFormInput';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff',
    width: '90%',
    height: '100%',
    margin: '0 auto',
    padding: '0 2rem',
  },
  imgCon: {
    width: '100%',
    margin: '2rem 0 0 0',
  },
  mainTitle: {
    margin: '1rem 0',
  },
  para: {
    textAlign: 'justify',
  },
  quote: {
    width: '80%',
    margin: '0 auto',
  },
  medical_info: {
    color: '#b7dff8',
  },
  preMed: {
    width: '80%',
  },
  textarea: {
    // margin: '1rem 0',
    // padding: '0',
    width: '100%',
  },
  display: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
  },
  displayIn: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '50%',
  },

}));

const AxaMansardGeriatricsForm = () => {
  //styles
  const classes = useStyles();
  // const classes = inputStyles();
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  function disableButton()
  {
    setIsFormValid(false);
  }

  function enableButton()
  {
    setIsFormValid(true);
  }

  function handleSubmit(model)
  {
    console.info('submit', model);
  }

  return (
    <Formsy
      onValidSubmit={handleSubmit}
      onValid={enableButton}
      onInvalid={disableButton}
      ref={formRef}
      className="flex flex-col justify-center"
    >
      <div className={classes.container}>
        <div className={classes.imgCon}>
          {/* <img src={AxaLogo} alt="Axa mansard geriatrics logo" /> */}
          LOGO here
        </div>

        <header className={classes.mainTitle}>
          <h4>Introduction</h4>
        </header>

        <div>
          <p className={classes.para}>Please complete the application as accurately as possible and disclose all material information requested. It
          is important to understand that failure to disclose information in this application may result in authorization
          requests being declined or claims being repudiated.
        </p>

          <p className={classes.para}>
            Material Information is Information that affects our decision to insure the insured on the terms and conditions in
            this policy.
        </p>
        </div>

        <div className={classes.quote}>
          <h3>
            <strong>
              “AN INDIVIDUAL WHO ASSISTS AN APPLICANT TO COMPLETE THIS PROPOSAL FORM FOR
              INSURANCE SHALL BE DEEMED TO HAVE DONE SO AS THE AGENT OF THE APPLICANT”
            </strong>
          </h3>
        </div>

        <div>
          <h2 className={classes.medical_info}>
            <strong>COMPREHENSIVE MEDICAL INFORMATION</strong>
          </h2>

          <div className={classes.general_info}>
            <div>
              <h4><strong>General Information</strong></h4>
            </div>

            <h4><strong>Participant:</strong></h4>
            <Grid container spacing="4">
              <Grid container item sm="12" md="1" lg="1" xl="1" alignItems="center">
                Name:
            </Grid>
              <Grid container item sm="12" md="11" lg="11" xl="11" alignItems="center">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                // label="Employee name"
                validations={{
                  minLength: 2,
                }}
                validationErrors={{
                  minLength: 'Min character length is 10',
                }}
                required
              />
              </Grid>
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <Grid container item sm="12" md="1" lg="1" xl="1">
                Address:
              </Grid>
              <Grid container item sm="12" md="11" lg="11" xl="11">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                // label="Employee name"
                validations={{
                  minLength: 10,
                }}
                validationErrors={{
                  minLength: 'Min character length is 10',
                }}
                required
              />
              </Grid>
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <Grid container item sm="12" md="3" lg="3" xl="3">
                Contact phone numbers:
            </Grid>
              <Grid container item sm="12" md="9" lg="9" xl="9">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="number"
                name="name"
                // label="Employee name"
                validations={{
                  minLength: 10,
                }}
                validationErrors={{
                  minLength: 'Min character length is 10',
                }}
                required
              />
              </Grid>
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <Grid container item sm="12" md="4" lg="4" xl="4">
                Birth date:
            </Grid>
              <Grid container item sm="12" md="8" lg="8" xl="8">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="name"
                required
              />
              </Grid>
            </Grid>

            <div className={classes.physician} >
              <div>
                <h4>
                  <strong>Family Physician and/or Primary Health Care Provider:</strong>
                </h4>
              </div>

              <Grid container spacing="4" alignItems="center">
                <Grid container item sm="4" md="4" lg="4" xl="4">
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="text"
                  name="name"
                  label="Doctor"
                  validations={{
                    minLength: 10,
                  }}
                  validationErrors={{
                    minLength: 'Min character length is 10',
                  }}
                  required
              />
                </Grid>
                <Grid container item sm="8" md="8" lg="8" xl="8">
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="text"
                  name="name"
                  label="Phone number"
                  validations={{
                    minLength: 10,
                  }}
                  validationErrors={{
                    minLength: 'Min character length is 10',
                  }}
                  required
                />
                </Grid>
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <Grid container item sm="4" md="4" lg="4" xl="4">
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="text"
                  name="name"
                  label="Address"
                  validations={{
                    minLength: 10,
                  }}
                  validationErrors={{
                    minLength: 'Min character length is 10',
                  }}
                  required
                />
                </Grid>
                <Grid container item sm="8" md="8" lg="8" xl="8">
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="text"
                  name="name"
                  label="City"
                  validations={{
                    minLength: 10,
                  }}
                  validationErrors={{
                    minLength: 'Min character length is 10',
                  }}
                  required
                />
                </Grid>
              </Grid>
            </div>

            <div>
              <div>
                <h4><strong>Marital Status:</strong></h4>
              </div>
                <RadioGroupFormsy
                className="my-16"
                name="gender"
                // label="Gender"
                // validations="equals:female"
                // validationError="Only ladies are accepted"
                required
              >
                <FormControlLabel value="single" control={<Radio color="primary"/>} label="Single"/>
                <FormControlLabel value="married" control={<Radio color="primary"/>} label="Married"/>
                <FormControlLabel value="divorced" control={<Radio color="primary"/>} label="Divorced"/>
                <FormControlLabel value="widowed" control={<Radio color="primary"/>} label="Widowed"/>
              </RadioGroupFormsy>
            </div>

            <div className={classes.sex}>
              <div>
                <h4><strong>Sex:</strong></h4>
              </div>

              <div>
                <SelectFormsy
                className="my-16 w-full"
                name="related"
                // label="Related with"
                value="none"
                // validations="equals:none"
                // validationError="Must be None"
                >
                  <MenuItem value="none">
                      <em>None</em>
                  </MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </SelectFormsy>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.medical_history}>
          <div className={classes.medical_title}>

            <h4><strong>Present Medical History</strong></h4>

            <p>
              <strong>
                Check those questions to which you answer yes (leave the others blank).
              </strong>
            </p>

            <div className={classes.quote}>
              <Grid container spacing="4" className={classes.preMed} alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Has a doctor ever said your blood pressure was too high?"
                // validations={{
                //   equals: true,
                // }}
                // validationErrors={{
                //   equals: "You need to accept"
                // }}
              />
              </Grid>

              <Grid container spacing="4" className={classes.preMed} alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Do you ever have pain in your chest or heart?"
              />
              </Grid>

              <Grid container spacing="4" className={classes.preMed} alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Are you often bothered by a thumping of the heart?"
                />
              </Grid>

              <Grid container spacing="4" className={classes.preMed} alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Does your heart often race?"
                />
              </Grid>

              <Grid container spacing="4" className={classes.preMed} alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Do you ever notice extra heartbeats or skipped beats?"
                />
              </Grid>

              <Grid container spacing="4" className={classes.preMed} alignItems="center" >
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Are your ankles often badly swollen?"
                />
              </Grid>

              <Grid container spacing="4" className={classes.preMed} alignItems="center" >
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Do cold hands or feet trouble you even in hot weather?"
                />
              </Grid>

              <Grid container spacing="4" className={classes.preMed} alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Has a doctor ever said that you have or have had heart trouble, an abnormal electrocardiogram
                  (ECG or EKG), heart attack or coronary?"
                />
              </Grid>

              <Grid container spacing="4" className={classes.preMed} alignItems="center" >
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Do you suffer from frequent cramps in your legs?"
                />
              </Grid>

              <Grid container spacing="4" className={classes.preMed} alignItems="center" >
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Do you often have difficulty breathing?"
                />
              </Grid>

              <Grid container spacing="4" className={classes.preMed} alignItems="center" >
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Do you get out of breath long before anyone else?"
                />
              </Grid>

              <Grid container spacing="4" className={classes.preMed} alignItems="center" >
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Do you sometimes get out of breath when sitting still or sleeping?"
                />
              </Grid>

              <Grid container spacing="4" className={classes.preMed} alignItems="center" >
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Has a doctor ever told you your cholesterol level was high?"
                />
              </Grid>

              <Grid container spacing="4" className={classes.preMed} alignItems="center" >
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Has a doctor ever told you that you have an abdominal aortic aneurysm?"
                />
              </Grid>

              <Grid container spacing="4" className={classes.preMed} alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="as a doctor ever told you that you have critical aortic stenosis?"
                />
              </Grid>
            </div>

            <Grid container spacing="4" className={classes.textarea}>
              <Grid container item sm="12" md="12" lg="12" xl="12" >
                {/* <TextArea placeholder="Comments" onChange={handleComments} /> */}
                  <Input
                    className="p-8 w-full border-1"
                    classes={{ root: 'text-13' }}
                    placeholder="Add a comment.."
                    multiline
                    rows="6"
                    margin="none"
                    disableUnderline
                  />
              </Grid>
            </Grid>
          </div>
        </div>

        <div className={classes.medical_exp}>
          <div className={classes.exp_title}>
            <p>
              <strong>
                Do you now have or have you recently experienced:
            </strong>
            </p>

            <div className={classes.quote}>
              <Grid container spacing="4" alignItems="center">
                  <CheckboxFormsy
                    className="my-16"
                    name="accept"
                    value={false}
                    label="Chronic, recurrent or morning cough?"
                  />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Episode of coughing up blood?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Increased anxiety or depression?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Problems with recurrent fatigue, trouble sleeping or increased irritability?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Migraine or recurrent headaches?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Swollen or painful knees or ankles?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Swollen, stiff or painful joints?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Pain in your legs after walking short distances?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Foot problems?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Back problems?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Stomach or intestinal problems, such as recurrent heartburn, ulcers, constipation or diarrhea?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Significant vision or hearing problems?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Recent change in a wart or a mole?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center" >
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Has a doctor ever told you your cholesterol level was high?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Glaucoma or increased pressure in the eyes?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Exposure to loud noises for long periods?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="An infection such as pneumonia accompanied by a fever?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Significant unexplained weight loss?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="A fever, which can cause dehydration and rapid heartbeat?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="A deep vein thrombosis (blood clot)?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="A hernia that is causing symptoms?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Foot or ankle sores that won’t heal?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Persistent pain or problems walking after you have fallen?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Eye conditions such as bleeding in the retina or detached retina?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Cataract or lens transplant?"
                />
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <CheckboxFormsy
                  className="my-16"
                  name="accept"
                  value={false}
                  label="Laser treatment or other eye surgery?"
                />
              </Grid>
            </div>
            <Grid container spacing="4" className={classes.textarea}>
              <Grid container item sm="12" md="12" lg="12" xl="12">
                <Input
                  className="p-8 w-full border-1"
                  classes={{ root: 'text-13' }}
                  placeholder="Add a comment.."
                  multiline
                  rows="6"
                  margin="none"
                  disableUnderline
                />
              </Grid>
            </Grid>
          </div>
        </div>

        <div className={classes.medical_women}>
          <div className={classes.exp_title}>
            <p>
              <strong>
                Women only answer the following. Do you have:
            </strong>
            </p>

            <Grid container spacing="4" alignItems="center" className={classes.quote}>
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Urine loss when you cough, sneeze or laugh?"
              />
            </Grid>

            <Grid container spacing="4" className={classes.preMed}>
              <Grid container item sm="6" md="6" lg="6" xl="6">
                <p>Date of the last pelvic exam and / or Pap smear</p>
              </Grid>
              <Grid container item sm="4" md="4" lg="4" xl="4">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="name"
                required
              />
              </Grid>
            </Grid>

            <Grid container spacing="4" className={classes.textarea}>
              <Grid container item sm="12" md="12" lg="12" xl="12">
                <Input
                  className="p-8 w-full border-1"
                  classes={{ root: 'text-13' }}
                  placeholder="Add a comment.."
                  multiline
                  rows="6"
                  margin="none"
                  disableUnderline
							  />
              </Grid>
            </Grid>

            <Grid container spacing="4">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Are you on any type of hormone replacement therapy?"
              />
            </Grid>
          </div>
        </div>

        <div className={classes.men_women}>
          <div className={classes.exp_title}>
            <p>
              <strong>
                Men and women answer the following:
            </strong>
            </p>
          </div>

          <Grid container spacing="4">
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <p>
                List any prescription medications you are now taking:
              </p>
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                // label="Employee name"
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid container item sm="8" md="8" lg="8" xl="8">
              <p>
                List any self-prescribed medications, dietary supplements, or vitamins you are now taking:
              </p>
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                // label="Employee name"
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <div>
            <RadioGroupFormsy
              className="my-16"
              name="gender"
              // label="Gender"
              // validations="equals:female"
              // validationError="Only ladies are accepted"
              required
            >
              <Grid container spacing="4" alignItems="center">
                <Grid container item sm="5" md="5" lg="5" xl="5">
                  <p>
                    Date of last complete physical examination:
                  </p>
                </Grid>
                <Grid container item sm="4" md="4" lg="4" xl="4">
                  <TextFieldFormsy
                    className="mb-16 w-full"
                    type="date"
                    name="name"
                    required
                  />
                </Grid>
              </Grid>

              <Grid container spacing="4" alignItems="center">
                <Grid container item xs="3" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="Normal" control={<Radio color="primary" />} />
                  <span>Normal</span>
                </Grid>

                <Grid container item xs="4" md="4" lg="4" lx="4" alignItems="center">
                  <FormControlLabel value="Abnormal" control={<Radio color="primary" />} />
                  <span>Abnormal</span>
                </Grid>

                <Grid container item xs="4" md="4" lg="4" lx="4" alignItems="center">
                  <FormControlLabel value="Never" control={<Radio color="primary" />} />
                  <span>Never</span>
                </Grid>

                <Grid container item xs="4" md="4" lg="4" lx="4" alignItems="center">
                  <FormControlLabel value="Can't remember" control={<Radio color="primary" />} />
                  <span>Can't remember</span>
                </Grid>
              </Grid>
            </RadioGroupFormsy>
          </div>

          <div>
            <RadioGroupFormsy
              className="my-16"
              name="gender"
              // label="Gender"
              // validations="equals:female"
              // validationError="Only ladies are accepted"
              required
            >
              <Grid container spacing="4" alignItems="center">
                <Grid container item sm="4" md="4" lg="4" xl="4">
                  <p>
                    Date of last chest X-ray:
                  </p>
                </Grid>
                <Grid container item sm="4" md="4" lg="4" xl="4">
                  <TextFieldFormsy
                    className="mb-16 w-full"
                    type="date"
                    name="name"
                    required
                  />
                </Grid>
              </Grid>

              <Grid container spacing="4" >
                <Grid container item xs="3" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="Normal" control={<Radio color="primary" />} />
                  <span>Normal</span>
                </Grid>

                <Grid container item xs="3" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="Abnormal" control={<Radio color="primary" />} />
                  <span>Abnormal</span>
                </Grid>

                <Grid container item xs="3" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="Never" control={<Radio color="primary" />} />
                  <span>Never</span>
                </Grid>

                <Grid container item xs="3" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="Can't remember" control={<Radio color="primary" />} />
                  <span>Can't remember'</span>
                </Grid>
              </Grid>
            </RadioGroupFormsy>
          </div>

          <div>
            <RadioGroupFormsy
              className="my-16"
              name="gender"
              // label="Gender"
              // validations="equals:female"
              // validationError="Only ladies are accepted"
              required
            >
              <Grid container spacing="4">
                <Grid container item sm="5" md="5" lg="5" xl="5">
                  <p>
                    Date of last electrocardiogram (EKG or ECG):
                  </p>
                </Grid>
                <Grid container item sm="4" md="4" lg="4" xl="4">
                  <TextFieldFormsy
                    className="mb-16 w-full"
                    type="date"
                    name="name"
                    required
                  />
                </Grid>
              </Grid>

              <Grid container spacing="4">
                <Grid container item xs="3" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="Normal" control={<Radio color="primary" />} />
                  <span>Normal</span>
                </Grid>

                <Grid container item xs="3" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="Abnormal" control={<Radio color="primary" />} />
                  <span>Abnormal</span>
                </Grid>

                <Grid container item xs="3" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="Never" control={<Radio color="primary" />} />
                  <span>Never</span>
                </Grid>

                <Grid container item xs="3" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="Can't remember" control={<Radio color="primary" />} />
                  <span>Can't remember</span>
                </Grid>
              </Grid>
            </RadioGroupFormsy>
          </div>

          <div>
            <RadioGroupFormsy
              className="my-16"
              name="gender"
              // label="Gender"
              // validations="equals:female"
              // validationError="Only ladies are accepted"
              required
            >
              <Grid container spacing="4" >
                <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
                  <p>
                    Date of last dental checkup:
                  </p>
                </Grid>
                <Grid container item sm="5" md="5" lg="5" xl="5" alignItems="center">
                  <TextFieldFormsy
                    className="mb-16 w-full"
                    type="date"
                    name="name"
                    required
                  />
                </Grid>
              </Grid>

              <Grid container spacing="4">
                <Grid container item xs="3" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="Normal" control={<Radio color="primary" />} />
                  <span>Normal</span>
                </Grid>

                <Grid container item xs="3" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="Abnormal" control={<Radio color="primary" />} />
                  <span>Abnormal</span>
                </Grid>

                <Grid container item xs="3" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="Never" control={<Radio color="primary" />} />
                  <span>Never</span>
                </Grid>

                <Grid container item xs="3" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="Can't remember" control={<Radio color="primary" />} />
                  <span>Can't remember</span>
                </Grid>
              </Grid>
            </RadioGroupFormsy>
          </div>

          <div>
            <Grid container spacing="4">
              <Grid container item sm="6" md="6" lg="6" xl="6">
                <p>
                  List any other medical or diagnostic test you have had in the past two years:
              </p>
              </Grid>
              <Grid container item sm="4" md="4" lg="4" xl="4">
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="text"
                  name="name"
                  // label="Employee number"
                  validations={{
                    minLength: 1,
                  }}
                  validationErrors={{
                    minLength: 'Min character length is 1',
                  }}
                  required
                />
              </Grid>
            </Grid>

            <Grid container spacing="4">
              <Grid container item sm="6" md="6" lg="6" xl="6">
                <p>
                  List hospitalizations, including dates of and reasons for hospitalization:
              </p>
              </Grid>
              <Grid container item sm="4" md="4" lg="4" xl="4">
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="text"
                  name="name"
                  // label="Employee number"
                  validations={{
                    minLength: 1,
                  }}
                  validationErrors={{
                    minLength: 'Min character length is 1',
                  }}
                  required
                />
              </Grid>
            </Grid>

            <Grid container spacing="4">
              <Grid container item sm="3" md="3" lg="3" xl="3">
                <p>
                  List any drug allergies:
              </p>
              </Grid>
              <Grid container item sm="6" md="6" lg="6" xl="6">
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="text"
                  name="name"
                  // label="Employee number"
                  validations={{
                    minLength: 1,
                  }}
                  validationErrors={{
                    minLength: 'Min character length is 1',
                  }}
                  required
                />
              </Grid>
            </Grid>
          </div>
        </div>

        <div>
          <div>
            <h4><strong>Past Medical History</strong></h4>
          </div>
          <p>
            <strong>
              Check those questions to which your answer is yes (leave others blank).
          </strong>
          </p>

          <div className={classes.quote}>
            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Laser treatment or other eye surgery?"
              />
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                // label="Employee name"
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>

            <Grid container spacing="4" alignItems="center" >
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Rheumatic Fever"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Heart murmur"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Diseases of the arteries"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Varicose veins"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Arthritis of legs or arms"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Diabetes or abnormal blood-sugar tests"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Phlebitis (inflammation of a vein)"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Dizziness or fainting spells"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Epilepsy or seizures"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Stroke"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Diphtheria"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Scarlet Fever"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Infectious mononucleosis"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Nervous or emotional problems"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center" >
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Anemia"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Thyroid problems"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Pneumonia"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Bronchitis"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center" >
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Asthma"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center" >
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Abnormal chest X-ray"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Other lung disease"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Injuries to back, arms, legs or joint"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Broken bones"
              />
            </Grid>

            <Grid container spacing="4" alignItems="center">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Jaundice or gall bladder problems"
              />
            </Grid>
          </div>

          <Grid container spacing="4" className={classes.textarea}>
            <Grid container item sm="12" md="12" lg="12" xl="12">
              <Input
                className="p-8 w-full border-1"
                classes={{ root: 'text-13' }}
                placeholder="Add a comment.."
                multiline
                rows="6"
                margin="none"
                disableUnderline
						  />
            </Grid>
          </Grid>
        </div>

        <div className={classes.fam_med}>
          <div class>
            <h4><strong>Family Medical History</strong></h4>
          </div>

          <p>
            <strong>
              Familial Diseases
            </strong>
          </p>

          <p className={classes.para}>
            Have you or your blood relatives had any of the following (include grandparents, aunts and uncles, but exclude
            cousins, relatives by marriage and half-relatives)?
        </p>

          <p>
            Check those to which the answer is yes (leave other blank).
        </p>

          <div className={classes.quote}>
            <Grid container spacing="4">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Heart attacks under age 50"
              />
            </Grid>


            <Grid container spacing="4" >
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Strokes under age 50"
              />
            </Grid>

            <Grid container spacing="4">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="High blood pressure"
              />
            </Grid>

            <Grid container spacing="4">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="High blood pressure"
              />
            </Grid>

            <Grid container spacing="4">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Diabetes"
              />
            </Grid>

            <Grid container spacing="4">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Asthma or hay fever"
              />
            </Grid>

            <Grid container spacing="4">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Congenital heart disease (existing at birth but not hereditary)"
              />
            </Grid>

            <Grid container spacing="4">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Heart operations"
              />
            </Grid>

            <Grid container spacing="4">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Glaucoma"
              />
            </Grid>

            <Grid container spacing="4">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Obesity (20 or more pounds overweight)"
              />
            </Grid>

            <Grid container spacing="4">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Leukemia or cancer under age 60"
              />
            </Grid>
          </div>

          <Grid container spacing="4" className={classes.textarea}>
            <Grid container item sm="12" md="12" lg="12" xl="12">
              <Input
                className="p-8 w-full border-1"
                classes={{ root: 'text-13' }}
                placeholder="Add a comment.."
                multiline
                rows="6"
                margin="none"
                disableUnderline
              />
            </Grid>
          </Grid>
        </div>

        <div className={classes.heart}>
          <h4>
            <span>Other Heart Disease Risk Factors</span>
          </h4>


          <p><strong>Smoking</strong></p>

          <p>
            Have you ever smoked cigarettes, cigars or a pipe?
          </p>

          <div className={classes.display}>
          <RadioGroupFormsy
            className="my-16"
            name="gender"
            // label="Gender"
            // validations="equals:female"
            // validationError="Only ladies are accepted"
            required
          >
            <FormControlLabel value="yes" control={<Radio color="primary"/>} label="Yes"/>
            <FormControlLabel value="no" control={<Radio color="primary"/>} label="No"/>
          </RadioGroupFormsy>
          </div>

          <p>(If no, skip to diet section)</p>

          <Grid container spacing="4">
            <Grid container item sm="12" md="12" lg="7" xl="7">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder= 'If you did or now smoke cigarettes, how many per day? '
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
            <Grid container item sm="12" md="12" lg="5" xl="5">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder= 'Age started'
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid container item sm="12" md="12" lg="7" xl="7">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder= 'If you did or now smoke cigars, how many per day?'
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
            <Grid container item sm="12" md="12" lg="5" xl="5">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder= 'Age started'
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid container item sm="12" md="12" lg="7" xl="7">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder= 'If you did or now smoke a pipe, how many pipefuls a day?'
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
            <Grid container item sm="12" md="12" lg="5" xl="5">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder= 'Age started'
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid container item sm="12" md="12" lg="12" xl="12">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder= 'If you have stopped smoking, when was it?'
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid container item sm="12" md="12" lg="12" xl="12">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder= 'If you now smoke, how long ago did you start?'
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>
        </div>

        <div>
          <div>
            <p><strong>Diet</strong></p>
          </div>

          <Grid container spacing="4">
            <Grid container item sm="12" md="6" lg="6" xl="6">
              <p>
                What do you consider a good weight for yourself?
            </p>
            </Grid>
            <Grid container item sm="12" md="6" lg="6" xl="6">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder= 'What do you consider a good weight for yourself?'
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid container item sm="12" md="6" lg="6" xl="6">
              <p>
                What is the most you have ever weighed (including when pregnant)?
            </p>
            </Grid>
            <Grid container item sm="12" md="6" lg="6" xl="6">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder= 'What is the most you have ever weighed (including when pregnant)?'
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid container item sm="4" md="4" lg="4" xl="4">
              <p>
                How old were you?
            </p>
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder= 'How old were you? '
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid container item sm="4" md="4" lg="4" xl="4">
              <p>
                My current weight is:
            </p>
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder= 'My current weight is'
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid container item sm="4" md="4" lg="4" xl="4">
              <p>
                One year ago my weight was:
            </p>
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder= 'One year ago my weight was'
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid container item sm="4" md="4" lg="4" xl="4">
              <p>
                At age 50 my weight was:
            </p>
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder= 'At age 50 my weight was'
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid container item sm="5" md="5" lg="5" xl="5">
              <p>
                Number of meals you usually eat per day:
            </p>
            </Grid>
            <Grid container item sm="5" md="5" lg="5" xl="5">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder= 'Number of meals you usually eat per day'
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <div className={classes.display}>
          <RadioGroupFormsy
            className="my-16"
            name="gender"
            // label="Gender"
            // validations="equals:female"
            // validationError="Only ladies are accepted"
            required
          >
            <FormControlLabel value="yes" control={<Radio color="primary"/>} label="Yes"/>
            <FormControlLabel value="no" control={<Radio color="primary"/>} label="No"/>
          </RadioGroupFormsy>
          </div>

          <p>
            If yes, what is your approximate intake of these beverages?
          </p>

          <p><strong>Beer</strong></p>

          <div>
            <RadioGroupFormsy
              className="my-16"
              name="gender"
              // label="Gender"
              // validations="equals:female"
              // validationError="Only ladies are accepted"
              required
            >
              <Grid container spacing="4">
                <Grid container item xs="12" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="None" control={<Radio color="primary" />} />
                  <span>None</span>
                </Grid>

                <Grid container item xs="12" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="Occasional" control={<Radio color="primary" />} />
                  <span>Occasional</span>
                </Grid>

                <Grid container item xs="12" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="Often" control={<Radio color="primary" />} />
                  <span>Often</span>
                </Grid>

                <Grid container item xs="12" md="3" lg="3" lx="3">
                  <TextFieldFormsy
                    className="mb-16 w-full"
                    type="text"
                    name="name"
                    placeholder='If often, ___ per week'
                    validations={{
                      minLength: 1,
                    }}
                    validationErrors={{
                      minLength: 'Min character length is 1',
                    }}
                    required
                  />
                </Grid>
              </Grid>
            </RadioGroupFormsy>
          </div>

          <p><strong>Wine</strong></p>

          <div>
            <RadioGroupFormsy
              className="my-16"
              name="gender"
              // label="Gender"
              // validations="equals:female"
              // validationError="Only ladies are accepted"
              required
            >
              <Grid container spacing="4">
                <Grid container item xs="12" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="None" control={<Radio color="primary" />} />
                  <span>None</span>
                </Grid>

                <Grid container item xs="12" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="Occasional" control={<Radio color="primary" />} />
                  <span>Occasional</span>
                </Grid>

                <Grid container item xs="12" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="Often" control={<Radio color="primary" />} />
                  <span>Often</span>
                </Grid>

                <Grid container item xs="12" md="3" lg="3" lx="3" alignItems="center">
                <TextFieldFormsy
                    className="mb-16 w-full"
                    type="text"
                    name="name"
                    placeholder='If often, ___ per week'
                    validations={{
                      minLength: 1,
                    }}
                    validationErrors={{
                      minLength: 'Min character length is 1',
                    }}
                    required
                  />
                </Grid>
              </Grid>
            </RadioGroupFormsy>
          </div>

          <p><strong>Hard Liquor</strong></p>

          <div>
            <RadioGroupFormsy
              className="my-16"
              name="gender"
              // label="Gender"
              // validations="equals:female"
              // validationError="Only ladies are accepted"
              required
            >
              <Grid container spacing="4">
                <Grid container item xs="12" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="None" control={<Radio color="primary" />} />
                  <span>None</span>
                </Grid>

                <Grid container item xs="12" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="Occasional" control={<Radio color="primary" />} />
                  <span>Occasional</span>
                </Grid>

                <Grid container item xs="12" md="3" lg="3" lx="3" alignItems="center">
                  <FormControlLabel value="Often" control={<Radio color="primary" />} />
                  <span>Often</span>
                </Grid>

                <Grid container item xs="12" md="3" lg="3" lx="3" alignItems="center">
                  <TextFieldFormsy
                    className="mb-16 w-full"
                    type="text"
                    name="name"
                    placeholder='If often, ___ per week'
                    validations={{
                      minLength: 1,
                    }}
                    validationErrors={{
                      minLength: 'Min character length is 1',
                    }}
                    required
                  />
                </Grid>
              </Grid>
            </RadioGroupFormsy>
          </div>

          <div>
            <p>
              At any time in the past, were you a heavy drinker (consumption of 177mls of hard liquor per day or more)?
            </p>

            <div className={classes.display}>
            <RadioGroupFormsy
              className="my-16"
              name="gender"
              // label="Gender"
              // validations="equals:female"
              // validationError="Only ladies are accepted"
              required
            >
              <FormControlLabel value="yes" control={<Radio color="primary"/>} label="Yes"/>
              <FormControlLabel value="no" control={<Radio color="primary"/>} label="No"/>
            </RadioGroupFormsy>
            </div>
          </div>

          <Grid container spacing="4" className={classes.textarea}>
            <Grid container item sm="12" md="12" lg="12" xl="12">
              <Input
                className="p-8 w-full border-1"
                classes={{ root: 'text-13' }}
                placeholder="Add a comment.."
                multiline
                rows="6"
                margin="none"
                disableUnderline
              />
            </Grid>
          </Grid>


        </div>

        <div>
          <div>
            <h4><strong>DECLARATION:</strong></h4>
          </div>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="4" md="4" lg="4" xl="4">
              <p>
                Number of meals you usually eat per day:
            </p>
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder='Number of meals you usually eat per day'
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />

            </Grid>
          </Grid>

          {/* <p>
            I agree that these and all statements I have made or shall make to the assurer or to its medical examiner(s) in
            connection with this or previous proposal(s) shall be the basis of this contract.
          </p> */}

          <div style={{ margin: '1rem 0' }}>
            <Grid container spacing="4" alignItems="center">
              <Grid container item sm="12" md="4" lg="4" alignItems="center" >
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="I agree that these and all statements I have made or shall make to the assurer or to its medical examiner(s) in
                connection with this or previous proposal(s) shall be the basis of this contract."
                validations={{
                  equals: true,
                }}
                validationErrors={{
                  equals: "You need to accept"
                }}
              />
              </Grid>
              <Grid container item sm="12" md="4" lg="4" alignItems="center">
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="date"
                  name="name"
                  required
                />
              </Grid>
            </Grid>
          </div>

        </div>

      </div>
    </Formsy>
  );
};

export default AxaMansardGeriatricsForm;