import Api from 'app/services/api';

export const GET_BUSINESS_UNITS = 'GET BUSINESS_UNITS';
export const SET_BUSINESS_UNITS_SEARCH_TEXT = 'SET BUSINESS_UNITS SEARCH TEXT';
export const REMOVE_ENTITY = 'REMOVE ENTITY';

export function getBusinessUnits() {

	return async (dispatch) => {
      const {data: {data}} = await Api.get(`entity/`);
      // console.log(data); 
      // request.then(res => {
        dispatch({
          type: GET_BUSINESS_UNITS,
          payload: data
        })
      // })
  }
};

export function setBusinesUnitsSearchText(event) {
	return {
		type: SET_BUSINESS_UNITS_SEARCH_TEXT,
		searchText: event.target.value
	};
};