import { Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import React from 'react';

function Widget(props) {


    return (
        <Paper className="w-full rounded-8 shadow-none border-1">
            <div className="flex items-center justify-between px-16 h-64 border-b-1">
                <Typography className="text-16">{props.widget.title}</Typography>            </div>
            <List>
                {props.widget.data.map(item => (
                    <ListItem key={item.id}>
                        <ListItemText primary={item.dept} secondary={item.count} />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="more">
                                <Icon>more_vert</Icon>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default React.memo(Widget);
