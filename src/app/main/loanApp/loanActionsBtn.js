import React, { useState } from 'react';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import ProgressBtn from 'app/shared/progressBtn';
import swal from 'sweetalert2';
import { useParams, Link, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBaseUrl } from 'app/shared/getBaseUrl';

const LoanActionsBtn = props => {
  const header = fetchHeaders();
	const [selectedTab, setSelectedTab] = useState(0);
	const [success1, setSuccess1] = useState(false);
	const [loading1, setLoading1] = useState(false);

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
			title: 'Reason for canceling the loan',
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
						...header.delHeader()
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
				approve(`${getBaseUrl()}/loan/approve/hr/`, {});
				break;
			}
			case 'approved': {
				approve(`${getBaseUrl()}/loan/approve/finance/`, {...props.form});
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
				reject(`${getBaseUrl()}/loan/approve/hod/reject/`);
				break;
			}
			case 'reviewed': {
				reject(`${getBaseUrl()}/loan/approve/hr/reject/`);
				break;
			}
			case 'approved': {
				reject(`${getBaseUrl()}/loan/approve/finance/reject/`);
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
		fetch(`${getBaseUrl()}/loan/approve/close/${id}`, {
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
						title: 'Return Loan',
						text: data.message,
						icon: 'success',
						timer: 3000
					})
					setSuccess3(true);
					history.push({
						pathname: '/loan/review/list'
					})
				} else {
					swal.fire({
						title: 'Return Loan',
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
				{props.form.amountApproved < loan.loanData.amountRequested ? <ProgressBtn loading={loading3} success={success3} color='primary' onClick={handelReturnLeave} content='Return Loan'/> :

				props.form.amountApproved > loan.loanData.amountRequested ? '' : <ProgressBtn loading={loading3} success={success3} color='primary' onClick={handleApproveLeave} content='Approve Loan'/>

				}
        <ProgressBtn loading={loading2} success={success2} color='red' onClick={handleReject} content='Reject Loan' />
      </>
      : <></>}

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
    </div>
  );
};

export default LoanActionsBtn;