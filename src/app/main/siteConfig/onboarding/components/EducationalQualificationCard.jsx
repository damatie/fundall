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
        marginBottom: "3%"
    },
    rowItem: {
        margin: "2% 1%",
        marginRight: "7%",
    },
    addressPara: {
        width: "70%",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
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
    }
}));

const EducationalQualificationCard = ({ educationalQualificationDetails }) => {
    const classes = useStyles();

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
                    <p className={` ${classes.rowItemLabel}`}>Institution/School</p>
                    <p className={` ${classes.rowItemContent}`}>{educationalQualificationDetails.institution}</p>
                </div>
                <div className={` ${classes.rowItemFirstRow}`}>
                    <p className={` ${classes.rowItemLabel}`}>Major/Department</p>
                    <p className={` ${classes.rowItemContent}`}>{educationalQualificationDetails.department}</p>
                </div>
            </div>
            <div className={` ${classes.row}`}>
                <div className={` ${classes.rowItem}`}>
                    <p className={` ${classes.rowItemLabel}`}>Grade</p>
                    <p className={` ${classes.rowItemContent}`}>{educationalQualificationDetails.grade}</p>
                </div>
                <div className={` ${classes.rowItem}`}>
                    <p className={` ${classes.rowItemLabel}`}>Qualification</p>
                    <p className={` ${classes.rowItemContent}  ${classes.addressPara}`}>{educationalQualificationDetails.qualification}</p>
                </div>
            </div>
            <div className={` ${classes.row}`}>
                <div className={` ${classes.rowItem}`}>
                    <p className={` ${classes.rowItemLabel}`}>Start Year</p>
                    <p className={` ${classes.rowItemContent}`}>{educationalQualificationDetails.startYear}</p>
                </div>
                <div className={` ${classes.rowItem}`}>
                    <p className={` ${classes.rowItemLabel}`}>End Year</p>
                    <p className={` ${classes.rowItemContent}`}>{educationalQualificationDetails.endYear}</p>
                </div>
            </div>
        </div>
    )
}

export default EducationalQualificationCard
