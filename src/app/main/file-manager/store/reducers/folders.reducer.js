import _ from '@lodash';
import * as Actions from '../actions';
const initialState = {
	loading: false,
    mainFolders: [],
    subFolders: [],
    files: [],
	success: true,
	progress: 0,
	uploadLoading: false,
	uploadSuccess: false
  }
const foldersReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_FOLDER: {
			return {
			  ...state,
			  loading: true,
			}
		  };
		case Actions.CLEAR_FOLDER_LIST: {
			return {
				...state,
				loading: false,
				mainFolders: [],
				subFolders: [],
				files: [],
				success: true
			}
		  };
		case Actions.GET_MAIN_FOLDER:
			return {
				...state,
				loading: false,
                mainFolders: action.mainFolders,
                files: action.files,
			};
		case Actions.GET_SUB_FOLDER:
			return {
				...state,
				loading: false,
                subFolders: action.subFolders,
                files: action.files,
			};
		case Actions.GET_SUB_FOLDER_FILE:
			return {
				...state,
				loading: false,
                subFolders: action.subFolders,
                files: action.files,
			};
		case Actions.CREATE_SUB_FOLDER_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.success,
				subFolders: action.subFolders,
			};
		case Actions.CREATE_SUB_FOLDER_FAILED:
			return {
				...state,
				loading: false,
				success: action.success
			};
		case Actions.UPDATE_SUB_FOLDER_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.success,
				subFolders: action.subFolders,
			};
		case Actions.UPDATE_SUB_FOLDER_FAILED:
			return {
				...state,
				loading: false,
				success: action.success
			};
		case Actions.DELETE_SUB_FOLDER_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.success,
				subFolders: action.subFolders,
			};
		case Actions.DELETE_SUB_FOLDER_FAILED:
			return {
				...state,
				loading: false,
				success: action.success
			};
		case Actions.ACCESS_SUB_FOLDER_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.success,
				subFolders: action.subFolders,
			};
		case Actions.ACCESS_SUB_FOLDER_FAILED:
			return {
				...state,
				loading: false,
				success: action.success,
			};
		case Actions.UPLOAD_FILE_PROGRESS:
			return {
				...state,
				uploadLoading: true,
				success: action.success,
				progress: action.progress,
			};
		case Actions.UPLOAD_FILE_SUCCESS:
			return {
				...state,
				uploadLoading: false,
				uploadSuccess: action.success,
				files: action.files,
			};
		case Actions.UPLOAD_FILE_FAILED:
			return {
				...state,
				uploadLoading: false,
				uploadSuccess: action.success
			};
		case Actions.UPDATE_FILE_SUCCESS:
			return {
				...state,
				uploadLoading: false,
				uploadSuccess: action.success,
				files: action.files,
			};
		case Actions.UPDATE_FILE_FAILED:
			return {
				...state,
				uploadLoading: false,
				uploadSuccess: action.success
			};
		case Actions.DELETE_FILE_SUCCESS:
			return {
				...state,
				uploadLoading: false,
				uploadSuccess: action.success,
				files: action.files,
			};
		case Actions.DELETE_FILE_FAILED:
			return {
				...state,
				uploadLoading: false,
				uploadSuccess: action.success
			};
		default:
			return state;
	}
};

export default foldersReducer;
