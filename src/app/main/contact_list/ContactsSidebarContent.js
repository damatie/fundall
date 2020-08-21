import FuseAnimate from '@fuse/core/FuseAnimate';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React,  { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FuseUtils from '@fuse/utils';
import * as Actions from './store/actions';

const useStyles = makeStyles(theme => ({
	listItem: {
		color: 'inherit!important',
		textDecoration: 'none!important',
		height: 40,
		width: 'calc(100% - 16px)',
		borderRadius: '0 20px 20px 0',
		paddingLeft: 24,
		paddingRight: 12,
		'&.active': {
			backgroundColor: theme.palette.secondary.main,
			color: `${theme.palette.secondary.contrastText}!important`,
			pointerEvents: 'none',
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'& .list-item-icon': {
			marginRight: 16
		}
	}
}));


function ContactsSidebarContent(props) {
	const user = useSelector(({ contactsApp }) => contactsApp.user);
	const contacts = useSelector(({ contactsApp }) => contactsApp.contacts.entity);
	const [filteredData, setFilteredData] = useState([]);

	const classes = useStyles(props);
	const dispatch = useDispatch();

	useEffect(() => {
		if(contacts) {
			const entity = Object.keys(contacts).map(item => contacts[item].entity);
			setFilteredData([...filteredData, ...entity]);
		}
		
	}, [contacts]);

	return (
		<div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">
			<FuseAnimate animation="transition.slideLeftIn" delay={200}>
				<Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow-1">
					<div className="p-24 flex items-center">
						<Avatar alt={user.name} src={user.avatar} />
						<Typography className="mx-12">{user.name}</Typography>
					</div>
					<Divider />
					<List>
						<ListItem
							button
							component={NavLinkAdapter}
							to="/contacts/all"
							activeClassName="active"
							className={classes.listItem}
							onClick={e => {
								dispatch(Actions.getContacts())
							}
							}
						>
							<Icon className="list-item-icon text-16" color="action">
								people
							</Icon>
							<ListItemText className="truncate" primary="All contacts" disableTypography />
						</ListItem>
						{[...new Set(filteredData)].map(item => (
							<ListItem
							button
							id={item}
							component={NavLinkAdapter}
							to={`/contacts/${item}`}
							activeClassName="active"
							className={classes.listItem}
							onClick={e => {
								dispatch(Actions.sortContactList(item, contacts))
							}}
						>
							<Icon className="list-item-icon text-16" color="action">
								restore
							</Icon>
							<ListItemText className="truncate" primary={item} disableTypography />
						</ListItem>
						))}
						
					</List>
				</Paper>
			</FuseAnimate>
		</div>
	);
}

export default ContactsSidebarContent;
