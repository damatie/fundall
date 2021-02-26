import { fetchHeaders } from "app/shared/fetchHeaders";
import swal from 'sweetalert2';
import { getBaseUrl } from "app/shared/getBaseUrl";

export const GET_DEPARTMENT_EXIT_LIST = 'GET_DEPARTMENT_EXIT_LIST';
export const GET_COMPANY_EXIT_LIST = 'GET_COMPANY_EXIT_LIST';

const header = fetchHeaders();

export const fetchDepartmentExit = (offset = 0, limit = 10) => {
    return dispatch => {
        fetch(`${getBaseUrl()}/employee_exit/department/all?offset=${offset}&limit=${limit}`, {
            ...header.getRegHeader()
        }).then(res => res.json()).then(
            data => {
                if (data.success) {
                    console.log(data.data);
                    dispatch({
                        type: GET_DEPARTMENT_EXIT_LIST, payload: data.data
                    });
                } else {
                    dispatch({
                        type: GET_DEPARTMENT_EXIT_LIST, payload: []
                    });
                }
            }
        )
    }
}

export const HRAccept = (payload, id) => {

    swal.showLoading();
    return dispatch => {
        fetch(`${getBaseUrl()}/employee_exit/hr/verify/${id}`, {
            ...header.getRegHeader("PATCH", payload)
        }).then(res => res.json()).then(
            data => {
                if (data.success) {
                    console.log(data.data);
                    swal.fire({
                        title: data.message,
                        timer: 3000,
                        icon: 'success'
                    });
                    dispatch(fetchDepartmentExit());
                    swal.hideLoading();
                } else {
                    swal.fire({
                        title: data.message,
                        timer: 3000,
                        icon: 'error'
                    });
                    swal.hideLoading();
                    return;
                }
            }
        ).catch((err) => {
            swal.fire({
                title: "Something went wrong!!!",
                timer: 3000,
                icon: 'error'
            });
            swal.hideLoading();
        })
    }
}

export const lineManagerReject = (id) => {

    let payload = {
        comment: ""
    };

    return dispatch => {
        swal.fire({
            title: 'Reasons for rejection',
            input: 'textarea',
            inputValue: payload.comment,
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: (name) => {
                payload.comment = name;
                return fetch(`${getBaseUrl()}/employee_exit/lm/reject/${id}`, { ...header.reqHeader('PATCH', payload) }
                ).then(res => res.json()).then(async data => {

                    console.log(data);
                    if (data.success) {
                        dispatch(fetchDepartmentExit());
                        swal.fire({
                            title: 'Exit Rejection',
                            text: data.message,
                            timer: 3000,
                            icon: 'success'
                        })
                    } else {
                        swal.fire({
                            title: 'Exit Rejection',
                            text: data.error,
                            timer: 3000,
                            icon: 'error'
                        })
                    }
                }).catch(e => {
                    console.error(e);
                    swal.fire({
                        title: 'Exit Rejection',
                        text: 'Oops! an error occurred. Kindly check network and try again',
                        timer: 3000,
                        icon: 'error'
                    })
                })
            },
            allowOutsideClick: () => !swal.isLoading()
        })
    }
}

export const lineManagerAccept = (id) => {
    swal.showLoading();

    return dispatch => {
        fetch(`${getBaseUrl()}/employee_exit/lm/approve/${id}`, {
            ...header.getRegHeader("PATCH")
        }).then(res => res.json()).then(
            data => {
                if (data.success) {
                    console.log(data.data);
                    swal.fire({
                        title: data.message,
                        timer: 3000,
                        icon: 'success'
                    });
                    dispatch(fetchDepartmentExit());
                    swal.hideLoading();
                } else {
                    swal.fire({
                        title: data.message,
                        timer: 3000,
                        icon: 'error'
                    });
                    swal.hideLoading();
                    return;
                }
            }
        )
    }
}

export const fetchCompanyExit = (offset = 0, limit = 10) => {
    return dispatch => {
        fetch(`${getBaseUrl()}/employee_exit/?offset=${offset}&limit=${limit}`, {
            ...header.getRegHeader()
        }).then(res => res.json()).then(
            data => {
                if (data.success) {
                    console.log(data.data);
                    dispatch({
                        type: GET_COMPANY_EXIT_LIST, payload: data.data
                    });
                } else {
                    dispatch({
                        type: GET_COMPANY_EXIT_LIST, payload: []
                    });
                }
            }
        )
    }
}

export function createRequest(model, history) {
    swal.showLoading();
    fetch(`${getBaseUrl()}/employee_exit`, { ...header.reqHeader('POST', model) })
        .then(res => res.json()).then(
            data => {
                if (data.success) {
                    swal.fire({
                        title: data.message,
                        timer: 3000,
                        icon: 'success'
                    })
                    history.push("/exit/home");
                } else {
                    swal.fire({
                        title: data.message ?? "an error occurred",
                        timer: 3000,
                        icon: 'error'
                    })
                }
            }).catch(err => {
                console.log(err);
                swal.fire({
                    title: err.message,
                    text: 'Oops! Something went wrong. Check your network',
                    timer: 3000,
                    icon: 'error'
                })
            })
}