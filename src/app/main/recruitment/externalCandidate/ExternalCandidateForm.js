import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Step from '@material-ui/core/Step';
import GridSystem from 'app/shared/gridSystem';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import LogoHolder from './components/LogoHolder';
import JobInfo from './components/JobInfo';
import JobDescription from './components/JobDescription';
import CandidateForm from './components/CandidateForm';
import NotFoundPage from './components/PositionNotFound';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import useExternalCandidate from '../hooks/useExternalCandidate';
import { Skeleton } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
    background: '#fff',
  },
  sub: {
    marginTop: theme.spacing(1),
    padding: '5rem',
    width: '100%',
    height: 'auto',
    background: '#fff',
    bottom: '20px'
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  spacing: {
    bottom: '10%',
  },
  divder: {
    height: 1,
    color: "#6f6f6f",
    backgroundColor: "#6f6f6f"
  }
}));


const ExternalCandidateForm = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const query = new URLSearchParams(props.location.search);
  const { push } = useHistory();
  const location = useLocation();
  const state = useSelector(state => state.ExternalCandidate);
  const hash = query.get('hash');
  const customHook = useExternalCandidate({
    state,
    hash,
    dispatch,
    push
  });

  return (
    hash ? (
      customHook?.oneLoading ? (
        <Skeleton animation="wave" width="100%" height="100%" variant="rect" />
      ): (
          customHook?.content?.status === 'PUBLISHED' ? (
            <div className={classes.root}>
                <div className={classes.sub}>
                    <Divider className={`my-16 ${classes.divder}`} variant="middle" orientation="horizontial" />
                    <Grid container xs={12} spacing={1} sm={12} md={12} lg={12}>
                        <Grid item xs={6} sm={6} md={6} lg={6} className="my-10">
                            <LogoHolder customHook={customHook}/>
                            <JobInfo customHook={customHook}/>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} lg={1}>
                            <Divider  style={{height: '100%', textAlign: 'center'}} variant="middle" orientation="vertical" />
                        </Grid>
                        <Grid item xs={5} sm={5} md={5} lg={5} spacing={2} className={`my-10 ${classes.spacing}`}>
                            {customHook?.apply ? (
                                <CandidateForm customHook={customHook}/>
                            ): 
                            ( 
                                <JobDescription customHook={customHook}/>
                            )
                            }
                        </Grid>
                    </Grid>
                </div>
            </div>
          ): (
            <NotFoundPage  customHook={customHook} text={`Sorry the job you are looking for has been ${customHook?.content?.status}`}/>
          )
        )
    ):(
        <NotFoundPage  customHook={customHook}/>
    )
  );
}

export default withReducer('ExternalCandidate', reducer)(ExternalCandidateForm);