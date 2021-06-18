import React from "react";
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import EditIcon from '@material-ui/icons/Edit';
import EntityModal from "./entityModal";
import EmployeeGradeLevelModal from "./employeeGradeLevel";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      height: '100%',
      overflowY: 'scroll',
      flexDirection: 'column',
      margin: '0rem auto',
      padding: '5rem',
      '& form': {
        width: '100%',
      }
    }
}))


export default function EmployeeGradeLevelCard({name, description, data}) {

    const dispatch = useDispatch();
    const [openEmployeeGradeLevelModal, setOpenEmployeeGradeLevelModal] = React.useState(false);
    const classes = useStyles();
    
    const HandleAddEntity = () => {
        setOpenEmployeeGradeLevelModal(true);
    }

    return (
        <div>
            <Grid container spacing={3} direction="row" style={{ paddingLeft: '10px', paddingRight: '10px', paddingBottom: '5px'}}>
                <Grid item lg={5} md={8} sm={9} xs={9} direction="row" align='left' className='my-10 flex-row' style={{ borderRadius: '10px', border: 'solid 1px black'}}>
                    <Grid container spacing={3}>
                    <Grid item lg={3} md={3} sm={4} xs={12} align='left' className=''>
                        <Typography variant="body1" color="initial" className='my-6'><strong>{name}</strong></Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={8} xs={12} align='left' className=''>
                        <Typography variant="body2" color="initial" className='my-6'>{description}</Typography>
                    </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={3} align='left' className='my-10'>
                    <Button onClick={HandleAddEntity} variant="contained" color="secondary">
                    <span style={{ marginRight: '5px' }}><EditIcon/></span> Edit
                    </Button>
                </Grid>
            </Grid>
            <EmployeeGradeLevelModal open={openEmployeeGradeLevelModal} edit={true} setOpen={setOpenEmployeeGradeLevelModal} data={data}/>
        </div>
    )
}
