import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHeaders } from '../fetchHeaders';
import ProgressBtn from '../progressBtn';
import swal from 'sweetalert2';
import { useParams, Link, useHistory } from 'react-router-dom';


const LeaveActionBtn = () => {
  const header = fetchHeaders();
  const history = useHistory();
  const [success1, setSuccess1] = useState(false);
	const [loading1, setLoading1] = useState(false);

	const [success2, setSuccess2] = useState(false);
	const [loading2, setLoading2] = useState(false);

	const [success3, setSuccess3] = useState(false);
  const [loading3, setLoading3] = useState(false);
  
  const { id } = useParams();

  const leaveDetails = useSelector(({ leaveRequestDetails }) => leaveRequestDetails);
  
  const handleApproveLeave = () => {
		setLoading3(true);
		fetch(`https://hris-cbit.herokuapp.com/api/v1/employee-leave/approve/${id}`, {
			...header.reqHeader(
				'PATCH',
				{}
			),
		}).then(res => res.json()).then(
			data => {
				setLoading3(false);
				if(data.success) {
					swal.fire({
						title: 'Approve leave',
						text: data.message,
						icon: 'success',
						timer: 3000
					})
					setSuccess3(true);
				} else {
					swal.fire({
						title: 'Approve leave',
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

	const handleReviewLeave = () => {
		setLoading1(true);
		fetch(`https://hris-cbit.herokuapp.com/api/v1/employee-leave/review/${id}`, {
			...header.reqHeader(
				'PATCH',
				{}
			),
		}).then(res => res.json()).then(
			data => {
				setLoading1(false);
				if(data.success) {
					swal.fire({
						title: 'Approve leave',
						text: data.message,
						icon: 'success',
						timer: 3000
					})
					setSuccess1(true);
				} else {
					swal.fire({
						title: 'Approve leave',
						text: data.message,
						icon: 'error',
						timer: 3000
					})
					setSuccess1(true);
				}
			}
		).catch(e => {
			setLoading1(false);
			console.error(e)});
	};

	const handleReject = () => {
		setLoading2(true);
		fetch(`https://hris-cbit.herokuapp.com/api/v1/employee-leave/cancel/${id}`, {
			...header.reqHeader(
				'PATCH',
				{}
			),
		}).then(res => res.json()).then(
			data => {
				setLoading2(false);
				if(data.success) {
					swal.fire({
						title: 'Leave Rejected',
						text: data.message,
						icon: 'success',
						timer: 3000
					})
					setSuccess2(true);
				} else {
					swal.fire({
						title: 'Leave Rejected',
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
    <>
    {leaveDetails.data.status !== 'approved' ? <div className="flex items-center justify-evenly">
					
    {leaveDetails.data.status === 'in progress' ? 	<><ProgressBtn loading={loading1} success={success1} color='secondary' onClick={handleReviewLeave} content='approve Leave' /> 
    <ProgressBtn loading={loading2} success={success2} color='red' onClick={handleReject} content='Reject Leave' /> </> :
    <>
    <ProgressBtn loading={loading3} success={success3} color='primary' onClick={handleApproveLeave} content='Approve Leave'/> 
    <ProgressBtn loading={loading2} success={success2} color='red' onClick={handleReject} content='Reject Leave' />
  </>}
  </div> : <></>}
  </>
  );
};

export default LeaveActionBtn;