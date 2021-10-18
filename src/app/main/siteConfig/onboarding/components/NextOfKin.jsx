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
import { KeyboardDatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import NextOfKinCard from './cards/NextOfKinCard';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import useNextOfKin from '../hooks/useNextofKin';

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
    const state = useSelector(state => state);
    console.log(state);
    const customHook = useNextOfKin({
        dispatch,
        state
    });
    const {
        register,
        errors,
        control,
        onSubmit,
        handleSubmit,
        countries,
        openModal, 
        setOpenModal,
        addedSpouseAndDependant,
        setShowOnScreen,
        items,
        setSelectedItem,
        selectedItem,
        isValid,
        handleAddItem,
        kins,
        handleClose,
        showOnScreen
    } = customHook;

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
            type: 'text',
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
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
            type: 'text',
        },
        {
            name: 'contactNumber',
            label: 'Contact Number',
            type: 'phoneNumber',
        },
        {
            name: 'relationship',
            label: 'Relationship',
            type: 'text',
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
    return (
        <>
            {kins?.length < 2 &&
                <div className={` ${classes.button}`} onClick={() => setOpenModal(true)}>
                    ADD EMPLOYEE NEXT OF KIN
                </div>
            }
            <div className={` ${classes.shownOnScreen}`}>
                {
                    kins && kins?.map((nextOfKinDetails, index) => (
                        <NextOfKinCard customHook={customHook} isUpdate={true} index={index} key={index} nextOfKinDetails={nextOfKinDetails} />
                    ))
                }
            </div>
            <CenterModal open={openModal} handleClose={() => handleClose()} title="Next of Kin" hideCloseIcon={true} borderRadius={true} spacedAppBarHeight={true} largeWidth={true}>
                {
                    addedSpouseAndDependant && (
                        items.map((nextOfKinDetails, index) => (
                            <NextOfKinCard customHook={customHook} isUpdate={false} index={index} key={index} nextOfKinDetails={nextOfKinDetails} />
                        ))
                    )
                }
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
                            if (input.type === "date") {
                                return (
                                    <KeyboardDatePicker
                                        className={` ${classes.dateMaterialUi}`}
                                        id="date-picker-dialog"
                                        label={input.label}
                                        name={input.name}
                                        format="DD/MM/YYYY"
                                        value={selectedItem[input.name]}
                                        onChange={(value) => {
                                            selectedItem[input.name] = value
                                            setSelectedItem({
                                                ...selectedItem
                                            })
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

                    {((items?.length + kins?.length) < 2 ) && (
                        !showOnScreen && (
                            <Button
                                variant="contained"
                                color="secondary"
                                type='button'
                                onClick={() => handleAddItem(selectedItem)}
                                startIcon={<AddIcon />}
                                className={` ${classes.addButtonWithIcon}`}
                                disabled={isValid() || (items?.length + kins?.length) === 2}
                            >
                                Add
                            </Button>
                            )
                        )
                    }
                    <SharedButton
                        variant='contained'
                        color='primary'
                        type='button'
                        className='my-16 flex flex-col mx-auto w-1/2'
                        disabled={items.length === 0 && !showOnScreen}
                        onClick={() => onSubmit()}
                    >
                        {(showOnScreen) ? 'Update' : 'Save'}
                    </SharedButton>
                </form>
            </CenterModal>
        </>
    )
}

export default withReducer('NextOfKin', reducer)(NextOfKin)
