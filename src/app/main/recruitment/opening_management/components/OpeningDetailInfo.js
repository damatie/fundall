import { Avatar, Grid, Typography, Button, Icon, IconButton } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit'
import React, { useEffect } from 'react';
import GridSystem from 'app/shared/gridSystem';
import moment from 'moment';
import SocialMediaButton from 'app/shared/button/SocialMediaButton';
import ReadLess from 'app/shared/TextInput/ReadLess';
import ReadMore from 'app/shared/TextInput/ReadMore';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
	root: {
		//   display: 'flex',
		//   '& > *': {
		// 	margin: theme.spacing(1),
		//   },
	},
	employeeDetailsGrid: {
		marginTop: '5%',
		paddingLeft: '5%',
		marginBottom: '5%',
	},
	employeeDetailsGridItem: {
		width: '50%',

		[theme.breakpoints.down('sm')]: {
			wordBreak: 'break-word'
		}
	},
	openingDetailLabel: {
		fontWeight: 600,
		fontSize: 14,
		// lineHeight: 15,
		color: '#6F6F6F',

		[theme.breakpoints.down('xs')]: {
			fontSize: 11
		}
	},
	openingDetailContent: {
		fontWeight: 600,
		fontSize: 16,
		// lineHeight: 20,
		textAlign: 'justify',
		color: '#000000',

		[theme.breakpoints.down('xs')]: {
			fontSize: 12
		}
	},
	jobDescription: {
		fontWeight: 600,
		fontSize: 16,
		// lineHeight: 20,
		textAlign: 'justify',
		color: '#000000',

		[theme.breakpoints.down('xs')]: {
			fontSize: 12
		}
	}
}));

const OpeningDetailInfo = ({ customHook, candidateHook }) => {
	const { content, oneLoading, isHR, handleExtendClsoingDate } = customHook;
    
	const classes = useStyles();
	const [text, setText] = React.useState('');
	const [twitText, setTwitText] = React.useState('');
	const [fbText, setFbText] = React.useState('');
	const [title, setTitle] = React.useState('');

    useEffect(() => {
        console.log(window.location.origin);
		setText(`We Are Hiring!!!\n\nJob Title: ${content?.jobTitle?.name}, \nJob Description: ${content?.jobDescription?.replace(/<[^>]*>/g, '').substr(0, 200)}.\n\nFor More Info click below link />`)
		setTwitText(`We Are Hiring!!!\n\nJob Title: ${content?.jobTitle?.name}.\n\nFor More Info: ${window.location.origin}/recruitment/apply?hash=${content?.hash}`);
    
	}, [content]);

    const loadMessage = (text, type) => {
		// type === "twitter" ? window.open(`https://twitter.com/intent/tweet/?text=${encodeURIComponent(text)}`, "_blank")
		// 	: type === "facebook" ? window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(text)}`, "_blank")
		// 		: type === "email" ? window.open(`mailto:?subject=${encodeURIComponent("New Recruitment")}&body=${encodeURIComponent(text)}`, "_self")
		// 			: null
	}

	return (
		<>
			{oneLoading ? (
				<Skeleton animation="wave" width="100%" height="350px" variant="rect" />
			) : (
				<>
					<Grid
						container
						direction="row"
						className={` ${classes.employeeDetailsGrid}`}
					>
						<Grid
							container
							item
                            direction="row"
                            align="left"
                            className="flex-row"
							xs={12} sm={12} md={12} lg={12} xl={12}
						>
                            
							<Grid container lg={12} md={12} sm={12} xs={12}>
								<Grid item lg={6} md={6} sm={6} xs={6} spacing={6} align="left" className="">
                                    <div className="my-10">
                                        <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
                                            Job Title
                                        </Typography>
                                        <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailContent}`}>
                                            {content?.jobTitle?.name}
                                        </Typography>
                                    </div>
                                    <GridSystem>
                                        <div>
                                            <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
                                               Entity
                                            </Typography>
                                            <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailContent}`}>
                                                {content?.entity?.entityName}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
                                                Department
                                            </Typography>
                                            <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailContent}`}>
                                                {content?.department?.departmentName}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
                                               Employement Type
                                            </Typography>
                                            <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailContent}`}>
                                                {content?.positionType}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
                                                Desired Hired Date
                                            </Typography>
                                            <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailContent}`}>
                                                {moment(content?.hireDate).format('DD-MM-YYYY')}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
                                               Urgency
                                            </Typography>
                                            <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailContent}`}>
                                                {content?.urgency}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
                                                No. of Candidates
                                            </Typography>
                                            <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailContent}`}>
                                                {content?.candidates?.length > 0 ? content?.candidates?.length : 'N/A'}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
                                               Contact Mail
                                            </Typography>
                                            <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailContent}`}>
                                                {content?.contactEmail ? content?.contactEmail : 'N/A'}
                                            </Typography>
                                        </div>
                                        <GridSystem >
                                            <div>
                                                <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
                                                    Job Close Date
                                                </Typography>
                                                <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailContent}`}>
                                                    {content?.closingDate ? moment(content?.closingDate).format('DD-MM-YYYY') :'N/A'}
                                                </Typography>
                                            </div>

                                            <Tooltip title="Extend Closing Date">
                                                <IconButton
                                                    variant="contained"
                                                    type="button"
                                                    size="small"
                                                    color="secondary"
                                                    style={{fontSize: '12px', maxWidth: '10px'}}
                                                    onClick={ev => handleExtendClsoingDate()}
                                                    // style={{display: 'flex', verticalAlign:'middle', position:'relative', lineHeight: '18px'}}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </GridSystem>
                                    </GridSystem>
                                    <div>
                                        <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
                                            Job Description
                                        </Typography>
                                        <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailContent}`}>
                                            <ReadMore text={content?.jobDescription} size={500}/>
                                        </Typography>
                                    </div>
								</Grid>
								<Grid item lg={6} md={6} sm={6} xs={6} align="left" className="my-10">
                                    {(content?.status === 'PUBLISHED') && (
									<>
                                        <Typography variant="body2" color="initial" className={` my-10 ${classes.openingDetailLabel}`}>
                                            Share:
                                        </Typography>
                                        <Grid column lg={1} md={1} sm={1} xs={1} align="left" className="my-10">
                                            <GridSystem>
                                                <SocialMediaButton 
                                                    url={`${window.location.origin}/recruitment/apply?hash=${content?.hash}`} text={text} type={'facebook'}
                                                />
                                                <SocialMediaButton 
                                                    url={"https://www.springrockgroup.com"} text={text} type={'email'}
                                                />
                                            </GridSystem>
                                        </Grid>
                                        <Grid column lg={1} md={1} sm={1} xs={1} align="left" className="my-10">
                                            <GridSystem>
                                                <SocialMediaButton 
                                                    url={"https://www.springrockgroup.com"} text={twitText} type={'twitter'}
                                                />
                                                <SocialMediaButton 
                                                    url={"https://www.springrockgroup.com"} text={text} type={'linkedin'}
                                                />
                                            </GridSystem>
                                        </Grid>
                                    </>
                                    )}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</>
			)}
		</>
	);
};

export default OpeningDetailInfo;
