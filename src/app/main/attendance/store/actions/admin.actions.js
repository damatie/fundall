import { fetchHeaders } from "app/shared/fetchHeaders";
import swal from 'sweetalert2';
import { getBaseUrl } from "app/shared/getBaseUrl";

export const GET_ACTIVITY = 'GET ACTIVITY';
export const GET_ACTIVITIES = 'GET ACTIVITIES';
export const GET_ATTENDANCE = 'GET ATTENDANCE';

const header = fetchHeaders();

export const fetchActivities = () => {
    return dispatch => {
        fetch(`${getBaseUrl()}/attendance/activities`, {
            ...header.getRegHeader()
        }).then(res => res.json()).then(
            data => {
                if (data.success) {
                    console.log(data);
                    dispatch({
                        type: GET_ACTIVITIES, payload: data.data
                    });
                } else {
                    dispatch({
                        type: GET_ACTIVITIES, payload: []
                    });
                }
            }
        )
    }
}

export const fetchOwnAttendance = (offset = 0, limit = 20) => {
    return dispatch => {
        fetch(`${getBaseUrl()}/attendance/all/history?offset=${offset}&limit=${limit}`, {
            ...header.getRegHeader()
        }).then(res => res.json()).then(
            data => {
                if (data.success) {
                    console.log(data);
                    dispatch({
                        type: GET_ATTENDANCE, payload: data.data
                    });
                } else {
                    dispatch({
                        type: GET_ATTENDANCE, payload: []
                    });
                }
            }
        )
    }
}

export const fetchActivity = (id) => {
    return dispatch => {
        fetch(`${getBaseUrl()}/attendance/activities/${id}`, {
            ...header.getRegHeader()
        }).then(res => res.json()).then(
            data => {
                if (data.success) {
                    dispatch({
                        type: GET_ACTIVITY, payload: data.data
                    });
                } else {
                    dispatch({
                        type: GET_ACTIVITY, payload: data.data
                    });
                }
            }
        )
    }
}

export const deleteActivity = (id) => {
    swal.showLoading();
    return dispatch => {
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                fetch(`${getBaseUrl()}/attendance/activities/${id}`, { ...header.delHeader() })
                    .then(res => res.json()).then(async data => {
                        if (data.success) {
                            dispatch(fetchActivities());
                            swal.fire(
                                'DELETE!',
                                'Postion has been deleted.',
                                'success'
                            )
                        } else {
                            swal.fire(
                                'Delete not successful!',
                                'something went wrong',
                                'error'
                            )
                        }
                    }
                    ).catch(e => {
                        console.error(e);
                        swal.fire(
                            'Oops!',
                            'something went wrong',
                            'error'
                        )
                    })
            }
        })
    }
}

export function updateActivity(id, model, history) {
    console.log(model);

    swal.showLoading();
    fetch(`${getBaseUrl()}/attendance/activities/${id}`, { ...header.reqHeader('PATCH', model) })
        .then(res => res.json()).then(
            data => {
                console.log(data)
                if (data.success) {
                    swal.fire({
                        title: data.message,
                        timer: 3000,
                        icon: 'success'
                    })
                    history.push("/activity/list");
                } else {
                    swal.fire({
                        title: data.message,
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

export function createActivity(model, history) {
    console.log(model);
    swal.showLoading();
    fetch(`${getBaseUrl()}/attendance/activities`, { ...header.reqHeader('POST', model) })
        .then(res => res.json()).then(
            data => {
                console.log(data)
                if (data.success) {
                    swal.fire({
                        title: data.message,
                        timer: 3000,
                        icon: 'success'
                    })
                    history.push("/activity/list");
                } else {
                    swal.fire({
                        title: data.message,
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

export function markAttendance(model) {
    console.log(model);
    swal.showLoading();
    fetch(`${getBaseUrl()}/attendance`, { ...header.reqHeader('POST', model) })
        .then(res => res.json()).then(
            data => {
                console.log(data)
                if (data.success) {
                    swal.fire({
                        title: data.message,
                        timer: 3000,
                        icon: 'success'
                    })
                } else {
                    swal.fire({
                        title: data.message,
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
