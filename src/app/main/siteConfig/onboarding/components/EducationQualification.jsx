import React, { useEffect, useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CenterModal from 'app/shared/modal/CenterModal';
import {useDispatch, useSelector} from 'react-redux';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import 'react-phone-input-2/lib/material.css';
import SharedButton from 'app/shared/button/SharedButton';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { KeyboardDatePicker } from '@material-ui/pickers';
import EducationalQualificationCard from './cards/EducationalQualificationCard';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import useEducationQualification from '../hooks/useEducationQualification';

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

const EducationQualification = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    console.log(state);
    const customHook = useEducationQualification({
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
        educations,
        handleClose,
        showOnScreen
    } = customHook;

    const inputs = useMemo(() => [
        {
            name: 'school',
            label: 'Institute or School',
            type: 'text',
        },
        {
            name: 'department',
            label: 'Major/Department',
            type: 'text',
        },
        {
            name: 'grade',
            label: 'Grade',
            type: 'text',
        },
        {
            name: 'qualification',
            label: 'Qualification',
            // type: '',
        },
        {
            name: 'startYear',
            label: 'Start Year',
            type: 'date',
        },
        {
            name: 'endYear',
            label: 'End Year',
            type: 'date',
        },
    ], []);

    const formDetails = [
        {
            institution: "Fedral University of technology, Akure",
            department: "Computer Science",
            grade: "Second class upper",
            qualification: "B.Sc.",
            startYear: "DD/MM/YYYY",
            endYear: "DD/MM/YYYY",
        },
        {
            institution: "Fedral University of technology, Akure",
            department: "Mathematics",
            grade: "First class honours",
            qualification: "B.Sc.",
            startYear: "DD/MM/YYYY",
            endYear: "DD/MM/YYYY",
        },
    ];

    return (
        <>
            <div className={` ${classes.button}`} onClick={() => setOpenModal(true)}>
                ADD EDUCATIONAL QUALIFICATION
            </div>
            <div className={` ${classes.shownOnScreen}`}>
                {
                    educations && educations?.map((educationalQualificationDetails, index) => (
                        <EducationalQualificationCard customHook={customHook} isUpdate={true} index={index} key={index} educationalQualificationDetails={educationalQualificationDetails} />
                    ))
                }
            </div>
            <CenterModal open={openModal} handleClose={() => handleClose()}  title="Educational Qualification" hideCloseIcon={true} borderRadius={true} spacedAppBarHeight={true} largeWidth={true}>
                {
                    addedSpouseAndDependant && (
                        items.map((educationalQualificationDetails, index) => (
                            <EducationalQualificationCard customHook={customHook} isUpdate={false} index={index} key={index} educationalQualificationDetails={educationalQualificationDetails} />
                        ))
                    )
                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <GridSystem>
                        {inputs.map((input) => {
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

                    {
                    !showOnScreen && (
                        <Button
                            variant="contained"
                            color="secondary"
                            type='button'
                            onClick={() => handleAddItem(selectedItem)}
                            startIcon={<AddIcon />}
                            className={` ${classes.addButtonWithIcon}`}
                            disabled={isValid()}
                        >
                            Add
                        </Button>
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

export default withReducer('EducationQualification', reducer)(EducationQualification)
