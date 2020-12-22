
import MenuIcon from '@material-ui/icons/MoreVert';
import Arrow from '@material-ui/icons/ArrowForwardIosRounded'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';

export default function ActionMenu(props){
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    console.log(props)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return(
        <div>
            <Menu
                id="fade-menu"
                anchorEl={props.anchorEl}
                keepMounted
                open={Boolean(props.anchorEl)}
                onClose={props.handleClose}
                TransitionComponent={Fade}
            >
                {(props.documentMainFolderName.toUpperCase().includes('PUBLIC')) &&
                    <MenuItem onClick={handleClick}>Manage Access
                        <Button aria-controls="fade-menu" aria-haspopup="true" >
                            <Arrow/>
                        </Button>
                    </MenuItem>
                }
                <MenuItem onClick={ev => props.handleRename()}>Rename</MenuItem>
                <MenuItem onClick={ev => props.handleDelete()}>Delete</MenuItem>
                <MenuItem onClick={ev => {props.viewDetails()}} >Details</MenuItem>
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
                {props.roles && props.roles.filter(i => i.name.toUpperCase() !== 'EMPLOYEE').sort().map((item, id) => (
                    <MenuItem value={item.name} onClick={ev => {props.grantAccess(item.id); handleClose()}} key={item.id}>{item.name}</MenuItem>
                ))}
            </Menu>
        </div>
    )
}