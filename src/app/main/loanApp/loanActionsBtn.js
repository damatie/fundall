import React, { useState } from 'react';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import ProgressBtn from 'app/shared/progressBtn';
import swal from 'sweetalert2';
import { useParams, Link, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
  
  const approve = url => {
		fetch(`${url}${id}`, {
			...header.reqHeader(
				'PATCH',
				{
					// amountApproved: 20000
				}
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
		switch(loan.status) {
			case 'pending': {
				approve('https://hris-cbit.herokuapp.com/api/v1/loan/approve/hod/', {});
				break;
			}
			case 'reviewed': {
				approve('https://hris-cbit.herokuapp.com/api/v1/loan/approve/hr/', {});
				break;
			}
			case 'approved': {
				approve('https://hris-cbit.herokuapp.com/api/v1/loan/approve/finance/', {...props.form});
				break;
			}
			default: {
				return 'hello';
			}
		}
  };
  
	const handleReject = () => {
		switch(loan.status) {
			case 'pending': {
				reject('https://hris-cbit.herokuapp.com/api/v1/loan/approve/hod/reject/');
				break;
			}
			case 'reviewed': {
				reject('https://hris-cbit.herokuapp.com/api/v1/loan/approve/hr/reject/');
				break;
			}
			case 'approved': {
				reject('https://hris-cbit.herokuapp.com/api/v1/loan/approve/finance/reject/');
				break;
			}
			default: {
				reject('')
				break;
			}
		}
	}

	const generateLoanStatement = () => {
		fetch(`https://hris-cbit.herokuapp.com/api/v1/loan/statements/${id}`, {
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
		fetch(`https://hris-cbit.herokuapp.com/api/v1/loan/approve/close/${id}`, {
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
		fetch(`https://hris-cbit.herokuapp.com/api/v1/loan/approve/close/${id}`, {
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

  return (
    <div className="flex items-center justify-evenly">
      {loan.status !== 'open' && loan.status !== 'closed' ? 
      <>
				{props.form.amountApproved > loan.amountRequested ? <ProgressBtn loading={loading3} success={success3} color='primary' onClick={handelReturnLeave} content='Return Loan'/> :

				<ProgressBtn loading={loading3} success={success3} color='primary' onClick={handleApproveLeave} content='Approve Loan'/>

				}
        <ProgressBtn loading={loading2} success={success2} color='red' onClick={handleReject} content='Reject Loan' /> 
      </>
      : <></>}

      {loan.status === 'open' ? 
      <>
        <ProgressBtn loading={loading3} success={success3} color='primary' onClick={generateLoanStatement} content='Loan statement'/> 
        <ProgressBtn loading={loading2} success={success2} color='red' onClick={closeLoan} content='Close Loan'/> 
      </> :
      <></>
      }
    </div>
  );
};

export default LoanActionsBtn;