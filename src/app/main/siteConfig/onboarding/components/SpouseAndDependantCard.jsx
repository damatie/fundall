import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '../../../../../assets/icons/edit.png';

const useStyles = makeStyles(theme => ({
    mainCard: {
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 5px 24px rgba(0, 0, 0, 0.1)",
        borderRadius: 15,
        color: "#000000",
        margin: "5% 0",
        padding: "20px 15px",
        position: "relative"
    },
    editButtonDiv: {
        position: "absolute",
        right: "2%"
    },
    firstRow: {
        display: "flex",
        marginBottom: "3%"
    },
    rowItemFirstRow: {
        marginRight: "7%"
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "3%"
    },
    rowItem: {
        margin: "2% 1%"
    },
    rowItemLabel: {
        fontWeight: 600,
        fontSize: 12,
        color: "#6F6F6F"
    },
    rowItemContent: {
        backgroundColor: "#E8E8E8",
        // width: "fit-content",
        padding: 10,
        fontWeight: 600,
        fontSize: 13,
        color: "#000000",
        borderRadius: 5
    },
    editButtonWithIcon: {
        textTransform: "capitalize !important"
    },
    addressPara: {
        width: "70%",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    },
}));

const SpouseAndDependantCard = ({ spouseAndDependant }) => {
    const classes = useStyles();

    useEffect(() => console.log(spouseAndDependant, "spouseAndDependant"));

    //  Edit BUtton

    return (
        <div className={` ${classes.mainCard}`}>
            <div className={` ${classes.editButtonDiv}`}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        console.log("clicked");
                    }}
                    startIcon={<img src={EditIcon} alt="edit icon" />}
                    className={` ${classes.editButtonWithIcon}`}
                >
                    Edit
                </Button>
            </div>
            <div className={` ${classes.firstRow}`}>
                <div className={` ${classes.rowItemFirstRow}`}>
                    <p className={` ${classes.rowItemLabel}`}>First Name</p>
                    <p className={` ${classes.rowItemContent}`}>{spouseAndDependant.firstName}</p>
                </div>
                <div className={` ${classes.rowItemFirstRow}`}>
                    <p className={` ${classes.rowItemLabel}`}>Last Name</p>
                    <p className={` ${classes.rowItemContent}`}>{spouseAndDependant.lastName}</p>
                </div>
                <div className={` ${classes.rowItemFirstRow}`}>
                    <p className={` ${classes.rowItemLabel}`}>Gender</p>
                    <p className={` ${classes.rowItemContent}`}>{spouseAndDependant.gender}</p>
                </div>
                <div className={` ${classes.rowItemFirstRow}`}>
                    <p className={` ${classes.rowItemLabel}`}>Date of birth</p>
                    <p className={` ${classes.rowItemContent}`}>{spouseAndDependant.dob}</p>
                </div>
            </div>
            <div className={` ${classes.row}`}>
                <div className={` ${classes.rowItem}`}>
                    <p className={` ${classes.rowItemLabel}`}>Nationality</p>
                    <p className={` ${classes.rowItemContent}`}>{spouseAndDependant.nationality}</p>
                </div>
                <div className={` ${classes.rowItem}`}>
                    <p className={` ${classes.rowItemLabel}`}>Nationality</p>
                    <p className={` ${classes.rowItemContent} ${classes.addressPara}`}>{spouseAndDependant.address}</p>
                </div>
                <div className={` ${classes.rowItem}`}>
                    <p className={` ${classes.rowItemLabel}`}>Contact Number</p>
                    <p className={` ${classes.rowItemContent}`}>{spouseAndDependant.contactNo}</p>
                </div>
            </div>
            <div className={` ${classes.row}`}>
                <div className={` ${classes.rowItem}`}>
                    <p className={` ${classes.rowItemLabel}`}>Contact Email</p>
                    <p className={` ${classes.rowItemContent}`}>{spouseAndDependant.contactEmail}</p>
                </div>
                <div className={` ${classes.rowItem}`}>
                    <p className={` ${classes.rowItemLabel}`}>Passport Number</p>
                    <p className={` ${classes.rowItemContent}`}>{spouseAndDependant.passportNo}</p>
                </div>
                <div className={` ${classes.rowItem}`}>
                    <p className={` ${classes.rowItemLabel}`}>Relationship</p>
                    <p className={` ${classes.rowItemContent}`}>{spouseAndDependant.relationship}</p>
                </div>
            </div>
        </div>
    )
}

export default SpouseAndDependantCard
