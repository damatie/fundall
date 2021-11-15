
export function inputTypeSelected(selectedValue,) {
	return dispatch => {
		dispatch({
		  type: 'INPUTTYPESELECTED',
			selected: selectedValue,
		
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

