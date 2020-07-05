import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import React, { useState } from 'react';

const rows = [
	{
		id: 'S/N',
		align: 'left',
		disablePadding: false,
		label: 'S/N',
		sort: true
	},
	{
		id: 'Item',
		align: 'left',
		disablePadding: false,
		label: 'Item',
		sort: true
  },
  {
		id: 'Responsibility',
		align: 'left',
		disablePadding: false,
		label: 'Responsibilities',
		sort: true
	},
	{
		id: 'Tick',
		align: 'left',
		disablePadding: false,
		label: 'Tick',
		sort: true
	}
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function EmployeeChecklistHead(props) {
	const classes = useStyles(props);
	const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);

	// const createSortHandler = property => event => {
	// 	props.onRequestSort(event, property);
	// };

	function openSelectedProductsMenu(event) {
		setSelectedProductsMenu(event.currentTarget);
	};

	function closeSelectedProductsMenu() {
		setSelectedProductsMenu(null);
	};

	return (
		<TableHead>
			<TableRow className="h-64">
				{rows.map(row => {
					return (
						<TableCell
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
						>
							<b>{row.label}</b>
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}

export default EmployeeChecklistHead;
