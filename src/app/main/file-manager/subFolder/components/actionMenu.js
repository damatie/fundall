import Arrow from '@material-ui/icons/ArrowForwardIosRounded';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { green} from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
	granted: {
		color: green[500]
		// color: 'white',
		// "&:hover, &:focus": {
		//     background: lightGreen[500],
		//     color: 'black'
		// }
	},
	revoked: {
		color: 'transparent'
	}
}));

export default function ActionMenu(props) {
	const classes = useStyles(props);

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	// // console.log(props)
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const hasAccess = roleId => {
		return props.selected.access.includes(roleId.toString());
	};

	return (
		<div>
			<Menu
				id="fade-menu"
				anchorEl={props.anchorEl}
				keepMounted
				open={Boolean(props.anchorEl)}
				onClose={props.handleClose}
				TransitionComponent={Fade}
			>
				{props.documentMainFolderName.toUpperCase().includes('PRIVATE') && (
					<MenuItem onClick={handleClick}>
						Manage Access
						<Button aria-controls="fade-menu" aria-haspopup="true">
							<Arrow />
						</Button>
					</MenuItem>
				)}
				<MenuItem onClick={ev => props.handleRename(props.selected)} disabled={parseInt(props.userId) !== props.selected.createdBy}>Rename</MenuItem>
				<MenuItem onClick={ev => props.handleDelete(props.selected.id, props.selected.name)} disabled={parseInt(props.userId) !== props.selected.createdBy}>Delete</MenuItem>
				<MenuItem
					onClick={ev => {
						props.viewDetails(props.selected);
					}}
				>
					Details
				</MenuItem>
			</Menu>

			<Menu
				id="fade-menu-2"
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
				variant={'selectedMenu'}
			>
				{props.roles &&
					props.roles
						.filter(i => i.name.toUpperCase() !== 'EMPLOYEE')
						.sort()
						.map((item, id) => (
							<MenuItem
								value={item.name}
								onClick={ev => {
									props.grantAccess(item.id, hasAccess(item.id) ? 'Revoke' : 'Grant');
									handleClose();
								}}
								key={item.id}
							>
                                <Tooltip
                                    title={hasAccess(item.id) ? `${item.name} has access to this folder` : ""}
                                    enterDelay={300}
                                >
                                    <div>{<CheckIcon style={{color: hasAccess(item.id) ? green[500] : 'transparent', padding: 0, margin: 0}} />} &nbsp;
                                    {item.name}</div>
                                </Tooltip>
							</MenuItem>
						))}
			</Menu>
		</div>
	);
}
