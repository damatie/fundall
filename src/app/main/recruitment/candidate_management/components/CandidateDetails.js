import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import DownloadIcon from '@material-ui/icons/SaveAlt';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import GridSystem from 'app/shared/gridSystem';
import UpdateApplicantCard from './UpdateApplicantCard';
import ReadLess from 'app/shared/TextInput/ReadLess';
import SharedButton from 'app/shared/button/SharedButton';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100%',
		overflowY: 'scroll',
		flexDirection: 'column',
		margin: '0rem auto',
		padding: '5rem',
		'& form': {
			width: '100%'
		}
	},
	openingDetailLabel: {
		fontWeight: 600,
		fontSize: 14,
		// lineHeight: 15,
		color: '#6F6F6F',

		[theme.breakpoints.down('xs')]: {
			fontSize: 12
		}
	},
	openingDetailContent: {
		fontWeight: 600,
		fontSize: 16,
		// lineHeight: 20,
		textAlign: 'justify',
		color: '#000000',

		[theme.breakpoints.down('xs')]: {
			fontSize: 13
		}
	}
}));

const UpdateButton = withStyles(theme => ({
	root: {
		color: '#000000',
		backgroundColor: '#62DAFC',
		'&:hover': {
			backgroundColor: '#62DAFC'
		}
	}
}))(Button);


export default function CandidateDetails({ customHook }) {
	const classes = useStyles();
	
    const {
        content,
        handleEdit,
        showEdit,
        handleDownload
    } = customHook;
    // console.log(customHook);
	return (
        customHook.oneLoading ? (
            <Skeleton animation="wave" width="100%" height="315px" variant="rect" />
        ) :
        (
        showEdit ? (
            <UpdateApplicantCard customHook={customHook} />
        ): (
        <div key={content?.id}>
            <Box
                boxShadow={3}
                // bgcolor="#6F6F6F"
                p={0}
                style={{ borderRadius: '15px', marginTop: '10px', marginBottom: '10px', backgroundColor: "#dddddd", height: 'auto', padding: '50px' }}
                key={content?.id}
            >
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    align="left"
                    className="flex-row"
                    style={{ borderRadius: '15px' }}
                >
                    
                    <Grid item lg={11} md={11} sm={11} xs={11}>
                        <Grid container spacing={3} style={{ padding: '10px' }}>
                            <Grid item lg={10} md={10} sm={10} xs={10} align="left" className="">
									<GridSystem>
										<div>
											<Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
												Applicant Name
											</Typography>
											<Typography
												variant="body2"
												color="initial"
												style={{ textTransform: 'uppercase' }}
												className={` my-10 ${classes.openingDetailContent}`}
											>
												{content?.applicantName}
											</Typography>
										</div>
										<div>
											<Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
												Applicant Email
											</Typography>
											<Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailContent}`}>
												{content?.applicantEmail}
											</Typography>
										</div>

									</GridSystem>
								</Grid>
								<Grid item lg={2} md={2} sm={2} xs={2} align="left" className="my-10">
									<UpdateButton
											onClick={() => {
												console.log(content);
												console.log('go to update page');
												handleEdit();
											}}
											variant="contained"
											color="primary"
										>
                                        <span style={{ marginRight: '5px' }}>
                                            <EditIcon />
                                        </span>{' '}
                                        Update
                                    </UpdateButton>
								</Grid>
                            <Grid item lg={10} md={10} sm={10} xs={10} align="left" className="">
                                <GridSystem>
                                    <div>
                                        <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
                                            Applicant Name
                                        </Typography>
                                        <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailContent}`}>
                                            {content?.applicantName}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
                                            Applicant Email
                                        </Typography>
                                        <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailContent}`}>
                                            {content?.applicantEmail}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
                                            Contact Number
                                        </Typography>
                                        <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailContent}`}>
                                            {content?.contactNumber}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
                                            Job Applied Date
                                        </Typography>
                                        <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailContent}`}>
                                        {moment(content?.dateApplied).format('DD-MM-YYYY')}
                                        </Typography>
                                    </div>
                                </GridSystem>
                                <GridSystem>
                                    <div>
                                        <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
                                            Home Address
                                        </Typography>
                                        <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailContent}`}>
                                            <ReadLess text={content?.homeAddress} size={100}/>
                                        </Typography>
                                    </div>
                                </GridSystem>
                                <GridSystem>
                                    <div>
                                        <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
                                            Application Source
                                        </Typography>
                                        <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailContent}`}>
                                            {content?.applicationSource}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
                                            Application Status
                                        </Typography>
                                        <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailContent}`}>
                                            {content?.applicationStatus}
                                        </Typography>
                                    </div>
                                </GridSystem>

                                <div style={{display: 'flex', verticalAlign:'middle', position:'relative', lineHeight: '18px'}}>
                                    <Box
                                        boxShadow={0}
                                        // bgcolor="#6F6F6F"
                                        className="mr-10"
                                        p={0}
                                        style={{ borderRadius: '10px', marginTop: '25px', marginBottom: '25px', backgroundColor: "#cccccc", height: '65px', maxWidth:`${content?.resume?.split('/')?.pop().length * 13}px`, padding: '15px'}}
                                        key={`icon${content?.id}`}
                                    >
                                        <div>
                                            <Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailContent}`}>
                                                <AttachFileIcon />
                                                {content?.resume?.split('/')?.pop()}
                                            </Typography>
                                        </div>
                                    </Box>
                                    <Box
                                        boxShadow={0}
                                        bgcolor="primary"
                                        p={0}
                                        style={{ borderRadius: '10px', marginTop: '25px', marginBottom: '25px', backgroundColor: "#62DAFC", height: '65px', maxWidth:"70px", padding: '10px', cursor:'pointer'}}
                                        key={`icon${content?.id}`}
                                    >
                                        <DownloadIcon fontSize="large" onClick={() => handleDownload(content?.resume)}/>
                                    </Box>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
        )
        )
	);
}

// withReducer('kpoCategory', kpoCategoryReducer)(OpeningContentCard);
