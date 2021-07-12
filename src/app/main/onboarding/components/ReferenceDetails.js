import React from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  createReferenceDetails,
  updateReferenceDetails,
  OPEN_MODAL,
  CLOSE_MODAL,
  GET_DETAILS,
  getReferenceDetails
} from '../store/actions';
import Typography from '@material-ui/core/Typography';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';
import Input from 'app/shared/TextInput/Input';
import 'react-phone-input-2/lib/material.css';
// import { Divider } from '@material-ui/core';
import EnhancedTable from 'app/shared/table/EnhancedTable';
import SharedModal from 'app/shared/modal/SharedModal';
import { useParams } from 'react-router-dom';


const { useMemo, useEffect } = React;

const schema = yup.object().shape({
  nameOfReferee: yup.string().required(),
  phoneNumber: yup.string().required().min(14).max(14),
  address: yup.string().required(),
  email: yup.string().email().required(),
});

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  }
}));

const CreateReference = () => {
  const {
    errors,
    register,
    handleSubmit,
    control
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const { referenceDetails: { open, details } } = useSelector(state => state.onboardingForms);
  const { user } = useSelector(state => state.auth);

  const { id } = useParams();

  const getUserId = () => {
    if (id) return id;
    return user.id
  }

  const dispatch = useDispatch();

  const inputs = useMemo(() => [
    {
      name: 'nameOfReferee',
      label: 'Name of Referee',
      type: 'text',
      defaultValue: details?.nameOfReferee,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      defaultValue: details?.email,
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'phoneNumber',
      defaultValue: details?.phoneNumber,
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      defaultValue: details?.address,
    },
  ], [details]);

  const onSubmit = (formData) => {
    if (!!details?.id) {
      dispatch(updateReferenceDetails({
        formData,
        id: details?.id,
        employeeId: getUserId()
      }));
      return;
    }
    dispatch(createReferenceDetails({ formData, employeeId: getUserId() }));
  }


  return (
    <SharedModal
      title='Reference Details'
      open={open}
      handleClose={() => dispatch({ type: CLOSE_MODAL })}
    >
      <form className='my-16' onSubmit={handleSubmit(onSubmit)}>
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
                // defaultValue={input.n}
                error={errors[input.name]}
                message={errors[input.name]?.message}
                refs={register}
                className='my-16'
              />
            )
          })
        }
        <Button variant="contained" color="primary" className='mx-auto w-1/2 my-16' type='submit'>
          Submit
        </Button>
      </form>
    </SharedModal>
  )
};

const ReferenceDetails = () => {
  const classes = useStyles();
  const columns = useMemo(
    () => [
      {
        Header: 'Name of Referee',
        accessor: 'nameOfReferee',
        // className: 'font-bold',
        sortable: true
      },
      {
        Header: 'Email',
        accessor: 'email',
        sortable: true
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
        sortable: true
      },
      {
        Header: 'Address',
        accessor: 'address',
        sortable: true
      },
    ],
  );

  const {
    employeeInfo: { info },
    referenceDetails: { loading, data }
  } = useSelector(state => state.onboardingForms);

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);

  const { id } = useParams();

  const getUserId = () => {
    if (id) return id;
    return user.id
  }

  useEffect(() => {
    dispatch(getReferenceDetails(getUserId()))
  }, []);

  return (
    <section className={classes.root}>
      <Typography className='my-16' variant="h5" color="initial"><b>REFERENCE DETAILS REQUEST FORM</b></Typography>
      <section className='flex flex-row justify-between items-center my-16 mx-auto'>
        <Typography className='text-left my-16' variant="body1" color="initial">
          <b>Employee Name:</b>
          {` ${info.firstName} ${info.lastName}`}
        </Typography>
        {
          !id && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => dispatch({ type: OPEN_MODAL })}
            >
              Add reference details
            </Button>
          )
        }

      </section>
      <EnhancedTable
        columns={columns}
        data={data}
        onRowClick={(ev, row) => {
          if (row) {
            !id && dispatch({ type: GET_DETAILS, payload: row.original })
          }
        }}
        checkbox={{
          showCheckbox: false,
          onClick: (value) => console.log(value),
          accessor: 'id',
        }}
        selectAll={(value) => console.log(value)}
        handleDelete={() => null}
      />
      <CreateReference />
    </section>
  );
};

export default ReferenceDetails;