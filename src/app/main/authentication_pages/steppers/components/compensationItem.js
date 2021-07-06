import React from "react";
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Input from 'app/shared/TextInput/Input';


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      margin: '0rem auto',
      padding: '5rem',
      '& form': {
        width: '100%',
      }
    }
}))


export default function CompensationItem({name, compensationObj}) {
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={1} direction="row" style={{ paddingLeft: '10px', paddingRight: '10px', paddingBottom: '2px'}}>
                <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='my-10 flex-row'>
                    <span variant="body1" color="initial" className='mr-5'><strong>{name}</strong></span>
                    <Input
                        className='float-left'
                        label={name}
                        name={name}
                        type='number'
                        value={compensationObj[name] ?? undefined}
                    />
                </Grid>
            </Grid>
        </div>
    )
}
