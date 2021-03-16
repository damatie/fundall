import React from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createReimburibleExpenses, updateReimburibleExpenses } from '../store/actions';
import Typography from '@material-ui/core/Typography';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';
import Input from 'app/shared/TextInput/Input';
import 'react-phone-input-2/lib/material.css';

const schema = yup.object().shape({
  bankName: yup.string().required(),
  bankBranch: yup.string().required(),
  accountNumber: yup.string().required(),
  bankAddress: yup.string().required(),
  abaRoutingNo: yup.string().required(),
  swiftCode: yup.string().required(),
  sortCode: yup.string().required(),
  iban: yup.string().required()
});

const { useState, useMemo } = React;

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  }
}));


const ReimbursibleExpenses = () => {

  const classes = useStyles();

  const { employeeInfo: { info } } = useSelector(state => state.onboardingForms);

  const dispatch = useDispatch();

  const inputs = useMemo(() => [
    {
      name: 'employeeName',
      label: 'Employee Name',
      type: 'text',
      defaultValue: `${info.firstName} ${info.lastName}`,
    },
    {
      name: 'employeeNumber',
      label: 'Employee Number',
      type: 'text',
      defaultValue: `${info.srgIdNumber}`,
    },
    {
      name: 'bankName',
      label: 'Bank Name',
      type: 'text',
      defaultValue: '',
    },
    {
      name: 'bankBranch',
      label: 'Bank Branch',
      type: 'text',
      defaultValue: '',
    },
    {
      name: 'accountNumber',
      label: 'Account Number',
      type: 'number',
      defaultValue: '',
    },
    {
      name: 'bankAddress',
      label: 'Bank Address',
      type: 'text',
      defaultValue: '',
    },
    {
      name: 'abaRoutingNo',
      label: 'ABA ROUTING No',
      type: 'text',
      defaultValue: '',
    },
    {
      name: 'swiftCode',
      label: 'SWIFT CODE',
      type: 'text',
      defaultValue: '',
    },
    {
      name: 'sortCode',
      label: 'SORT CODE',
      type: 'phoneNumber',
      defaultValue: '',
    },
    {
      name: 'iban',
      label: 'IBAN',
      type: 'text',
      defaultValue: '',
    },
  ], [info]);

  const {
    control,
    register,
    errors,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData) => {
    console.log(formData);
    dispatch(createReimburibleExpenses(formData));
  };

  return (
    <section className={classes.root}>
      <Typography className='my-16' variant="h5" color="initial"><b>AUTHORIZATION FORM FOR DIRECT DEPOSIT OF REIMBURSABLE EXPENSES</b></Typography>
      <Typography className='my-16 w-9/12 mx-auto' variant="body1" color="initial">I understand SpringRock provides the service of Direct Depositing reimbursable expenses. As an employee/consultant l will receive an advice detailing the total amount of money deposited to my account as reimbursements for SpringRock business expenses incurred by me. To designate or change my choice, l need only complete the Authorization Agreement below. I may change my election at any time by completing a new Authorization Agreement.</Typography>
      <Typography className='my-16 w-9/12 mx-auto' variant="body1" color="initial">Please deposit my check directly into the account as indicated below. This request supersedes any previous direct deposit requests.</Typography>
      <Typography className='my-16 w-9/12 mx-auto' variant="body1" color="initial">(DEPOSITS ARE MADE TO YOUR ACCOUNT WITHIN TWO BUSINESS DAYS AFTER THE DATE ON THE REIMBURSEMENT ADVICES SENT TO YOU)</Typography>
      <section className='flex flex-row justify-center items-center my-16 mx-auto'>
        <form onSubmit={handleSubmit(onSubmit)}>
        {
            inputs.map((input) => {
              if (input.type === 'phoneNumber') {
                return (
                  <div>
                    <Controller
                      defaultValue={input.defaultValue}
                      as={
                        <PhoneInput
                          // value={item[input.name]}
                          value={input.defaultValue}
                          id={input.name}
                          country='ng'
                          // placeholder="Enter phone number"
                          containerClass='w-full my-16'
                          inputClass='w-full'
                          specialLabel={input.label}
                          enableAreaCodes
                          enableSearch
                          inputRef={register}
                          isValid={(inputNumber, country, onlyCountries) => {
                            return onlyCountries.some((country) => {
                              return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
                            });
                          }}
                        />
                      }
                      name={input.name}
                      control={control}
                      rules={{ required: true }}
                    />
                    <Typography variant="caption" color="error">{errors[input.name]?.message}</Typography>
                  </div>
                )

              }
              return (
                <Input
                  {...input}
                  // defaultValue={item[input.name]}
                  error={errors[input.name]}
                  message={errors[input.name]?.message}
                  refs={register}
                  className='my-16'
                />
              )
            })
          }
          <Typography className='my-16 w-9/12 mx-auto' variant="body1" color="initial">
            <b>
            Note: A voided check MUST be attached to this from to ensure correct wire transfer and account number information is available to Accounts Payable for processing your request. Forms received without attachment of a voided check will NOT be processed
            </b>
          </Typography>
          <Typography className='my-16 w-9/12 mx-auto' variant="body1" color="initial">
          I authorize the Account payable Department of SpringRock to initiate credit entries and to initiate, if necessary, debit entries and adjustments for any credit made in error under this program to my account as designated above and by the attached void check or deposit slip.
          </Typography>
          <Typography className='my-16 w-9/12 mx-auto' variant="body1" color="initial">
            <b>
            The authority to make reimbursement to the account identified above may be terminated upon thirty (30) days prior notification from me to the company.
            </b>
          </Typography>
          <Button
            className='mx-auto w-4/12 my-16'
            variant="contained"
            color="primary"
            type='submit'
          >
            Submit
        </Button>
        </form>
      </section>
    </section>
  );
};

export default ReimbursibleExpenses;