import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';
import { Controller } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import 'react-phone-input-2/lib/material.css';
import SharedButton from 'app/shared/button/SharedButton';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from 'app/store/actions';
import SharedDropzone from 'app/shared/sharedDropZone';
import { makeStyles } from '@material-ui/core/styles';
import useEmployeeInformation  from '../hooks/useEmployeeInformation';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';

import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    employeeInformationDiv: {
        width: "80%",
        margin: "auto",
        marginTop: "10%"
    },
    uploadCompanyLogo: {
        "& section": {
            "& div": {
                backgroundColor: "#F8F8F8"
            }
        }
    }
}));

const EmployeeInformation = ({ goToNextStepper }) => {
    const classes = useStyles();
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const {
        errors,
        register,
        handleSubmit,
        onSubmit,
        control,
        countries,
        setFile,
        info,
        isValid,
        selectedItem,
        setSelectedItem,
        loading
    } = useEmployeeInformation({
        dispatch,
        state,
        goToNextStepper
    })
    const inputs = React.useMemo(() => [
        {
            name: 'officeExtension',
            label: 'Office Extension',
            type: 'number',
        },
        {
            name: 'privateMobileNumber',
            label: 'Private Mobile Number',
            type: 'phoneNumber',
        },
        {
            name: 'officeLine',
            label: 'Office Telephone Line',
            type: 'number',
        },
        {
            name: 'officialNo',
            label: 'Official Mobile No',
            type: 'phoneNumber',
        },
        {
            name: 'alternativeEmail',
            label: 'Alternative Email/Private Email',
            type: 'email',
        },
        {
            name: 'nationality',
            label: 'Nationality',
            type: 'select',
            data: countries,
        },
        {
            name: 'facebookHandle',
            label: 'Facebook Handle',
            type: 'url',
        },
        {
            name: 'twitterHandle',
            label: 'Twitter Handle',
            type: 'url',
        },
        {
            name: 'linkedInHandle',
            label: 'Linkedin Handle',
            type: 'url',
        },
        {
            name: 'zipCode',
            label: 'Postal/Zip Code',
            type: 'number',
        },
        {
            name: 'employeeManager1',
            label: 'Employee Manager 1',
            type: 'text',
        },
        {
            name: 'functionalManager',
            label: 'Functional Manager',
            type: 'text',
        },
        {
            name: 'reviewingManager',
            label: 'Reviewing Manager',
            type: 'text',
        },
        {
            name: 'personalAssistant',
            label: 'Personal Assistant',
            type: 'text',
        },
    ], [countries]);

    return (
        <div className={` ${classes.employeeInformationDiv}`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <GridSystem>
                    {inputs.map((input) => {
                        if (input.type === 'select') {
                            return (
                                    <SelectTextField
                                    name={input.name}
                                    label={input.label}
                                    error={errors[input.name]}
                                    message={errors[input.name]?.message}
                                    value={selectedItem[input.name]}
                                    register={register}
                                    onChange={(ev) => {
                                        selectedItem[input.name] = ev.target.value
                                        setSelectedItem({
                                            ...selectedItem
                                        })
                                    }}
                                    >
                                    {input.data.map(({ id, name }) => (
                                        <MenuItem key={id} value={id} >
                                            {name}
                                        </MenuItem>
                                    ))}
                                    </SelectTextField>
                
                            )
                            }
                        if (input.type === 'phoneNumber') {
                            return (
                                <PhoneInput
                                //   disabled={!shouldUpdate}
                                    value={selectedItem[input.name]}
                                    id={input.name}
                                    country='ng'
                                    
                                    // placeholder="Enter phone number"
                                    containerClass='w-full'
                                    inputClass='w-full'
                                    specialLabel={input.label}
                                    enableAreaCodes
                                    enableSearch
                                    inputRef={register}
                                    onChange={(value) => {
                                        selectedItem[input.name] = value
                                        setSelectedItem({
                                            ...selectedItem
                                        })
                                    }}
                                    isValid={(inputNumber, country, onlyCountries) => {
                                    return onlyCountries.some((country) => {
                                        return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
                                    });
                                    }}
                                />
                            )
                
                            }
                        return (
                            <Input
                                {...input}
                                error={errors[input.name]}
                                message={errors[input.name]?.message}
                                defaultValue={selectedItem[input.name]}
                                value={selectedItem[input.name]}
                                refs={register}
                                onChange={(ev) => {
                                    selectedItem[input.name] = ev.target.value
                                    setSelectedItem({
                                        ...selectedItem
                                    })
                                }}
                            />
                        )
                    })}
                </GridSystem>
                <div className={` ${classes.uploadCompanyLogo}`}>
                    <Typography variant="body2" color="initial" className='my-20'>{'Signature'}</Typography>
                    <SharedDropzone
                        setValue={setFile}
                        name='signature'
                        placeholder="Upload Signature"
                    />
                </div>
                <SharedButton
                    variant='contained'
                    color='primary'
                    type='button'
                    className='my-16 flex flex-col mx-auto w-1/2'
                    disabled={isValid() && !selectedItem?.id}
                    onClick={() => onSubmit(selectedItem)}
                >
                    {!selectedItem?.id ? 'Submit' : 'Update'}
                </SharedButton>
            </form>
        </div>
    );
};

export default withReducer('EmployeeInformation', reducer)(EmployeeInformation)
