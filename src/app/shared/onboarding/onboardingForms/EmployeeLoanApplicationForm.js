import React from 'react';
import TextInput from '../../../../../shared/inputs/textInputs';
import Date from '../../../../../shared/dates/date';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { boxShadows } from '../../../../../styles/boxShadow';
import container from '../../../../../styles/container';
import authIcon from '../../../../../styles/authIcon';
import title from '../../../../../styles/title';
import FileInput from '../../../../../shared/inputs/fileInput';
import MoneyRoundedIcon from "@material-ui/icons/MoneyRounded";

const useStyles = makeStyles(() => ({
  para: {
    textAlign: 'justify',
    padding: '0 0 2rem 0',
  },
  sections: {
    border: '1px solid #000',
    margin: '2rem 0',
    padding: '0 1rem 1rem 1rem',
  },
  text: {
    textAlign: 'justify',
  },
}));

const EmployeeLoanApplicationForm = () => {
  //styles
  const card = boxShadows();
  const wrapper = container();
  const icon = authIcon();
  const heading = title();
  const classes = useStyles();

  return (
    <div className={card.card_boxshadow}>
      <div className={wrapper.container}>
        <header className={heading.title}>
          <h2>
            <span className={icon.authIcon}>
              <MoneyRoundedIcon />
            </span>
            <strong>
              EMPLOYEE LOAN APPLICATION FORM
            </strong>
          </h2>
        </header>

        <p>
          <strong>
            Please complete Applicant Section and obtain Department Head's certification. Return Application to: Director of Support Services, 20A Babatunde Anjous Street, Lekki Phase 1, Lagos
          </strong>
        </p>

        <div className={classes.sections}>
          <p>
            <strong>Applicant Section (to be completed by employee)</strong>
          </p>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Requested Loan Amount:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Purpose:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="4" md="4" lg="4" xl="4" >
              <span><strong>Name:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4" >
              <span><strong>Staff ID:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4" >
              <span><strong>Annual Pay:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="4" md="4" lg="4" xl="4" >
              <p><strong>Employment Date:</strong></p>
              <Date dateData={''} />
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4" >
              <span><strong>Employment Type:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4" >
              <span><strong>Duration (where applicable):</strong></span>
              <TextInput textInputData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Department:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Work Location:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="12" md="12" lg="12" xl="12" >
              <span><strong>Residential Address:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>State:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Country:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Email Address:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Work Phone:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Mobile Phone:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Home Phone:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="12" md="12" lg="12" xl="12" >
              <p className={classes.text}>
                For the purpose of obtaining the herein requested loan from SpringRock Group and having gone through the checklist below, the
                undersigned warrants the truth and accuracy of the foregoing information. I agree that the application shall remain the property of
                SpringRock Group whether or not the loan is granted. I agree that information regarding the account may be given to a credit
                bureau. I affirm that I know of no reason or condition that would prevent me from repaying this loan and that I do not presently have
                an outstanding employee loan with SpringRock Group or any other organization. I further understand that regularly scheduled
                payments are required even if I do not receive my salary, and if I terminate my employment before this loan is paid, I promise that the amount remaining shall be paid in full as of the last day of my employment.
              </p>
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="12" md="12" lg="12" xl="12" >
              <p>
                I authorize SpringRock Group to obtain such information as it may reasonably require relative to this application, including a credit
                history.
              </p>
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <div>
                <p><strong>Signature of Applicant:</strong></p>
                <FileInput onChange={''} />
              </div>
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <p><strong>Date:</strong></p>
              <Date dateData={''} />
            </Grid>
          </Grid>
        </div>

        <div className={classes.sections}>
          <p>
            <strong>Approvals:</strong>
          </p>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Name:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Designation:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <div>
                <p><strong>Signature:</strong></p>
                <FileInput onChange={''} />
              </div>
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <p><strong>Date:</strong></p>
              <Date dateData={''} />
            </Grid>
          </Grid>
        </div>

        <div className={classes.sections}>
          <p>
            <strong>Human Resources</strong>
          </p>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="12" md="12" lg="12" xl="12" >
              <span><strong>Loan Amount Approved:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Name:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Designation:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Signature:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <p><strong>Date:</strong></p>
              <Date dateData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Name:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Designation:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Signature:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <p><strong>Date:</strong></p>
              <Date dateData={''} />
            </Grid>
          </Grid>
        </div>

        <div className={classes.sections}>
          <p>
            <strong>FINANCE</strong>
          </p>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Approval Received on:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <p><strong>Date:</strong></p>
              <Date dateData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="12" md="12" lg="12" xl="12" >
              <span><strong>First installment due on:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>No of installments to payoff loan/advance:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <p><strong>Expected Payoff date:</strong></p>
              <Date dateData={''} />
            </Grid>
          </Grid>

          <p>The source of transfer is</p>

          <p><strong>1. Cheque</strong></p>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="4" md="4" lg="4" xl="4" >
              <span><strong>Cheque No:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4" >
              <span><strong>Bank Name:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4" >
              <p><strong>Date:</strong></p>
              <Date dateData={''} />
            </Grid>
          </Grid>

          <p>
            <strong>2. Bank Transfer</strong>
          </p>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="4" md="4" lg="4" xl="4" >
              <span><strong>Account No.:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4" >
              <span><strong>Bank Name:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4" >
              <p><strong>Date:</strong></p>
              <Date dateData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Finance Officer’s Name:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <span><strong>Title:</strong></span>
              <TextInput textInputData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <div>
                <p><strong>Signature:</strong></p>
                <FileInput onChange={''} />
              </div>
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6" >
              <p><strong>Date:</strong></p>
              <Date dateData={''} />
            </Grid>
          </Grid>
        </div>

        <p>
          <strong>
            Requirement Checklist
          </strong>
        </p>

        <p className={classes.para}>
          An active employee, who is eligible for full time benefits, has completed their probationary period, and who does not have an outstanding employee
          loan, can apply for an employee loan in an amount that does not exceed thirty-three percent (33%) of their annual salary. The loan is repaid through
          payroll deductions over a period not to exceed twelve months. The approval process includes a review of the applicants standing with SpringRock
          Group and their creditworthiness. Applications will not be approved if the employee has outstanding debt due to SpringRock Group or has liens or
          garnishments attaching their wages. Employees who do not receive a salary (for leave of absence or other reason) must make regularly scheduled
          payments by the due date. Failure to remit payments as scheduled will result in the assessment of a late fee equal to ten percent (10%) of the payment
          amount. Employees, who terminate before the loan is paid, must pay the remaining balance by the last day of employment. Any outstanding loan
          amount for terminated employees would be charged at commercial rate and reported to a Credit Bureau and any costs and legal fees shall be borne by
          the borrower.
        </p>
      </div>
    </div>
  );
};

export default EmployeeLoanApplicationForm;
