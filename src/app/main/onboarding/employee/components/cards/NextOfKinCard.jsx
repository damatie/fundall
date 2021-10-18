import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '../../../../../../assets/icons/edit.png';
import moment from 'moment';

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
        // justifyContent: "space-between",
        marginBottom: "3%"
    },
    rowItem: {
        margin: "2% 1%",
        marginRight: "7%",
    },
    addressPara: {
        // width: "70%",
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

const NextOfKinCard = ({ nextOfKinDetails, customHook, index, isUpdate }) => {
    const classes = useStyles();

    const {
        handleEditItem,
        setShowOnScreen
    } = customHook;

    return (
        <div className={` ${classes.mainCard}`}>
            <div className={` ${classes.editButtonDiv}`}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        console.log("clicked");
                        handleEditItem(index, isUpdate)
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
                    <p className={` ${classes.rowItemContent}`}>{nextOfKinDetails?.firstName}</p>
                </div>
                <div className={` ${classes.rowItemFirstRow}`}>
                    <p className={` ${classes.rowItemLabel}`}>Last Name</p>
                    <p className={` ${classes.rowItemContent}`}>{nextOfKinDetails?.lastName}</p>
                </div>
                <div className={` ${classes.rowItemFirstRow}`}>
                    <p className={` ${classes.rowItemLabel}`}>Gender</p>
                    <p className={` ${classes.rowItemContent}`}>{nextOfKinDetails?.gender}</p>
                </div>
                <div className={` ${classes.rowItemFirstRow}`}>
                    <p className={` ${classes.rowItemLabel}`}>Date of birth</p>
                    <p className={` ${classes.rowItemContent}`}>{moment(nextOfKinDetails?.dob).format("DD/MM/YYYY")}</p>
                </div>
            </div>
            <div className={` ${classes.row}`}>
                <div className={` ${classes.rowItem}`}>
                    <p className={` ${classes.rowItemLabel}`}>Nationality</p>
                    <p className={` ${classes.rowItemContent}`}>{nextOfKinDetails?.nationality}</p>
                </div>
                <div className={` ${classes.rowItem} ${classes.rowItemAddress}`}>
                    <p className={` ${classes.rowItemLabel}`}>Address</p>
                    <p className={` ${classes.rowItemContent} ${classes.addressPara}`}>{nextOfKinDetails?.address}</p>
                </div>
                <div className={` ${classes.rowItem}`}>
                    <p className={` ${classes.rowItemLabel}`}>Contact Number</p>
                    <p className={` ${classes.rowItemContent}`}>{nextOfKinDetails?.contactNumber}</p>
                </div>
            </div>
            {/* <div className={` ${classes.row}`}>
                <div className={` ${classes.rowItem}`}>
                    <p className={` ${classes.rowItemLabel}`}>Contact Email</p>
                    <p className={` ${classes.rowItemContent}`}>{nextOfKinDetails?.contactEmail}</p>
                </div>
                <div className={` ${classes.rowItem}`}>
                    <p className={` ${classes.rowItemLabel}`}>Contact Number</p>
                    <p className={` ${classes.rowItemContent}`}>{nextOfKinDetails?.contactNumber}</p>
                </div>
            </div> */}
        </div>
    )
}

export default NextOfKinCard
