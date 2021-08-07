import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Divider, Button, Grid } from '@material-ui/core';
import JobDescription from './JobDescription';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root:{
        padding: theme.spacing(1),
		backgroundColor: '#fff'
    },
    img: {
      width: '197px',
      height: '44px',
      margin: theme.spacing(2)
    },
    jobPosition:{
        height: '47px',
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        color: '#121212',
        fontSize: '48px',
        fontWeight: 'bold',
        lineHeight: '60px'
    },
    link:{
        height: '44px',
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(3),
        color: '#000000',
        fontWeight: 500
    },
    divder: {
      width: '390px',
      margin: theme.spacing(2),
    },
    button:{
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        border:'1px solid #000',
        cursor: 'default'
    },
    applyButton:{
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        fontWeight: 700
    }
  }));
const JobInfo = ({customHook}) => {
 const classes = useStyles();
    const {
        apply,
        setApply,
        content,
        oneLoading
    } = customHook;
    return (
        oneLoading ? (
            <Skeleton animation="wave" width="100%" height="315px" variant="rect" />
        ):(
            <>
                <div className={classes.root}>
                    <Typography variant="h4" className={classes.jobPosition}>
                        {content?.jobTitle?.name || "Recruitment Officer"}
                    </Typography>
                    <div className="my-16">
                        <Button
                            variant="outlined"
                            type="button"
                            className={`mr-10 ${classes.button}`}
                        >
                            {content?.openingType || 'Full Time'}
                        </Button>
                        <Button
                            variant="outlined"
                            type="button"
                            className={`${classes.button}`}
                        >
                            
                            {`${content?.stateId?.split(' ')[0]} ${content?.positionType || 'Lagos (Onsite)'}`}
                        </Button>
                    </div>
                    <Typography variant="subtitle1" className={classes.link}>
                        {'www.Springrockenergies.com'}
                    </Typography>

                    {apply ? (
                        <>
                            <Divider className={`my-10 ${classes.divder}`} />
                            <JobDescription customHook={customHook}/>
                        </>

                    ) : (
                        <>
                            <Button
                                variant="contained"
                                type="button"
                                color="secondary"
                                size="large"
                                className={`${classes.applyButton}`}
                                onClick = {() => setApply(true)}
                            >
                                Apply Now
                            </Button>
                        </>
                    )
                    }
                </div>
            </>
        )
    )
}

export default JobInfo;