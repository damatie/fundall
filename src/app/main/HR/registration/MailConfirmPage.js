import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuthentication } from 'app/hooks/useAuthentication';
import swal from 'sweetalert2';

const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	}
}));

function MailConfirmPage({ match }) {
	const classes = useStyles();
	const [redirect, setRedirect] = React.useState(false);

	React.useEffect(() => {
		confirmMail();
	})

	const auth = useAuthentication;

	const confirmMail = () => {
		auth('hr_confirmation', { token: match.params.id }).then(data => {
			// // console.log(data);
			if (data.success && data.message !== "Email Already Verified") {
				swal.fire({
					title: 'Email confirmation',
					text: data.message,
					icon: 'success',
					timer: 2000
				})
				setRedirect(true);
			} else {
				swal.fire({
					title: 'Email confirmation',
					text: data.message,
					icon: 'error',
					timer: 2000
				})
				setRedirect(true);
			}
		}).catch(e => {
			// console.lerror(e);
			swal.fire({
				title: 'Email confirmation',
				text: 'Service unavvailable',
				icon: 'error',
				timer: 2000
			})
			setRedirect(true);
		})
	};

	if (redirect) {
		return <Redirect to='/hr/login' />
	}
	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
			<div className="flex flex-col items-center justify-center w-full">
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full max-w-384">
						<CardContent className="flex flex-col items-center justify-center p-32">
							<div className="m-32">
								<Icon className="text-96" color="action">
									email
								</Icon>
							</div>

							<Typography variant="h5" className="text-center mb-16">
								Confirming your email address!
							</Typography>
							<CircularProgress color="secondary" />
						</CardContent>
					</Card>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default MailConfirmPage;
