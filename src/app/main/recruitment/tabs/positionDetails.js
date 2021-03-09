import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { Button, Icon, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import { Email, Instagram, LinkedIn } from '@material-ui/icons';
import Facebook from 'react-sharingbuttons/dist/buttons/Facebook';
import Email from 'react-sharingbuttons/dist/buttons/Email';
import Twitter from 'react-sharingbuttons/dist/buttons/Twitter';
import * as Actions from "../store/actions"
// import { Email } from '@material-ui/icons';
// import Facebook from 'react-sharingbuttons/dist/icons/Facebook';
// import Facebook from 'react-sharingbuttons/dist/icons/Facebook';

function Details(props) {

	const dispatch = useDispatch();

	const { jobTitle, status, requiredSkills, createdAt, createdBy, jobDescription, id, mailTo } = props.position;
	const role = useSelector(({ profile }) => profile.data.role);
	const [text, setText] = useState('');
	const [twitText, settWitText] = useState('');

	const hrAccept = () => {
		Actions.hrCreateOpening(id, dispatch);
	}

	const loadMessage = (text, type) => {
		type === "twitter" ?
			window.open(`https://twitter.com/intent/tweet/?text=${encodeURIComponent(text)}`, "_blank")
			:
			type === "facebook" ?
				window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(text)}`, "_blank")
				:
				type === "email" ?
					window.open(`mailto:?subject=${encodeURIComponent("New Recruitment")}&body=${encodeURIComponent(text)}`, "_blank")
					: null
	}

	useEffect(() => {
		setText(`We Are Hiring!!!\n\nJob Title: ${jobTitle}, \nJob Description: ${jobDescription}, \nRequired skills: ${requiredSkills}.\n\nForward CV to: ${"Append mail"}`)
		settWitText(`We Are Hiring!!!\n\nJob Title: ${jobTitle}, \nRequired skills: ${requiredSkills}.\n\nForward CV to: ${mailTo}`)
	}, [props.position])

	return (
		<div className="md:flex w-full">
			<div className="flex sm:flex-col w-full">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<div className="flex w-full">
						<Card className="w-1/2 mb-16 sm:w-full">
							<AppBar position="static" elevation={0}>
								<Toolbar className="px-8">
									<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
										General Information
									</Typography>
								</Toolbar>
							</AppBar>

							<CardContent>
								<div className="mb-24">
									<Typography className="font-bold mb-4 text-15">Entity name</Typography>
									<Typography>{props.position.entity && props.position.entity.entityName}</Typography>
								</div>

								<div className="mb-24">
									<Typography className="font-bold mb-4 text-15">Department name</Typography>
									<Typography>{props.position.department && props.position.department.departmentName}</Typography>
								</div>

								<div className="mb-24">
									<Typography className="font-bold mb-4 text-15">Job title</Typography>
									<Typography>{jobTitle}</Typography>
								</div>

								<div className="mb-24">
									<Typography className="font-bold mb-4 text-15">Job Description</Typography>
									{jobDescription
										? (
											<Typography >
												{jobDescription}
											</Typography>
										)
										: 'No job description'
									}
								</div>

								<div className="mb-24">
									<Typography className="font-bold mb-4 text-15">Created at</Typography>
									<Typography><Moment format="Do, MMM YYYY">{createdAt}</Moment></Typography>
								</div>
								<div className="mb-24">
									<Typography className="font-bold mb-4 text-15">Created by</Typography>
									<Typography>{createdBy}</Typography>
								</div>

							</CardContent>
						</Card>

						<div className='w-1/2 sm:w-full ml-16'>
							<Card className="w-full mb-16">
								<AppBar position="static" elevation={0}>
									<Toolbar className="px-8">
										<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
											Work
										</Typography>
									</Toolbar>
								</AppBar>

								<CardContent>
									<div className="mb-24">
										<Typography className="font-bold mb-4 text-15">Required Skills</Typography>
										<Typography>{requiredSkills}</Typography>
									</div>

								</CardContent>
							</Card>

							{
								role?.name.toUpperCase() === "HR MANAGER" ?
									<>
										<Card className="w-full mb-16">
											<AppBar position="static" elevation={0}>
												<Toolbar className="px-8">
													<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
														Contact
													</Typography>
												</Toolbar>
											</AppBar>

											<CardContent>
												<div className="mb-16">
													<Typography className="font-bold mb-4 text-15">{mailTo}</Typography>
												</div>
											</CardContent>
										</Card>

										<Card className="w-full mb-16">
											<AppBar position="static" elevation={0}>
												<Toolbar className="px-8">
													<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
														Share
												</Typography>
												</Toolbar>
											</AppBar>

											<CardContent>
												<div className="mb-16 d-flex">
													{
														status !== "added" ?
															<>
																<IconButton aria-label="share on facebook" className="mr-12" color={"primary"}>
																	{/* <Facebook /> */}
																	<Facebook onClick={() => loadMessage(text, "facebook")} />
																</IconButton>

																<IconButton aria-label="share via email" className="mr-12" color={"primary"}>
																	<Email onClick={() => loadMessage(text, "email")} />
																</IconButton>

																<IconButton aria-label="share on instagram" className="mr-12" color={"primary"}>
																	<Twitter onClick={() => loadMessage(twitText, "twitter")} />
																</IconButton>
															</>
															:
															<>
																<Typography >Please accept request to share</Typography>
																<Button
																	className="mt-20"
																	component={Link}
																	onClick={hrAccept}
																	role='button'
																	variant="contained"
																	color="primary"
																>
																	Accept Recruitment Request
																</Button>
															</>
													}

												</div>
											</CardContent>
										</Card>
									</>
									:
									<></>
							}
						</div>
					</div>
				</FuseAnimateGroup>
			</div>

		</div >
	);
}

export default Details;
