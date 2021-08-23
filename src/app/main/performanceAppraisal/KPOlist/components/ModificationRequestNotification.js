import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import Swal from 'sweetalert2';

const useStyles = makeStyles(theme => ({
	mReqNoti: {
		width: '45%',
		paddingLeft: '5%',
		marginBottom: '10%'
	},
	labelBtn: {
		backgroundColor: '#49CDCD',
		color: '#ffffff',
		height: 41,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: '5%',
		position: 'relative',
		borderRadius: 5,

		'&:after': {
			top: '40%',
			left: '47%',
			zIndex: -100,
			width: 30,
			height: 35,
			content: "''",
			position: 'absolute',
			transform: 'rotate(45deg)',
			backgroundColor: '#49CDCD'
		}
	},
	btnDiv: {
		display: 'flex',
		justifyContent: 'space-evenly'
	},
	btn: {
		color: '#ffffff',
		width: '40%'
	},
	approveBtn: {
		backgroundColor: '#19AC4B',

		'&:hover': {
			backgroundColor: '#1d9838',
			color: '#000000'
		}
	},
	declineBtn: {
		backgroundColor: '#FA1C1C',

		'&:hover': {
			backgroundColor: '#b32323',
			color: '#000000'
		}
	},
	modified: {
		backgroundColor: '#C4C4C4',
		color: '#ffffff'
	}
}));

const ModificationRequestNotification = ({ show, setShow }) => {
	const classes = useStyles();

	const consentModal = () => {
		setShow(false);
		Swal.fire({
			icon: 'success',
			title: 'Approved',
			html: '<p class="mrn-custom-swal-text">This KPO has been approved.</p>',
			showConfirmButton: true,
			confirmButtonText: `CONTINUE`,
			confirmButtonColor: '#19AC4B',
			customClass: {
				confirmButton: 'mrn-custom-swal-btn',
				title: 'mrn-custom-swal-title',
				popup: 'mrn-custom-swal-popup',
				icon: 'mrn-custom-swal-icon'
			}
		}).then(result => {
			if (result.isConfirmed) {
				console.log('success');
			}
		});
	};

	// REQUEST FOR KPO MODIFICATION MODAL

	// Swal.fire({
	// 	icon: 'info',
	// 	title: 'Request for KPO modification',
	// 	html: '<p class="mrn-custom-swal-text">You are about to send KPO modification</p>',
	// 	showConfirmButton: true,
	// 	showCancelButton: true,
	// 	confirmButtonText: `CONTINUE`,
	// 	confirmButtonColor: '#19AC4B',
	// 	cancelButtonColor: '#FA1C1C',
	// 	customClass: {
	// 		cancelButton: 'kpo-custom-swal-btn',
	// 		confirmButton: 'kpo-custom-swal-btn',
	// 		title: 'mrn-custom-swal-title',
	// 		popup: 'mrQ-custom-swal-popup',
	// 		icon: 'kpo-custom-swal-icon'
	// 	}
	// }).then(result => {
	// 	if (result.isConfirmed) {
	// 		console.log('confirmed');
	// 	}
	// });

	Swal.fire({
		icon: 'success',
		title: 'Request has been sent to HR Manager',
		html: '<p class="mrn-custom-swal-text">The access will be locked until the HR Manager approves the request</p>',
		showConfirmButton: true,
		showCancelButton: true,
		confirmButtonText: `CONTINUE`,
		confirmButtonColor: '#19AC4B',
		cancelButtonColor: '#FA1C1C',
		customClass: {
			cancelButton: 'kpo-custom-swal-btn',
			confirmButton: 'kpo-custom-swal-btn',
			title: 'mrn-custom-swal-title',
			popup: 'mrQ-custom-swal-popup',
			icon: 'mrn-custom-swal-icon'
		}
	}).then(result => {
		if (result.isConfirmed) {
			console.log('confirmed');
		}
	});

	React.useEffect(() => console.log(show, 'show'), [show]);

	return (
		<>
			{show ? (
				<div className={` ${classes.mReqNoti}`}>
					<p className={` ${classes.labelBtn}`}>MODIFICATION REQUEST</p>
					<div className={` ${classes.btnDiv}`}>
						<Button className={` ${classes.btn} ${classes.approveBtn}`} onClick={consentModal}>
							APPROVE
						</Button>
						<Button
							className={` ${classes.btn} ${classes.declineBtn}`}
							onClick={() => {
								Swal.fire({
									icon: 'success',
									title: 'Declined Successfully'
								});
								setShow(!show);
							}}
						>
							DECLINE
						</Button>
					</div>
				</div>
			) : (
				<Button className={` ${classes.modified}`} disabled>
					Modified
				</Button>
			)}
		</>
	);
};

export default ModificationRequestNotification;
