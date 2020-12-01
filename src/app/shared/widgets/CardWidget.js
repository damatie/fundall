import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';

const CardWidget = (props) =>{
    // const color = "blue";
    const classes = {
        root: "text-40 leading-none text-"+props.color
    }
	return (
		<Paper className={`w-full rounded-8 shadow-none border-1 flex flex-col justify-center items-center ${props.className}`}>
			<div className="text-center pt-12">
				<Typography className={classes.root}>
					{props.count}
				</Typography>
				<Typography className="text-16" color="textSecondary">
					{props.title}
				</Typography>
			</div>
            <div className="pt-20"></div>
		</Paper>
	);
}

export default React.memo(CardWidget);
