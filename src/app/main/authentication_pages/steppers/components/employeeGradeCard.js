import React from "react";
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import EmployeeGradeModal from "./employeeGrade";

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


export default function EmployeeGradeCard({name, description, data, employeeGrades, entities, entityName}) {
    const dispatch = useDispatch();
    const [openEmployeeGradeModal, setOpenEmployeeGradeModal] = React.useState(false);
    const classes = useStyles();
    
    const HandleAddEntity = () => {
        setOpenEmployeeGradeModal(true);
    }

    return (
        <div>
            <Grid container spacing={3} direction="row" style={{ paddingLeft: '10px', paddingRight: '10px', paddingBottom: '5px'}}>
                <Grid item lg={5} md={8} sm={9} xs={9} direction="row" align='left' className='my-10 flex-row' style={{ borderRadius: '10px', border: 'solid 1px black'}}>
                    <Grid container spacing={3}>
                    <Grid item lg={2} md={2} sm={3} xs={12} align='left' className=''>
                        <Typography variant="body1" color="initial" className='my-6'><strong>{name}</strong></Typography>
                    </Grid>
                    <Grid item lg={8} md={8} sm={6} xs={12} align='left' className=''>
                        <Typography variant="body2" color="initial" className='my-6'>{description}</Typography>
                    </Grid>
                    {/* <Grid item lg={2} md={2} sm={3} xs={12} align='left' className=''>
                        <Typography variant="body2" color="initial" className='mr-2'><strong>Entity: </strong></Typography>
                        <br/>
                        <Typography variant="body2" color="initial">{entityName}</Typography>
                    </Grid> */}
                    </Grid>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={3} align='left' className='my-10'>
                    <Button onClick={HandleAddEntity} variant="contained" color="secondary">
                    <span style={{ marginRight: '5px' }}><EditIcon/></span> Edit
                    </Button>
                </Grid>
            </Grid>
            <EmployeeGradeModal open={openEmployeeGradeModal} employeeGrades={employeeGrades || []} entities={entities} setOpen={setOpenEmployeeGradeModal} data={data} edit={true}/>
        </div>
    )
}
