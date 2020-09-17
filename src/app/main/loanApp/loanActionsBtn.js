import React, { useState } from 'react';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import ProgressBtn from 'app/shared/progressBtn';
import swal from 'sweetalert2';
import { useParams, Link, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import * as Actions from './store/actions';
import CurrencyInput from 'app/shared/TextInput/CurrencyInput';

const LoanActionsBtn = props => {
  const header = fetchHeaders();
	const [selectedTab, setSelectedTab] = useState(0);
	const [success1, setSuccess1] = useState(false);
	const [loading1, setLoading1] = useState(false);
	const [open, setOpen] = useState(false);

	const [success2, setSuccess2] = useState(false);
	const [loading2, setLoading2] = useState(false);

	const [success3, setSuccess3] = useState(false);
  const [loading3, setLoading3] = useState(false);
  
  const { id } = useParams();

	const history = useHistory();

	const loan = useSelector(({ loan }) => loan.loan.data);
  const loans = useSelector(({ loan }) => loan.loan);
  
  const approve = (url, body) => {
		fetch(`${url}${id}`, {
			...header.reqHeader(
				'PATCH',
				body
			),
		}).then(res => res.json()).then(
			data => {
				
				if(data) {
					setSuccess3(true);
					swal.fire({
						title: 'Approve Loan  ',
						text: data.message,
						icon: 'success',
						timer: 3000
					})
					history.push({
						pathname: '/loan/review/list'
					})
				} else {
					swal.fire({
						title: 'Approve Loan  ',
						text: data.message,
						icon: 'error',
						timer: 3000
					})
					setSuccess3(true);
				}
			}
		).catch(e => {
			setLoading3(false);
			console.error(e)});
	}

	const reject = url => {
		swal.fire({
			title: 'Reason for rejecting this loan',
			input: 'textarea',
			inputPlaceholder: 'Type your message here...',
			inputAttributes: {
				'aria-label': 'Type your message here'
			},
			showCancelButton: true,
			confirmButtonText: 'Send',
			preConfirm: (input) => {
				if (input) {
					setLoading2(true);
					swal.showLoading();
					fetch(`${url}${id}`, {
						...header.reqHeader('PATCH', {
							comment: input
						})
					}).then(res => res.json()).then(
						data => {
							setLoading2(false);
							if(data) {
								swal.fire({
									title: 'Reject Loan',
									text: data.message,
									icon: 'success',
									timer: 3000
								})
								setSuccess2(true);
								history.push({
									pathname: '/loan/review/list'
								})
							} else {
								swal.fire({
									title: 'Reject Loan',
									text: data.message,
									icon: 'error',
									timer: 3000
								})
								setSuccess2(true);
							}
						}
					).catch(e => {
						setLoading2(false);
						console.error(e)});
				} else {
					swal.showValidationMessage('Please enter your message')   
				}
			}
		})
	}

	const handleApproveLeave = () => {
		switch(loan.loanData.status) {
			case 'pending': {
				approve(`${getBaseUrl()}/loan/approve/hod/`, {});
				break;
			}
			case 'reviewed': {
				approve(`${getBaseUrl()}/loan/approve/support/`, {});
				break;
			}
			case 'approved': {
				// approve(`${getBaseUrl()}/loan/approve/finance/`, {...props.form});
				setOpen(true);
				break;	
			}
			default: {
				return 'hello';
			}
		}
  };
  
	const handleReject = () => {
		switch(loan.loanData.status) {
			case 'pending': {
				reject(`${getBaseUrl()}/loan/reject/hod/`);
				break;
			}
			case 'reviewed': {
				reject(`${getBaseUrl()}/loan/reject/support/`);
				break;
			}
			case 'approved': {
				reject(`${getBaseUrl()}/loan/reject/finance/`);
				break;
			}
			default: {
				reject('')
				break;
			}
		}
	}

	const generateLoanStatement = () => {
		fetch(`${getBaseUrl()}/loan/statements/${id}`, {
			...header.reqHeader(
				'POST',
				{
					// amountApproved: 20000
				}
			),
		}).then(res => res.json()).then(
			data => {
				if(data.message === 'Created!') {
					setSuccess3(true);
					swal.fire({
						title: 'Loan Statement',
						text: data.message,
						icon: 'success',
						timer: 3000
					})
				} else {
					swal.fire({
						title: 'Loan Statement',
						text: data.message,
						icon: 'error',
						timer: 3000
					})
					setSuccess3(true);
				}
			}
		).catch(e => {
			setLoading3(false);
			console.error(e)});
	}

	const closeLoan = () => {
		setLoading2(true);
		fetch(`${getBaseUrl()}/loan/approve/close/${id}`, {
			...header.reqHeader(
				'PATCH',
				{
					
				}
			)
		}).then(res => res.json()).then(
			data => {
				setLoading2(false);
				if(data.success) {
					swal.fire({
						title: 'Close Loan',
						text: data.message,
						icon: 'success',
						timer: 3000
					})
					setSuccess2(true);
					history.push({
						pathname: '/loan/review/list'
					})
				} else {
					swal.fire({
						title: 'Close Loan',
						text: data.message,
						icon: 'error',
						timer: 3000
					})
					setSuccess2(true);
				}
			}
		).catch(e => {
			setLoading2(false);
			console.error(e)});
  }
	
	const handelReturnLeave = () => {
		setLoading3(true);
		console.log(props.form)
		if(props.form.amountApproved === 0 || props.form.deductableAmount) {

		}
		// fetch(`${getBaseUrl()}/loan/approve/finance/${id}`, {
		// 	...header.reqHeader(
		// 		'PATCH',
		// 		{
		// 			...props.form
		// 		}
		// 	)
		// }).then(res => res.json()).then(
		// 	data => {
		// 		setLoading3(false);
		// 		if(data.success) {
		// 			swal.fire({
		// 				title: 'Return Loan',
		// 				text: data.message,
		// 				icon: 'success',
		// 				timer: 3000
		// 			})
		// 			setSuccess3(true);
		// 			history.push({
		// 				pathname: '/loan/review/list'
		// 			})
		// 		} else {
		// 			swal.fire({
		// 				title: 'Return Loan',
		// 				text: data.message,
		// 				icon: 'error',
		// 				timer: 3000
		// 			})
		// 			setSuccess3(true);
		// 		}
		// 	}
		// ).catch(e => {
		// 	setLoading3(false);
		// 	console.error(e)});
	}

	const handelAcceptLoan = () => {
		setLoading3(true);
		fetch(`${getBaseUrl()}/loan/confirm/${id}`, {
			...header.reqHeader(
				'PATCH',
				{
					
				}
			)
		}).then(res => res.json()).then(
			data => {
				setLoading3(false);
				if(data.success) {
					swal.fire({
						title: 'Loan',
						text: data.message,
						icon: 'success',
						timer: 3000
					})
					setSuccess3(true);
					history.push({
						pathname: '/loan/request/list'
					})
				} else {
					swal.fire({
						title: 'Loan',
						text: data.message,
						icon: 'error',
						timer: 3000
					})
					setSuccess3(true);
				}
			}
		).catch(e => {
			setLoading3(false);
			console.error(e)});
	}

  return (
    <div className="flex items-center justify-evenly">
      {loan.loanData.status !== 'open' && loan.loanData.status !== 'closed' && loan.loanData.status !== 'corrected' ? 
      <>
				<ProgressBtn loading={loading3} success={success3} color='primary' onClick={handleApproveLeave} content='Approve Loan'/>
        <ProgressBtn loading={loading2} success={success2} color='red' onClick={handleReject} content='Reject Loan' />
      </>

      : <>
				{loan.loanData.status !== 'open' && loan.loanData.status !== 'closed' && loan.loanData.status !== 'corrected' ? 
					<>
					<ProgressBtn loading={loading3} success={success3} color='primary' onClick={handleApproveLeave} content='Approve Loan'/>
					<ProgressBtn loading={loading2} success={success2} color='red' onClick={handleReject} content='Reject Loan' /> </> : <></>
				}
			</>}

      {loan.loanData.status === 'open' ? 
      <>
        <ProgressBtn loading={loading3} success={success3} color='primary' onClick={generateLoanStatement} content='Loan statement'/> 
        <ProgressBtn loading={loading2} success={success2} color='red' onClick={closeLoan} content='Close Loan'/>
      </> :
      <></>
      }

			{loan.loanData.status === 'corrected' ? 
      <>
        <ProgressBtn loading={loading3} success={success3} color='primary' onClick={handelAcceptLoan} content='Accept Loan'/> 
        <ProgressBtn loading={loading2} success={success2} color='red' onClick={closeLoan} content='Reject Loan'/> 
      </> :
      <></>
      }

			<ApproveLoan open={open} setOpen={setOpen}/>
    </div>
	);
	
	
};

const ApproveLoan = props => {

	const loan = useSelector(({ loan }) => loan.loan.data);
	const loans = useSelector(({ loan }) => loan.loan);
	const { id } = useParams();
	const [amountApproved, setAmountApproved] = useState('');

	const dispatch = useDispatch();


	const handleClose = () => {
		props.setOpen(false);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const params = {
			amountApproved,
			deductableAmount: `${amountApproved / loan.loanData.duration}`
		}
		dispatch(Actions.approveLoan(id, params))
	};


	return (
		<Dialog open={props.open} fullWidth maxWidth="xs" onClose={handleClose}>
			<AppBar position="static">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						Approve Employee Personal Loan
					</Typography>
				</Toolbar>
			</AppBar>
			<form onSubmit={ e => {
				e.persist();
				handleSubmit(e)
				}}>
			<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
				<Typography className='my-16' variant="subtitle1" color="inherit">
					{`Amount Requested: ${Intl.NumberFormat().format(loan.loanData.amountRequested)}`}
				</Typography>

				<CurrencyInput 
					className='my-16 w-full'
					name='amountApproved' 
					handleChange={e => setAmountApproved(e.target.value)}
					error={parseInt(amountApproved) > loan.loanData.amountRequested}
					helperText={parseInt(amountApproved) > loan.loanData.amountRequested ? 'Please you can not approve amount that is greater than the requested amount' : ''}
					label='Amount approved' 
				/>

			<DialogActions className="justify-center px-8 sm:px-16">
				<ProgressBtn content={parseInt(amountApproved) < loan.loanData.amountRequested ? 'Return loan' : 'Approve loan'} disable={parseInt(amountApproved) > loan.loanData.amountRequested ||  parseInt(amountApproved) === 0} loading={loans.loadings} success={loans.success}/>
			</DialogActions>
			</DialogContent>
			</form>
		</Dialog>
	)
}

export default LoanActionsBtn;