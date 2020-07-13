import { fetchHeaders } from "app/shared/fetchHeaders";
import swal from 'sweetalert2';

export const APPROVE_LOAN = 'APPROVE LOAN';
export const REJECT_LOAN = 'REJECT LOAN';
export const APPLY_LOAN = 'APPLY LOAN';
export const LOAN_SUCCESS = 'LOAN SUCCESS';
export const LOAN_ERROR = 'LOAN ERROR';
export const LOADING_LOAN = 'LOANDING LOAN';
export const GET_LOAN = 'GET LOAN';

const header = fetchHeaders();

export const approveLoan = id => {
  return dispatch => {
    dispatch({
      type: LOADING_LOAN
    })
    fetch(`https://hris-cbit.herokuapp.com/api/v1/loan/approve/hr/${id}`, {
      ...header.reqHeader(
        'patch',
        {}
      )
    }).then(res => res.json()).then(
      data => {
        if(data) {
          swal.fire({
            title: 'Approve Loan',
            text: 'Loan approved successfully',
            icon: 'success',
            timer: 3000
          })
          dispatch({
            type: LOAN_SUCCESS
          })
        } else {
          swal.fire({
            title: 'Approve Loan',
            text: data.message,
            icon: 'error',
            timer: 3000
          })
          dispatch({
            type: LOAN_ERROR
          })
        }
      }
    ).catch(e => console.error(e))
  }
}

export const rejectLoan = id => {
  return dispatch => {
    dispatch({
      type: LOADING_LOAN
    })
    fetch(`https://hris-cbit.herokuapp.com/api/v1/loan/${id}`, {
      ...header.delHeader()
    }).then(res => res.json()).then(
      data => {
        if(data) {
          swal.fire({
            title: 'Reject Loan',
            text: 'Loan rejected successfully',
            icon: 'success',
            timer: 3000
          })
          dispatch({
            type: LOAN_SUCCESS
          })
        } else {
          swal.fire({
            title: 'Reject Loan',
            text: data.message,
            icon: 'error',
            timer: 3000
          })
          dispatch({
            type: LOAN_ERROR
          })
        }
      }
    ).catch(e => console.error(e))
  }
}

export const applyLoan = body => {
  return dispatch => {
    dispatch({
      type: LOADING_LOAN
    })
    fetch(`https://hris-cbit.herokuapp.com/api/v1/loan/`, {
      ...header.reqHeader(
        'post',
        body
      )
    }).then(res => res.json()).then(
      data => {
        // if(data.message === 'Created!') {
          swal.fire({
            title: 'Loan application',
            text: 'Loan applied successfully',
            icon: 'success',
            timer: 3000
          })
          dispatch({
            type: LOAN_SUCCESS
          })
        // } else {
        //   swal.fire({
        //     title: 'Loan application',
        //     text: data.message,
        //     icon: 'error',
        //     timer: 3000
        //   })
        //   dispatch({
        //     type: LOAN_ERROR
        //   })
        // }
      }
    ).catch(e => console.error(e))
  }
};
const loan = {
    id: 2,
    employeeId: 3,
    amountRequested: "100000",
    purpose: "personal",
    amountApproved: null,
    employementType: "full-time",
    annualPay: "2000000",
    workLocation: "lagos",
    paymentMode: "monthly",
    departmentHead: 3,
    departmentHeadApproval: null,
    departmentHeadApprovalDate: "07-Jul-2020",
    hrManager: 1,
    hrManagerApproval: null,
    hrManagerApprovalDate: null,
    financeManager: 4,
    financeManagerApproval: null,
    deductableAmount: "10000",
    dateRequested: "07-Jul-2020",
    loanDisbursedOn: null,
    firstDueDate: null,
    numberOfInstallements: null,
    payOffDate: null,
    duration: 10,
    status: "pending",
    createdAt: "2020-07-07T14:31:19.534Z",
    updatedAt: "2020-07-07T14:33:54.282Z",
    employee: {
      id: 3,
      firstName: "Jane",
      lastName: "James",
      email: "samuelchibuike22@gmail.com",
      country: "Nigeria",
      cityOfResidence: "Lagos",
      residentialAddress: "no22 ayodele ayekile dgoy jdd"
    },
  departmentHead: "Jane James",
  hrManager: "John Mary",
  financeManager: "John Mary",
  officialNumber: "989398390"
}

export const getLoan = id => {
  return dispatch => {
    // dispatch({
    //   type: LOADING_LOAN
    // })
    // fetch(`https://hris-cbit.herokuapp.com/api/v1/loan/${id}`, {
    //   ...header.getRegHeader()
    // }).then(res => res.json()).then(
    //   data => {
    //     dispatch({
    //       type: GET_LOAN,
    //       payload: data.loanData
    //     })
    //   }
    // ).catch(e => console.error(e))
    dispatch({
      type: GET_LOAN,
      payload: loan
    })
  }
  // dispatch({
  //   type: GET_LOAN,
  //   payload: loan
  // })
}