import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import ProgressBtn from 'app/shared/progressBtn';
import swal from 'sweetalert2';
import { getBaseUrl } from 'app/shared/getBaseUrl';

const SalaryAdvanceActionBtn = () => {
  const salaryAdvanceDetails = useSelector(({salaryAdvanceDetails}) => salaryAdvanceDetails.salaryAdvances);
	const [success1, setSuccess1] = useState(false);
	const [loading1, setLoading1] = useState(false);

	const [success2, setSuccess2] = useState(false);
	const [loading2, setLoading2] = useState(false);

	const [success3, setSuccess3] = useState(false);
  const [loading3, setLoading3] = useState(false);
  
  const history = useHistory();
  const { id } = useParams();

  const header = fetchHeaders();

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
				
				if(data.message === 'Approved') {
					setSuccess3(true);
					swal.fire({
						title: 'Approve Salary Advance  ',
						text: data.message,
						icon: 'success',
						timer: 3000
					})
					history.push({
						pathname: '/loan/review/salaryadvance/list'
					})
        } 
        if(data.success === false) {
					swal.fire({
						title: 'Approve Salary Advance  ',
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
	};

	const reject = url => {
		setLoading2(true);
		fetch(`${url}${id}`, {
			...header.delHeader()
		}).then(res => res.json()).then(
			data => {
				setLoading2(false);
				if(data.success) {
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
	};

	const handleApproveLeave = () => {
		switch(salaryAdvanceDetails.details.status) {
			case 'pending': {
				approve(`${getBaseUrl()}/salary-advance/approve/hod/`);
				break;
			}
			case 'reviewed': {
				approve(`${getBaseUrl()}/salary-advance/approve/support/`);
				break;
			}
			case 'approved': {
				approve(`${getBaseUrl()}/salary-advance/approve/finance/`);
				break;
			}
			default: {
				return 'hello';
			}
		}
  };
  
	const handleReject = () => {
		switch(salaryAdvanceDetails.details.status) {
			case 'pending': {
				reject(`${getBaseUrl()}/salary-advance/hod/reject/`);
				break;
			}
			case 'reviewed': {
				reject(`${getBaseUrl()}/salary-advance/hr/reject/`);
				break;
			}
			case 'approved': {
				reject(`${getBaseUrl()}/salary-advance/finance/reject/`);
				break;
			}
			default: {
				return 'hello';
			}
		}
	};

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
  return (
    <div className="flex items-center justify-evenly">
      {salaryAdvanceDetails.details.status !== 'open' && salaryAdvanceDetails.details.status !== 'closed' ? 
      <>
        <ProgressBtn loading={loading3} success={success3} color='primary' onClick={handleApproveLeave} content='Approve Loan'/> 
        <ProgressBtn loading={loading2} success={success2} color='red' onClick={handleReject} content='Reject Loan' /> 
      </>
      : <></>}

      {salaryAdvanceDetails.details.status === 'open' ? 
      <>
        {/* <ProgressBtn loading={loading3} success={success3} color='primary' onClick={generateLoanStatement} content='Loan statement'/>  */}
        <ProgressBtn loading={loading2} success={success2} color='red' onClick={closeLoan} content='Close Loan' /> 
      </> :
      <></>
      }
    </div>
  );
};

export default SalaryAdvanceActionBtn;