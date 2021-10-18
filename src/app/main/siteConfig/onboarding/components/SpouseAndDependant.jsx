import React, { useEffect, useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CenterModal from 'app/shared/modal/CenterModal';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';
import { Controller } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import 'react-phone-input-2/lib/material.css';
import SharedButton from 'app/shared/button/SharedButton';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SpouseAndDependantCard from './cards/SpouseAndDependantCard';
import useSpouseAndDependant from '../hooks/useSpouseAndDependant';
import reducer from '../store/reducers';

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

const SpouseAndDependant = ({goToNextStepper}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    // console.log(state);
    const customHook = useSpouseAndDependant({
        dispatch,
        state,
        goToNextStepper
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
        setAddedSpouseAndDependant,
        showOnScreen, 
        setShowOnScreen,
        items,
        setSelectedItem,
        selectedItem,
        isValid,
        handleAddItem,
        spouses,
        handleClose
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
            name: 'dob',
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
            label: 'Contact Address',
            type: 'text',
        },
        {
            name: 'contactNumber',
            label: 'Contact Number',
            type: 'phoneNumber',
        },
        {
            name: 'contactEmail',
            label: 'Contact Email',
            type: 'email',
        },
        {
            name: 'passportNumber',
            label: 'Passport Number',
            type: 'text',
        },
        {
            name: 'relationship',
            label: 'Relationship',
            type: 'text',
        },
    ], [countries]);

    return (
        <>
            {spouses?.length < 3 &&
                <div className={` ${classes.button}`} onClick={() => setOpenModal(true)}>
                    ADD SPOUSE & DEPENDENT
                </div>
            }
            <div className={` ${classes.shownOnScreen}`}>
                {
                    spouses && spouses?.map((spouseAndDependant, index) => (
                        <SpouseAndDependantCard customHook={customHook} isUpdate={true} index={index} key={index} spouseAndDependant={spouseAndDependant} />
                    ))
                }
            </div>
            <CenterModal open={openModal} handleClose={() => handleClose()} title="Spouse & Dependent" hideCloseIcon={true} borderRadius={true} spacedAppBarHeight={true} largeWidth={true}>
                {
                    addedSpouseAndDependant && (
                        items?.map((spouseAndDependant, index) => (
                            <SpouseAndDependantCard customHook={customHook} isUpdate={false} index={index} key={index} spouseAndDependant={spouseAndDependant} />
                        ))
                    )
                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <GridSystem>
                        {(inputs.map((input) => {
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
                        }))}
                    </GridSystem>

                    {((items?.length + spouses?.length) < 3 ) && (
                        !showOnScreen && (
                            <Button
                                variant="contained"
                                color="secondary"
                                type='button'
                                onClick={() => handleAddItem(selectedItem)}
                                startIcon={<AddIcon />}
                                className={` ${classes.addButtonWithIcon}`}
                                disabled={isValid() || (items?.length + spouses?.length) === 3}
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

export default withReducer('SpouseAndDependant', reducer)(SpouseAndDependant)
