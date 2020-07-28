import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as quickPanelActions from './store/actions';
import Badge from '@material-ui/core/Badge';

function QuickPanelToggleButton(props) {
	const dispatch = useDispatch();
	const notifications = useSelector(({ notifications }) => notifications.notifications);

	return (
		<IconButton className="w-64 h-64" onClick={ev => dispatch(quickPanelActions.toggleQuickPanel())}>
			<Badge badgeContent={notifications.length} color="secondary">
				{props.children}
			</Badge>
		</IconButton>
	);
}

QuickPanelToggleButton.defaultProps = {
	children: <Icon>notifications</Icon>
};

export default QuickPanelToggleButton;
