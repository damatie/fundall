import _ from '@lodash';
import TextField from '@material-ui/core/TextField';
import { withFormsy } from 'formsy-react';
import React from 'react';

function TextFieldFormsy(props) {
	const importedProps = _.pick(props, [
		'autoComplete',
		'autoFocus',
		'children',
		'className',
		'defaultValue',
		'disabled',
		'FormHelperTextProps',
		'fullWidth',
		'id',
		'InputLabelProps',
		'inputProps',
		'InputProps',
		'inputRef',
		'label',
		'multiline',
		'name',
		'onBlur',
		'onChange',
		'onFocus',
		'placeholder',
		'required',
		'rows',
		'rowsMax',
		'select',
		'SelectProps',
		'type',
		'variant',
		'style',
		'step'
	]);

	const { errorMessage } = props;
	const { error } = props;
	const { helperText } = props;
	const value = props.value || '';

	function changeValue(event, nextProp) {
		props.setValue(event.currentTarget.value, nextProp);
		if (props.onChange) {
			props.onChange(event);
		}
	}

	return (
		<TextField
			{...importedProps}
			onChange={changeValue}
			value={value}
			error={Boolean((!props.isPristine && props.showRequired) || errorMessage ||error)}
			helperText={errorMessage || helperText}
		/>
	);
}

export default React.memo(withFormsy(TextFieldFormsy));
