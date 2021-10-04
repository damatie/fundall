import React from 'react';
import {Paper} from '@material-ui/core';
import {
	FacebookIcon,
	FacebookShareButton,
	TwitterIcon,
	TwitterShareButton,
	EmailIcon,
	EmailShareButton,
	LinkedinIcon,
	LinkedinShareButton
} from 'react-share';

const SocialMediaButtons = ({ text, url, type, hashTag, subject, title }) => (
	<div>
		{type === 'facebook' ? (
            <FacebookShareButton url={url} quote={text} hashtag={hashTag}>
                <FacebookIcon />
            </FacebookShareButton>
		) : type === 'twitter' ? (
			<TwitterShareButton via={url} title={text} hashtags={hashTag?.split(/[ ,]+/)}>
				<TwitterIcon />
			</TwitterShareButton>
		) : type === 'email' ? (
			<EmailShareButton subject={subject} body={text}>
				<EmailIcon />
			</EmailShareButton>
		) : type === 'linkedin' ? (
			<LinkedinShareButton source={url} summary={text} title={title}>
				<LinkedinIcon />
			</LinkedinShareButton>
		) : (
			<> </>
		)}
	</div>
);

export default SocialMediaButtons;
