import api from 'app/services/api';
import { useAuth } from 'app/hooks/useAuth';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import swal from 'sweetalert2';
import {fetchHeaders} from 'app/shared/fetchHeaders'

export const LOADING_FOLDER = 'LOADING FOLDER';
export const GET_MAIN_FOLDER = 'GET MAIN FOLDER';
export const GET_SUB_FOLDER = 'GET SUB FOLDER';
export const GET_SUB_FOLDER_FILE = 'GET SUB FOLDER FILE';
export const CREATE_SUB_FOLDER_SUCCESS = 'CREATE SUB FOLDER SUCCESS';
export const CREATE_SUB_FOLDER_FAILED = 'CREATE SUB FOLDER FAILED';
export const UPDATE_SUB_FOLDER_SUCCESS = 'UPDATE SUB FOLDER SUCCESS';
export const UPDATE_SUB_FOLDER_FAILED = 'UPDATE SUB FOLDER FAILED';
export const DELETE_SUB_FOLDER_SUCCESS = 'DELETE SUB FOLDER SUCCESS';
export const DELETE_SUB_FOLDER_FAILED = 'DELETE SUB FOLDER FAILED';
export const ACCESS_SUB_FOLDER_SUCCESS = 'ACCESS SUB FOLDER SUCCESS';
export const ACCESS_SUB_FOLDER_FAILED = 'ACCESS SUB FOLDER FAILED';
export const UPLOAD_FILE_PROGRESS = 'UPLOAD_FILE_PROGRESS';
export const UPLOAD_FILE_SUCCESS = 'UPLOAD FILE SUCCESS';
export const UPLOAD_FILE_FAILED = 'UPLOAD FILE FAILED';
export const UPDATE_FILE_SUCCESS = 'UPDATE FILE SUCCESS';
export const UPDATE_FILE_FAILED = 'UPDATE FILE FAILED';
export const DELETE_FILE_SUCCESS = 'DELETE FILE SUCCESS';
export const DELETE_FILE_FAILED = 'DELETE FILE FAILED';
export const CLEAR_FOLDER_LIST = 'CLEAR FOLDER LIST';


export function clearList(){
    return dispatch => {
        dispatch({
            type: CLEAR_FOLDER_LIST,
            subFolders: [],
            files: [],
            success: false,
            loading: false
        })
    }
}

export function getMainFolder(){
    return dispatch => {
        dispatch({
            type: LOADING_FOLDER
        })

        api.get('library/folder')
        .then(({data: { success, message, data }}) => {
            console.log(data);
            (success) ?
                (data) ?
                    dispatch({
                        type: GET_MAIN_FOLDER,
                        mainFolders: data,
                        subFolders: [],
                        files: []
                    })
                :
                    dispatch({
                        type: GET_MAIN_FOLDER,
                        mainFolders: [],
                        subFolders: [],
                        files: []
                    })
            : 
                dispatch({
                    type: GET_MAIN_FOLDER,
                    mainFolders: [],
                    subFolders: [],
                    files: []
                })
        })
        .catch(err => {
            console.error(err);
        })
    }
}

export function getSubFolder(id = 0){
    return dispatch => {
        dispatch({
            type: LOADING_FOLDER
        })

        api.get(`library/folder/${id}/sub`)
        .then(({data: { success, message, data }}) => {
            console.log(data);
            (success) ?
                (data) ?
                    dispatch({
                        type: GET_SUB_FOLDER,
                        subFolders: data,
                        files: []
                    })
                :
                    dispatch({
                        type: GET_SUB_FOLDER,
                        mainFolders: [],
                        subFolders: [],
                        files: []
                    })
            : 
                dispatch({
                    type: GET_SUB_FOLDER,
                    mainFolders: [],
                    subFolders: [],
                    files: []
                })
        })
        .catch(err => {
            console.error(err);
        })
    }
}

export function createSubFolder(id, payload){
    return dispatch => {
		swal.fire({
            title: 'Processing ...',
            allowOutsideClick: false
        });
		swal.showLoading();
        dispatch({
            type: LOADING_FOLDER
        })
        api.post(`library/folder/${id}/sub`, payload)
        .then(({data: { success, message, data }}) => {
            console.log(data);
            if(success){
                (data) ?
                    dispatch({
                        type: CREATE_SUB_FOLDER_SUCCESS,
                        mainFolders: [],
                        subFolders: data,
                        files: [],
                        success: true,
                        loading: false
                    })
                :
                    dispatch(getSubFolder(id))
                swal.fire({
                    title: 'Create Folder',
                    text: message,
                    timer: 3000,
                    icon: 'success'
                });
            }else{ 
                dispatch({
                    type: CREATE_SUB_FOLDER_FAILED,
                    mainFolders: [],
                    subFolders: [],
                    files: [],
                    success: false,
                    loading: false
                })
                swal.fire({
                    title: 'Create Folder',
                    text: message,
                    timer: 3000,
                    icon: 'error'
                });
            }
        })
        .catch(err => {
            console.error(err);
            swal.fire({
                title: 'Create Folder',
                text: err.message,
                timer: 3000,
                icon: 'error'
            });
            dispatch({
                type: CREATE_SUB_FOLDER_FAILED,
                mainFolders: [],
                subFolders: [],
                files: [],
                success: false,
                loading: false
            })
        })
    }
}

export function updateSubFolder(mainId, folderId, payload){
    return dispatch => {
        dispatch({
            type: LOADING_FOLDER
        })
        api.patch(`library/folder/${mainId}/sub/${folderId}`, payload)
        .then(({data: { success, message, data }}) => {
            console.log(data);
            if(success){
                (data) ?
                    dispatch({
                        type: UPDATE_SUB_FOLDER_SUCCESS,
                        mainFolders: [],
                        subFolders: data,
                        files: [],
                        success: true,
                        loading: false
                    })
                :
                    dispatch(getSubFolder(mainId))
            }else{ 
                dispatch({
                    type: UPDATE_SUB_FOLDER_FAILED,
                    mainFolders: [],
                    subFolders: [],
                    files: [],
                    success: false,
                    loading: false
                })
                swal.fire({
                    title: 'Update Folder',
                    text: message,
                    timer: 3000,
                    icon: 'error'
                });
            }
        })
        .catch(err => {
            console.error(err);
            swal.fire({
                title: 'Update Folder',
                text: err.message,
                timer: 3000,
                icon: 'error'
            });
            dispatch({
                type: UPDATE_SUB_FOLDER_FAILED,
                mainFolders: [],
                subFolders: [],
                files: [],
                success: false,
                loading: false
            })
        })
    }
}

export function deleteSubFolder(mainId, folderId, name) {
	return dispatch => {
		swal.fire({
			title: `Are you sure want to delete ${name}?`,
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
			showLoaderOnConfirm: true,
			preConfirm: () => {
				swal.fire({
            title: 'Processing ...',
            allowOutsideClick: false
        });
				swal.showLoading();
				api.delete(`library/folder/${mainId}/sub/${folderId}`)
                .then(({data: { success, message, data }}) => {
                    console.log(data);
                    if(success){
                        (data) ?
                            dispatch({
                                type: DELETE_SUB_FOLDER_SUCCESS,
                                mainFolders: [],
                                subFolders: data,
                                files: [],
                                success: true,
                                loading: false
                            })
                        :
                            dispatch(getSubFolder(mainId))
                            swal.fire({
                                title: 'Delete Folder',
                                text: message,
                                icon: 'success'
                            });
                    }else{ 
                        dispatch({
                            type: DELETE_SUB_FOLDER_FAILED,
                            mainFolders: [],
                            subFolders: [],
                            files: [],
                            success: false,
                            loading: false
                        })
                        swal.fire({
                            title: 'Delete Folder',
                            text: message,
                            icon: 'error'
                        });
                    }
                })
                .catch(err => {
                    console.error(err);
                    swal.fire({
                        title: 'Delete Folder',
                        text: err.message,
                        icon: 'error'
                    });
                    dispatch({
                        type: DELETE_SUB_FOLDER_FAILED,
                        mainFolders: [],
                        subFolders: [],
                        files: [],
                        success: false,
                        loading: false
                    })
                })
			}
		})
	}

}

export function grantSubFolderAccess(mainId, folderId, folderName, roleId) {
	return dispatch => {
		swal.fire({
			title: `Are you sure want to grant access to ${folderName}?`,
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Grant it!',
			showLoaderOnConfirm: true,
			preConfirm: () => {
				swal.fire({
            title: 'Processing ...',
            allowOutsideClick: false
        });
				swal.showLoading();
				api.patch(`library/folder/${mainId}/sub/${folderId}/access`, {roleId})
                .then(({data: { success, message, data }}) => {
                    console.log(data);
                    if(success){
                        (data) ?
                            dispatch({
                                type: ACCESS_SUB_FOLDER_SUCCESS,
                                mainFolders: [],
                                subFolders: data,
                                files: [],
                                success: true,
                                loading: false
                            })
                        :
                            dispatch(getSubFolder(mainId))
                            swal.fire({
                                title: 'Grant Access',
                                text: message,
                                icon: 'success'
                            });
                    }else{ 
                        dispatch({
                            type: ACCESS_SUB_FOLDER_FAILED,
                            mainFolders: [],
                            subFolders: [],
                            files: [],
                            success: false,
                            loading: false
                        })
                        swal.fire({
                            title: 'Grant Access',
                            text: message,
                            icon: 'error'
                        });
                    }
                })
                .catch(err => {
                    console.error(err);
                    swal.fire({
                        title: 'Grant Access',
                        text: err.message,
                        icon: 'error'
                    });
                    dispatch({
                        type: ACCESS_SUB_FOLDER_FAILED,
                        mainFolders: [],
                        subFolders: [],
                        files: [],
                        success: false,
                        loading: false
                    })
                })
			}
		})
	}

}

export function getSubFolderFiles(id = 0){
    return dispatch => {
        dispatch({
            type: LOADING_FOLDER
        })

        api.get(`library/folder/sub/${id}/file`)
        .then(({data: { success, message, data }}) => {
            console.log(data);
            (success) ?
                (data) ?
                    dispatch({
                        type: GET_SUB_FOLDER_FILE,
                        subFolders: [],
                        files: data
                    })
                :
                    dispatch({
                        type: GET_SUB_FOLDER_FILE,
                        mainFolders: [],
                        subFolders: [],
                        files: []
                    })
            : 
                dispatch({
                    type: GET_SUB_FOLDER_FILE,
                    mainFolders: [],
                    subFolders: [],
                    files: []
                })
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: GET_SUB_FOLDER_FILE,
                mainFolders: [],
                subFolders: [],
                files: []
            })
        })
    }
}

export function uploadDocument(mainId, folderId, formData){
    return dispatch => {
        dispatch({
            type: LOADING_FOLDER
        })
        api.post(`library/folder/${mainId}/sub/${folderId}/file`, formData,
        {
            headers:{
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: progressEvent => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log({percentCompleted});
                dispatch({
                    type: UPLOAD_FILE_PROGRESS,
                    progress: parseInt(percentCompleted),
                    loading: true
                })
                swal.fire(`Processing ${percentCompleted}% ...`);
		        swal.showLoading();
            }
        })
        .then(({data: { success, message, data }}) => {
            console.log(data);
            if(success){
                (data) ?
                    dispatch({
                        type: UPLOAD_FILE_SUCCESS,
                        mainFolders: [],
                        subFolders: [],
                        progress: 100,
                        files: data,
                        success: true,
                        loading: false
                    })
                :
                    dispatch(getSubFolderFiles(folderId))
                swal.fire({
                    title: 'Upload Document',
                    text: message,
                    icon: 'success'
                });
            }else{ 
                dispatch({
                    type: UPLOAD_FILE_FAILED,
                    mainFolders: [],
                    subFolders: [],
                    files: [],
                    success: false,
                    loading: false
                })
                swal.fire({
                    title: 'Upload Document',
                    text: message,
                    icon: 'error'
                });
            }
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: UPLOAD_FILE_FAILED,
                mainFolders: [],
                subFolders: [],
                files: [],
                success: false,
                loading: false
            })
            swal.fire({
                title: 'Upload Document',
                text: err.message,
                icon: 'error'
            });
        })
    }
}

export function updateDocument(mainId, folderId, fileId, formData){
    return dispatch => {
        dispatch({
            type: LOADING_FOLDER
        })
        api.patch(`library/folder/${mainId}/sub/${folderId}/file/${fileId}`, formData,
        {
            headers:{
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: progressEvent => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log({percentCompleted});
                dispatch({
                    type: UPLOAD_FILE_PROGRESS,
                    progress: parseInt(percentCompleted),
                    loading: true
                })
                swal.fire(`Processing ${percentCompleted}% ...`);
		        swal.showLoading();
            }
        })
        .then(({data: { success, message, data }}) => {
            if(success){
                (data) ?
                    dispatch({
                        type: UPDATE_FILE_SUCCESS,
                        mainFolders: [],
                        subFolders: [],
                        progress: 100,
                        files: data,
                        success: true,
                        loading: false
                    })
                :
                    dispatch(getSubFolderFiles(folderId))
                swal.fire({
                    title: 'Update Document',
                    text: message,
                    icon: 'success'
                });
            }else{ 
                dispatch({
                    type: UPDATE_FILE_FAILED,
                    mainFolders: [],
                    subFolders: [],
                    files: [],
                    success: false,
                    loading: false
                })
                swal.fire({
                    title: 'Update Document',
                    text: message,
                    icon: 'error'
                });
            }
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: UPDATE_FILE_FAILED,
                mainFolders: [],
                subFolders: [],
                files: [],
                success: false,
                loading: false
            })
            swal.fire({
                title: 'Update Document',
                text: err.message,
                icon: 'error'
            });
        })
    }
}

export function deleteDocument(mainId, folderId, fileId, name) {
	return dispatch => {
		swal.fire({
			title: `Are you sure want to delete ${name}?`,
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
			showLoaderOnConfirm: true,
			preConfirm: () => {
				swal.fire({
            title: 'Processing ...',
            allowOutsideClick: false
        });
				swal.showLoading();
				api.delete(`library/folder/${mainId}/sub/${folderId}/file/${fileId}`)
                .then(({data: { success, message, data }}) => {
                    console.log(data);
                    if(success){
                        (data) ?
                            dispatch({
                                type: DELETE_FILE_SUCCESS,
                                mainFolders: [],
                                subFolders: [],
                                progress: 100,
                                files: data,
                                success: true,
                                loading: false
                            })
                        :
                            dispatch(getSubFolder(mainId))
                            swal.fire({
                                title: 'Delete Document',
                                text: message,
                                icon: 'success'
                            });
                    }else{ 
                        dispatch({
                            type: DELETE_FILE_FAILED,
                            mainFolders: [],
                            subFolders: [],
                            files: [],
                            success: false,
                            loading: false
                        })
                        swal.fire({
                            title: 'Delete Document',
                            text: message,
                            icon: 'error'
                        });
                    }
                })
                .catch(err => {
                    console.error(err);
                    swal.fire({
                        title: 'Delete Document',
                        text: err.message,
                        icon: 'error'
                    });
                    dispatch({
                        type: DELETE_FILE_FAILED,
                        mainFolders: [],
                        subFolders: [],
                        files: [],
                        success: false,
                        loading: false
                    })
                })
			}
		})
	}

}
