
export function inputTypeSelected(selectedValue, inputTypeValue) {
	return dispatch => {
		dispatch({
		  type: 'INPUTTYPESELECTED',
			selected: selectedValue,
			inputType: inputTypeValue,
		
		});
	}
}
// export function inputNameSelected(inputTypeValue) {
// 	return dispatch => {
// 		dispatch({
// 		  type: 'INPUTNAMESELECTED',
// 			inputType: inputTypeValue,
// 		});
// 	}
// }

