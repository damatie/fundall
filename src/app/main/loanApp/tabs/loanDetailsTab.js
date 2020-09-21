import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoanHistory from './loanHistory';
import { TextField } from '@material-ui/core';
import LoanActionsBtn from '../loanActionsBtn';
import { useForm } from '@fuse/hooks';
import _ from '@lodash';
import CustomIconButton from 'app/shared/button/CustomIconButton';
import useLoanManagement, { useApproveLoan, useLoanStatement } from 'app/hooks/useLoanManagement';
import { formatToNaira } from 'utils/formatNumber';
import SharedModal from 'app/shared/modal/SharedModal';
import CurrencyInput from 'app/shared/TextInput/CurrencyInput';

function LoanDetailsTab({ setValue }) {
	const loan = useSelector(({ loan }) => loan.loan.data);
	const profile = useSelector(({ profile }) => profile.data);

	const { showBtn, handleApprove, handleReject, isValue, handleCloseModal, open, handleCancel } = useLoanManagement();

	const { disabled, handleSubmit, handleChange, error, amountApproved,  approve } = useApproveLoan();

	const { statement, handleStatement } = useLoanStatement(loan.loanData.status);


	return (
		<div className="md:flex">
			<div className="w-full">
				<Card className="w-full mb-16">
					<AppBar position="static" elevation={0}>
						<Toolbar className="px-8">
							<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
								Loan Request Information
								</Typography>
						</Toolbar>
					</AppBar>
					<CardContent>
						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Email</Typography>
							<Typography>{loan.employee.email}</Typography>
						</div>

						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Department</Typography>
							<Typography>{loan.employee.department.departmentName}</Typography>
						</div>

						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Country</Typography>
							<Typography>{loan.employee.country}</Typography>
						</div>

						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Residential Address</Typography>
							<Typography>{loan.employee.residentialAddress}</Typography>
						</div>

						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Annual Pay</Typography>
							<Typography>{formatToNaira(loan.loanData.annualPay)}</Typography>
						</div>

						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Amount Requested</Typography>
							<Typography>{formatToNaira(loan.loanData.amountRequested)}</Typography>
						</div>
						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Amount Approved</Typography>
							<Typography>{isValue(formatToNaira(loan.loanData.amountApproved))}</Typography>
						</div>

						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Deductable Amount</Typography>
							<Typography>{isValue(formatToNaira(loan.loanData.deductableAmount))}</Typography>
						</div>
						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Work Location</Typography>
							<Typography>{loan.loanData.workLocation}</Typography>
						</div>

						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Payment Mode</Typography>
							<Typography>{loan.loanData.paymentMode}</Typography>
						</div>

						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Date Requested</Typography>
							<Typography>{loan.loanData.dateRequested}</Typography>
						</div>

						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Duration</Typography>
							<Typography>{`${loan.loanData.duration} Months`}</Typography>
						</div>

						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Line manager</Typography>
							<Typography>{loan.departmentHead}</Typography>
						</div>

						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Director of support service </Typography>
							<Typography>{loan.supportDirector}</Typography>
						</div>

						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Finance Manager</Typography>
							<Typography>{loan.financeManager}</Typography>
						</div>

						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Purpose</Typography>
							<Typography>{loan.loanData.purpose}</Typography>
						</div>
						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Head of department Approver Date</Typography>
							<Typography>{isValue(loan.loanData.departmentHeadApprovalDate)}</Typography>
						</div>

						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Director of support service Approver Date</Typography>
							<Typography>{isValue(loan.loanData.supportDirectorApprovalDate)}</Typography>
						</div>
						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Loan Disbursed On</Typography>
							<Typography>{isValue(loan.loanData.loanDisbursedOn)}</Typography>
						</div>

						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">First Due Date</Typography>
							<Typography>{`${isValue(loan.loanData.firstDueDate)}`}</Typography>
						</div>

						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Number Of Installements</Typography>
							<Typography>{isValue(loan.loanData.numberOfInstallements)}</Typography>
						</div>
						<div className="flex items-center justify-evenly w-2/4 mx-auto">
							{showBtn ?
								<>
									<CustomIconButton type='success' icon='check' onClick={handleApprove}>
										Accept
									</CustomIconButton>

									<CustomIconButton type='error' icon='cancel' onClick={handleReject}>
										Reject
									</CustomIconButton>
								</>
							: <></>}

							{statement ?
								<>
									<CustomIconButton className='bg-blue hover:bg-blue-700 text-white w-1/4' icon='class' onClick={handleStatement}>
										Statement
									</CustomIconButton>

									<CustomIconButton type='error' icon='cancel'onClick={handleCancel} >
										Close loan
									</CustomIconButton>
								</>
							: <></>}
						</div>
					</CardContent>
				</Card>
			</div>

			<SharedModal open={open} handleClose={handleCloseModal} title="Approve Loan">
			<form onSubmit={handleSubmit}>
				<Typography className='my-16' variant="subtitle1" color="inherit">
					{`Amount Requested: ${formatToNaira(loan.loanData.amountRequested)}`}
				</Typography>

				{!loan.loanData.amountApproved ? 
				<CurrencyInput 
					className='my-16 w-full'
					name='amountApproved' 
					handleChange={handleChange}
					error={error.isError}
					helperText={error.message}
					label='Amount approved' 
				/> : <Typography className='my-16' variant="subtitle1" color="inherit">
				{`Amount Approved: ${formatToNaira(loan.loanData.amountApproved)}`}
			</Typography>}
				<section className="flex justify-center px-8 sm:px-16">
					<CustomIconButton icon='check' type='success' disabled={disabled} submit={true}>
						{approve ? 'Approve' : 'Return Loan'}
					</CustomIconButton>
				</section>
			</form>
			</SharedModal>
		</div>
	);
}

export default React.memo(LoanDetailsTab);
