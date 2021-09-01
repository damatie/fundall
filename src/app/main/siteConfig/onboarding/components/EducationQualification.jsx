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
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import EducationalQualificationCard from './EducationalQualificationCard';

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
    const [openModal, setOpenModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const inputs = useMemo(() => [
        {
            name: 'instituteOrSchool',
            label: 'Institute or School',
            // type: '',
        },
        {
            name: 'majorOrDept',
            label: 'Major/Department',
            // type: '',
        },
        {
            name: 'grade',
            label: 'Grade',
            // type: '',
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

    const [addedSpouseAndDependant, setAddedSpouseAndDependant] = useState(false);
    const [showOnScreen, setShowOnScreen] = useState(false);

    useEffect(() => {

        return () => {
            setShowOnScreen(false);
            setAddedSpouseAndDependant(false);
        }
    }, []);

    return (
        <>
            <div className={` ${classes.button}`} onClick={() => setOpenModal(true)}>
                ADD EDUCATIONAL QUALIFICATION
            </div>
            <div className={` ${classes.shownOnScreen}`}>
                {
                    showOnScreen && (
                        formDetails.map((educationalQualificationDetails, index) => (
                            <EducationalQualificationCard key={index} educationalQualificationDetails={educationalQualificationDetails} />
                        ))
                    )
                }
            </div>
            <CenterModal open={openModal} handleClose={() => setOpenModal(false)} title="Educational Qualification" hideCloseIcon={true} borderRadius={true} spacedAppBarHeight={true} largeWidth={true}>
                {
                    addedSpouseAndDependant && (
                        formDetails.map((educationalQualificationDetails, index) => (
                            <EducationalQualificationCard key={index} educationalQualificationDetails={educationalQualificationDetails} />
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

export default EducationQualification
