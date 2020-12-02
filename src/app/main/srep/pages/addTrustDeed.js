import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import * as Actions from '../store/actions';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import moment from 'moment';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import CurrencyFormat from 'react-currency-format';
import {saveAs} from 'save-as';
import UploadTrustDeed from '../forms/uploadTrustDeed';
import DownloadTrustDeed from '../forms/downloadTrustDeed';
import {formatBytes} from 'app/shared/formatFileSize';
import { useAuth } from 'app/hooks/useAuth';
import ProgressBtn from 'app/shared/progressBtn';

const userData = useAuth().getUserData;

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 345
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
    },
    downloadAll: {
        textAlign: 'center',
        position: 'absolute',
        left: '40%'
    },
    approveBtn: {
        textAlign: 'center',
        position: 'absolute',
        left: '25%'
    },
	typeIcon: {
		'&.document:before': {
			content: "'insert_drive_file'",
			color: '#1565C0'
		},
		'&.pdf:before': {
			content: "'picture_as_pdf'",
			color: '#F40F02'
		},
		'&.spreadsheet:before': {
			content: "'insert_chart'",
			color: '#4CAF50'
		}
	}
}));

function AddTrustDeed(props) {
	const {
        id,
        capitalFund,
        residentialAddress,
        beneficiaryName,
        beneficiaryTitle,
        beneficiaryDob,
        beneficiaryNationality,
        beneficiaryGender,
        beneficiaryPhone,
        beneficiaryEmail,
        beneficiaryBirthCert,
        beneficiaryRelationship,
        phoneNo,
        info,
        employee,
        srepOtherFiles,
        status
	} = props.srepData;

    const classes = useStyles();
	const dispatch = useDispatch();

    const [hideBtn, setHideBtn] = useState(false);
    
    const isOnlyHr = () => (userData.role.toUpperCase() === 'HR');
    
    const isFinance = () => (userData.role.toUpperCase() === 'FINANCE MANAGER');

    const isEmployee = () => (userData.role.toUpperCase() === 'EMPLOYEE');
    
    const downloadFile = (url) => {
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('target', '_blank');
		document.body.appendChild(link);
		link.click();
		link.parentNode.removeChild(link);
    }
    
    function sendToFinance() {
		dispatch(Actions.sendToFinance(parseInt(id)))
    }
    
    function approve() {
		dispatch(Actions.approveSrep(parseInt(id)))
	}

	return (
		<div className="md:flex w-full">
			<div className="flex sm:flex-col w-full">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
                    <div className="grid grid-flow-col grid-rows-1 grid-cols-3 gap-4 sm:w-full">
                        <div className="col-start-1 col-span-2 mb-20">
                            <Card className="sm:w-full">

                                <CardContent>
                                    <div className="flex w-full">
                                        <div className="mb-24 w-1/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Employee Name</Typography>
                                            <Typography>
                                                {employee ? (
                                                    `${employee.firstName} ${employee.lastName}`
                                                ) : (
                                                    <SkeletonLoader height="3em" width="60%" />
                                                )}
                                            </Typography>
                                        </div>

                                        <div className="mb-24 w-2/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Employment ID</Typography>
                                            <Typography>
                                                {info ? (
                                                    info.employeeNumber
                                                ) : (
                                                    <SkeletonLoader height="3em" width="60%" />
                                                )}
                                            </Typography>
                                        </div>
                                    </div>
                                        
                                    <div className="flex w-full">
                                        <div className="mb-24 w-1/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Department</Typography>
                                            <Typography>
                                                {employee ? (
                                                    employee.departmentId
                                                ) : (
                                                    <SkeletonLoader height="3em" width="60%" />
                                                )}
                                            </Typography>
                                        </div>
                                        <div className="mb-24 w-2/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Job Role</Typography>
                                            <Typography>
                                                {employee ? (
                                                    employee.jobTitleId
                                                ) : (
                                                    <SkeletonLoader height="3em" width="60%" />
                                                )}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="flex w-full">
                                        <div className="mb-24 w-1/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Entity</Typography>
                                            <Typography>
                                                {employee ? (
                                                    employee.entityId
                                                ) : (
                                                    <SkeletonLoader height="3em" width="60%" />
                                                )}
                                            </Typography>
                                        </div>
                                        <div className="mb-24 w-2/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Employee Grade</Typography>
                                            <Typography>
                                                {info ? (
                                                    info.gradeLevel
                                                ) : (
                                                    <SkeletonLoader height="3em" width="60%" />
                                                )}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="flex w-full">
                                        <div className="mb-24 w-1/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Email</Typography>
                                            <Typography>
                                                {employee ? (
                                                    employee.email
                                                ) : (
                                                    <SkeletonLoader height="3em" width="60%" />
                                                )}
                                            </Typography>
                                        </div>
                                        <div className="mb-24 w-2/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Phone</Typography>
                                            <Typography>
                                                {employee ? (
                                                    employee.phoneNumber
                                                ) : (
                                                    <SkeletonLoader height="3em" width="60%" />
                                                )}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="mb-24 sm:w-full">
                                        <Typography className="font-bold mb-4 text-15">Residential Address</Typography>
                                        <Typography>
                                            {residentialAddress ? (
                                                residentialAddress
                                            ) : (
                                                <SkeletonLoader height="3em" width="60%" />
                                            )}
                                        </Typography>
                                    </div>
                                    <div className="mb-24 sm:w-full">
                                        <Typography className="font-bold mb-4 text-15">Capital Funding to be contributed</Typography>
                                        <Typography>
                                            {capitalFund ? (
                                                <CurrencyFormat value={parseInt(capitalFund)} displayType={'text'} thousandSeparator={true} prefix={'NGN'} />
                                            ) : (
                                                <SkeletonLoader height="3em" width="60%" />
                                            )}
                                        </Typography>
                                    </div>
                                    <Typography variant='h5' className="mb-24 mt-24">Beneficiary Details</Typography>
                                    <div className="flex w-full">
                                        <div className="mb-24 w-1/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Title</Typography>
                                            <Typography>
                                                {beneficiaryTitle ? (
                                                    beneficiaryTitle
                                                ) : (
                                                    <SkeletonLoader height="3em" width="60%" />
                                                )}
                                            </Typography>
                                        </div>

                                        <div className="mb-24 w-2/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Beneficiary Name</Typography>
                                            <Typography>
                                                {beneficiaryName ? (
                                                    beneficiaryName
                                                ) : (
                                                    <SkeletonLoader height="3em" width="60%" />
                                                )}
                                            </Typography>
                                        </div>
                                    </div>
                                        
                                    <div className="flex w-full">
                                        <div className="mb-24 w-1/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Date Of Birth</Typography>
                                            <Typography>
                                                {beneficiaryDob ? (
                                                    <Moment format="Do MMM YYYY">{moment(beneficiaryDob, "DD-MM-YYYY")}</Moment>
                                                ) : (
                                                    <SkeletonLoader height="3em" width="60%" />
                                                )}
                                            </Typography>
                                        </div>
                                        <div className="mb-24 w-2/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Nationality</Typography>
                                            <Typography>
                                                {beneficiaryNationality ? (
                                                    beneficiaryNationality
                                                ) : (
                                                    <SkeletonLoader height="3em" width="60%" />
                                                )}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="flex w-full">
                                        <div className="mb-24 w-1/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Gender</Typography>
                                            <Typography>
                                                {beneficiaryGender ? (
                                                    beneficiaryGender
                                                ) : (
                                                    <SkeletonLoader height="3em" width="60%" />
                                                )}
                                            </Typography>
                                        </div>
                                        <div className="mb-24 w-2/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Relationship to Employee</Typography>
                                            <Typography>
                                                {beneficiaryRelationship ? (
                                                    beneficiaryRelationship
                                                ) : (
                                                    <SkeletonLoader height="3em" width="60%" />
                                                )}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="flex w-full">
                                        <div className="mb-24 w-1/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Email</Typography>
                                            <Typography>
                                                {beneficiaryEmail ? (
                                                    beneficiaryEmail
                                                ) : (
                                                    <SkeletonLoader height="3em" width="60%" />
                                                )}
                                            </Typography>
                                        </div>
                                        <div className="mb-24 w-2/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Phone</Typography>
                                            <Typography>
                                                {beneficiaryPhone ? (
                                                    beneficiaryPhone
                                                ) : (
                                                    <SkeletonLoader height="3em" width="60%" />
                                                )}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="mb-24 sm:w-full">
                                        <Typography className="font-bold mb-4 text-15">Birth Certificate Number</Typography>
                                        <Typography>
                                            {beneficiaryBirthCert ? (
                                                beneficiaryBirthCert
                                            ) : (
                                                <SkeletonLoader height="3em" width="60%" />
                                            )}
                                        </Typography>
                                    </div>
                                </CardContent>
                                <CardActions className="mt-20 mb-20 text-center">
                                    {
                                        (isOnlyHr()) ?

                                            <ProgressBtn content="Submit to Finance" onClick={()=> {sendToFinance()}}
                                             className={classes.approveBtn} disable={hideBtn || !(status === 'pending')} />
                                        :
                                            <ProgressBtn content="Approve Srep" onClick={()=> {approve()}}
                                             className={classes.approveBtn} disable={status !== 'reviewed'} />
                                    }
                                </CardActions>
                            </Card>
                        </div>

                        <div className="sm:w-full mb-20">
                            {
                                (isOnlyHr()) ?
                                    <UploadTrustDeed srepId={id} employee={employee} srepOtherFiles={srepOtherFiles} setHideBtn={setHideBtn}/>
                                :
                                    <DownloadTrustDeed srepData={props.srepData} srepId={id} employee={employee} srepOtherFiles={srepOtherFiles}/>
                            }
                        </div>
                    </div>
				</FuseAnimateGroup>
			</div>
		</div>
	);
}

export default AddTrustDeed;
