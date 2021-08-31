import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';
import Typography from '@material-ui/core/Typography'
import 'react-phone-input-2/lib/material.css';
import SharedButton from 'app/shared/button/SharedButton';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from 'app/store/actions';
import SharedDropzone from 'app/shared/sharedDropZone';
import { makeStyles } from '@material-ui/core/styles';

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
    const { countries, states, cities } = useSelector(state => state.regions);
    const dispatch = useDispatch();
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
            // type: '',
        },
        {
            name: 'functionalManager',
            label: 'Functional Manager',
            // type: '',
        },
        {
            name: 'reviewingManager',
            label: 'Reviewing Manager',
            // type: '',
        },
        {
            name: 'personalAssistant',
            label: 'Personal Assistant',
            // type: '',
        },
    ], [countries, states]);

    React.useEffect(() => {
        dispatch(Actions.getCountries());
    }, []);

    return (
        <div className={` ${classes.employeeInformationDiv}`}>
            <form onSubmit={e => {
                e.preventDefault();
                // console.log(e);
                goToNextStepper();
            }}>
                <GridSystem>
                    {inputs.map((input) => {
                        if (input.type === 'select') {
                            return (
                                <SelectTextField
                                    name={input.name}
                                    label={input.label}
                                    onChange={({ target: { value, name } }) => {
                                        console.log(`${name}: ${value}`)
                                    }}
                                >
                                    {input.data.map(({ id, name }) => (
                                        <MenuItem key={id} value={id} onClick={() => console.log({ value: id, name: input.name })}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </SelectTextField>
                            )
                        }
                        if (input.type === 'phoneNumber') {
                            return (
                                // <Grid item lg={12}>
                                <div className=''>
                                    <PhoneInput
                                        id={input.name}
                                        country='ng'
                                        // placeholder="Enter phone number"
                                        containerClass='w-full'
                                        inputClass='w-full'
                                        specialLabel={input.label}
                                        enableAreaCodes
                                        enableSearch
                                        isValid={(inputNumber, country, onlyCountries) => {
                                            return onlyCountries.some((country) => {
                                                return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
                                            });
                                        }}
                                    />
                                </div>
                                // </Grid>
                            )

                        }
                        return (
                            <Input
                                {...input}
                            />
                        )
                    })}
                </GridSystem>
                <div className={` ${classes.uploadCompanyLogo}`}>
                    <Typography variant="body2" color="initial" className='my-20'>{'Signature'}</Typography>
                    <SharedDropzone
                        setValue={(e) => console.log(e)}
                        name='signature'
                        placeholder="Upload Company Logo"
                    />
                </div>
                <SharedButton
                    variant='contained'
                    color='primary'
                    type='submit'
                    className='my-16 flex flex-col mx-auto w-1/2'
                >
                    Submit
                </SharedButton>
            </form>
        </div>
    );
};

export default EmployeeInformation
