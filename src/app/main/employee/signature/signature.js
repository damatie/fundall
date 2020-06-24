// import DemoContent from '@fuse/core/DemoContent';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import SignatureTab from './tabs/signatureTab';

const useStyles = makeStyles({
	layoutRoot: {}
});

function Signature() {
	const classes = useStyles();

	return (
		<FusePageCarded
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="py-24">
					<h4>Employee upload signature</h4>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<h4>E SIGNATURE</h4>
				</div>
			}
			content={
				<div className="p-24">
					<br />
					<SignatureTab />
				</div>
			}
		/>
	);
}

export default Signature;
