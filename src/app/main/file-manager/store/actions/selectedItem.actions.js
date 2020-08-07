export const SET_SELECTED_ITEM_ID = 'SET SELECTED ITEM';

export function setSelectedItem(id, payload) {
	return {
		type: SET_SELECTED_ITEM_ID,
		id: id,
		payload: payload
	};
}
