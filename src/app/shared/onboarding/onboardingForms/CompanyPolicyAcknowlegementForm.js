import React from 'react';
import Formsy from 'formsy-react';
import { TextFieldFormsy, CheckboxFormsy } from '@fuse/core/formsy';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { inputStyles } from '../../EmployeeFormInput';
import Checkbox from '@material-ui/core/Checkbox';
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";

const CompanyPolicyAcknowledgementForm = () => {
  //styles
  const card = inputStyles();

  return (
    <Formsy>
      <div className={card.formField}>
        <div className={card.container}>
          <div className={card.title}>
            <h1>
              <span className={card.AuthIcon}><MenuBookRoundedIcon /></span>
              COMPANY POLICY ACKNOWLEDGEMENT FORM</h1>
          </div>
          <Grid container spacing="4" alignItems="center">
            <Grid item xs="2">
              <p><b>Employee Name:</b></p>
            </Grid>
            <Grid item xs="10">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder="Employee name"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="1">
              <p><b>S/N</b></p>
            </Grid>
            <Grid item xs="8">
              <p><b>POLICY</b></p>
            </Grid>
            <Grid item xs="3">
              <p><b>EMPLOYEE SIGN/DATE</b></p>
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="1">
              <p><b>A</b></p>
            </Grid>
            <Grid item xs="8">
              <div>
                <p>
                  <b>
                    SPRINGROCK ENERGY LTD ETHICS AND BUSINESS CONDUCT POLICY
                  </b>
                </p>
                <p>
                  I have read and fully understand the company’s policy on Ethics and Business Conduct attached herewith. In addition, all questions I may have had concerning the policy have clarified by my supervisor.
                </p>
              </div>
            </Grid>
            <Grid item xs="3">
              <CheckboxFormsy
                className="mb-16 w-full"
                name="accept"
                value={false}
                label="Agreed"
                validations={{
                  equals: true,
                }}
                validationErrors={{
                  equals: "You need to accept"
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="1">
              <p><b>B</b></p>
            </Grid>
            <Grid item xs="8">
              <div>
                <p>
                  <b>
                    SPRINGROCK ENERGY LTD SEXUAL HARASSMENT-FREE WORKPLACE POLICY
                  </b>
                </p>
                <p>
                  I have read and fully understand the company’s policy on Sexual Harassment attached hereto. In additions, all questions I may have had concerning the policy have been clarified by my supervisor
                </p>
              </div>
            </Grid>
            <Grid item xs="3">
              <CheckboxFormsy
                className="mb-16 w-full"
                name="accept"
                value={false}
                label="Agreed"
                validations={{
                  equals: true,
                }}
                validationErrors={{
                  equals: "You need to accept"
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="1">
              <p><b>C</b></p>
            </Grid>
            <Grid item xs="8">
              <div>
                <p>
                  <b>
                    SPRINGROCK ENERGY LTD INFORMATION SECURITY POLICY
                  </b>
                </p>
                <p>
                  I have read and fully understand the company’s Information Security Policy attached herewith. I have asked all questions I have concerning the policy, and they have been clarified by my manager.
                </p>
              </div>
            </Grid>
            <Grid item xs="3">
              <CheckboxFormsy
                className="mb-16 w-full"
                name="accept"
                value={false}
                label="Agreed"
                validations={{
                  equals: true,
                }}
                validationErrors={{
                  equals: "You need to accept"
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="1">
              <p><b>D</b></p>
            </Grid>
            <Grid item xs="8">
              <div>
                <p>
                  <b>
                    SPRINGROCK ENERGY LTD DRIVING AND SEAT BELT POLICY
                  </b>
                </p>
                <p>
                  I have read and fully understand the company’s Driving and Seat Belt policy attached herein. In addition, l have asked all questions I have concerning the policy and they have been clarified by my manager.
                </p>
              </div>
            </Grid>
            <Grid item xs="3">
              <CheckboxFormsy
                className="mb-16 w-full"
                name="accept"
                value={false}
                label="Agreed"
                validations={{
                  equals: true,
                }}
                validationErrors={{
                  equals: "You need to accept"
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="1">
              <p><b>E</b></p>
            </Grid>
            <Grid item xs="8">
              <div>
                <p>
                  <b>
                    SPRINGROCK ENERGY LTD NON-DISCLOSURE POLICY
                  </b>
                </p>
                <p>
                  I have read and fully understand the company’s Non-Disclosure/ Confidentiality Policy attached herewith. I have asked all questions I have concerning the policy, and they have been clarified by my manager.
                </p>
              </div>
            </Grid>
            <Grid item xs="3">
              <CheckboxFormsy
                className="mb-16 w-full"
                name="accept"
                value={false}
                label="Agreed"
                validations={{
                  equals: true,
                }}
                validationErrors={{
                  equals: "You need to accept"
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="1">
              <p><b>F</b></p>
            </Grid>
            <Grid item xs="8">
              <div>
                <p>
                  <b>
                    SPRINGROCK ENERGY LTD SUBSTANCE ABUSE POLICY
                  </b>
                </p>
                <p>
                  I have read and fully understand the company’s Substance Abuse Policy attached herewith. I have asked all questions I have concerning the policy, and they have been clarified by my manager.
                </p>
              </div>
            </Grid>
            <Grid item xs="3">
              <CheckboxFormsy
                className="mb-16 w-full"
                name="accept"
                value={false}
                label="Agreed"
                validations={{
                  equals: true,
                }}
                validationErrors={{
                  equals: "You need to accept"
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="1">
              <p>I,</p>
            </Grid>
            <Grid item xs="2">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                label="Full name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="9">
              <p>will report all violations or suspected violations of these policies to management immediately and I will confirm in writing whether such violation(s) has occurred or not. I understand that any violation or failure to report violations of these policies above will result in disciplinary action up to and including dismissal.</p>
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="6">
              <span>Employee (Name/ Signature)</span>
              <CheckboxFormsy
                className="mb-16 w-full"
                name="accept"
                value={false}
                label="Agreed"
                validations={{
                  equals: true,
                }}
                validationErrors={{
                  equals: "You need to accept"
                }}
              />
            </Grid>
            <Grid item xs="6">
              <span>Date</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="name"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid item xs="6">
              <span>Witnessed by (Name/ Signature) SpringRock Energy Ltd Representative</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="file"
                name="name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="6">
              <span>Date</span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="name"
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
    </Formsy >
  );
};

export default CompanyPolicyAcknowledgementForm;
