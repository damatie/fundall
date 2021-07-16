import React from "react";
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

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


export default function KpoContentCard({index, kpoCategory, description, target, pipTarget, edit, setEdit}) {

    const dispatch = useDispatch();
    // const [edit, setEdit] = React.useState(false);
    const classes = useStyles();
    

    return (
        <div>
            <Box
                boxShadow={3}
                bgcolor="background.paper"
                p={0}
                style={{ borderRadius: '15px', marginTop: '15px', marginBottom: '15px' }}
            >    
                <Grid container spacing={0} direction="row" align='left' className='flex-row' style={{ borderRadius: '15px' }}>
                    <Grid item lg={1} md={1} sm={1} xs={1} align='center' className='text-center py-auto' style={{ borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px',  color: '#fff', backgroundColor: '#192d3e'}}>
                        <Typography variant="h5" color="initial" className='text-center py-auto'>{index}</Typography>
                    </Grid>
                    <Grid item lg={11} md={11} sm={11} xs={11} >
                        <Grid container spacing={3} style={{ padding: '20px'}}>
                            <Grid item lg={10} md={10} sm={10} xs={10} align='left' className=''>
                                <Typography variant="body2" color="initial" className='my-6'>KPO Category</Typography>
                                <Typography variant="body2" color="initial" className='my-6'>{kpoCategory}</Typography>
                            </Grid>
                            <Grid item lg={2} md={2} sm={2} xs={2} align='left' className='my-10'>
                                <Button onClick={() => {setEdit(true)}} variant="contained">
                                <span style={{ marginRight: '5px' }}><EditIcon/></span> Edit
                                </Button>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} align='left' className=''>
                                <Typography variant="body2" color="initial" className='my-6'>Description</Typography>
                                <Typography variant="body2" color="initial" className='my-6'>{description}</Typography>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} align='left' className=''>
                                <Typography variant="body2" color="initial" className='my-6'>Target</Typography>
                                <Typography variant="body2" color="initial" className='my-6'>{target}</Typography>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} align='left' className=''>
                                <Typography variant="body2" color="initial" className='my-6'>Pip Target</Typography>
                                <Typography variant="body2" color="initial" className='my-6'>{pipTarget}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Box>
        </div>
    )
}
