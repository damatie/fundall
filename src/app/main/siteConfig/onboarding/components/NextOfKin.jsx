import React, { useEffect, useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CenterModal from 'app/shared/modal/CenterModal';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';
import * as Actions from 'app/store/actions';
import 'react-phone-input-2/lib/material.css';
import SharedButton from 'app/shared/button/SharedButton';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import NextOfKinCard from './NextOfKinCard';

const useStyles = makeStyles(theme => ({
    button: {
        backgroundColor: "#252C67",
        color: "#ffffff",
        width: "fit-content",
        padding: 15,
        borderRadius: 5,
        cursor: "pointer",

        "&:hover": {
            backgroundColor: "#1a1d38",
            color: "#00CCF2"
        }
    },
    dateMaterialUi: {
        border: "1.8px solid #cfcfcf",
        borderRadius: 3,

        "& div": {
            "&:before": {
                borderBottom: "none !important"
            }
        }
    },
    addButtonWithIcon: {
        margin: "10% 0 15% 0"
    },
    shownOnScreen: {
        width: "60%",
        margin: "5% 0"
    }
}));

const NextOfKin = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const { countries } = useSelector(state => state.regions);
    const [selectedDate, setSelectedDate] = useState("");

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const genderList = [
        {
            id: "female",
            name: "Female",
        },
        {
            id: "male",
            name: "Male",
        },
        {
            id: "dunno",
            name: "Prefer Not To Say",
        }
    ]

    const inputs = useMemo(() => [
        {
            name: 'firstName',
            label: 'First Name',
            // type: '',
        },
        {
            name: 'lastName',
            label: 'Last Name',
            // type: '',
        },
        {
            name: 'gender',
            label: 'Gender',
            type: 'select',
            data: genderList,
        },
        {
            name: 'dOB',
            label: 'Date of Birth',
            type: 'date',
        },
        {
            name: 'nationality',
            label: 'Nationality',
            type: 'select',
            data: countries,
        },
        {
            name: 'address',
            label: 'Address',
            // type: '',
        },
        {
            name: 'contactNumber',
            label: 'Contact Number',
            type: 'phoneNumber',
        },
        {
            name: 'relationship',
            label: 'Relationship',
            // type: '',
        },
    ], [countries]);

    const formDetails = [
        {
            firstName: "John",
            lastName: "Doe",
            gender: "Male",
            dob: "DD/MM/YYYY",
            nationality: "Nigerian",
            address: "Plot 2210, Block 98, Aina Ajayi Estate, Ikoyi Lagos State, Nigeria",
            contactNo: "+234815642695",
            contactEmail: "johndoe@springrock.com",
            relationship: "Wife",
        },
        {
            firstName: "Naruto",
            lastName: "Uzumaki",
            gender: "Male",
            dob: "DD/MM/YYYY",
            nationality: "Japanese",
            address: "Plot 2210, Block 98, Ghyokul, Tokyo Japan",
            contactNo: "+234815642695",
            contactEmail: "naruto@springrock.com",
            relationship: "Husband",
        },
    ];

    const [addedSpouseAndDependant, setAddedSpouseAndDependant] = useState(false);
    const [showOnScreen, setShowOnScreen] = useState(false);

    useEffect(() => console.log(addedSpouseAndDependant, "addedSpouseAndDependant"), [addedSpouseAndDependant])

    useEffect(() => {
        dispatch(Actions.getCountries());

        return () => {
            setShowOnScreen(false);
            setAddedSpouseAndDependant(false);
        }
    }, []);

    return (
        <>
            <div className={` ${classes.button}`} onClick={() => setOpenModal(true)}>
                ADD EMPLOYEE NEXT OF KIN
            </div>
            <div className={` ${classes.shownOnScreen}`}>
                {
                    showOnScreen && (
                        formDetails.map((nextOfKinDetails, index) => (
                            <NextOfKinCard key={index} nextOfKinDetails={nextOfKinDetails} />
                        ))
                    )
                }
            </div>
            <CenterModal open={openModal} handleClose={() => setOpenModal(false)} title="Next of Kin" hideCloseIcon={true} borderRadius={true} spacedAppBarHeight={true} largeWidth={true}>
                {
                    addedSpouseAndDependant && (
                        formDetails.map((nextOfKinDetails, index) => (
                            <NextOfKinCard key={index} nextOfKinDetails={nextOfKinDetails} />
                        ))
                    )
                }
                <form onSubmit={e => {
                    e.preventDefault();
                    setShowOnScreen(true);
                    setOpenModal(false);
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
                            if (input.type === "date") {
                                return (
                                    <KeyboardDateTimePicker
                                        className={` ${classes.dateMaterialUi}`}
                                        id="date-picker-dialog"
                                        label={input.label}
                                        // format="dd/mm/yyyy"
                                        // value={selectedDate}
                                        onChange={handleDateChange}
                                    />
                                )
                            }
                            return (
                                <Input
                                    {...input}
                                />
                            )
                        })}
                    </GridSystem>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            console.log("clicked");
                            setAddedSpouseAndDependant(true);
                        }}
                        startIcon={<AddIcon />}
                        className={` ${classes.addButtonWithIcon}`}
                    >
                        Add
                    </Button>
                    <SharedButton
                        variant='contained'
                        color='primary'
                        type='submit'
                        className='my-16 flex flex-col mx-auto w-1/2'
                    >
                        Save
                    </SharedButton>
                </form>
            </CenterModal>
        </>
    )
}

export default NextOfKin
