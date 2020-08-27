import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';
import ContactsTable from './ContactsTable';
import * as Actions from './store/actions';

function ContactsList(props) {
	const dispatch = useDispatch();
	const contacts = useSelector(({ contactsApp }) => contactsApp.contacts.entities);
	const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
	const user = useSelector(({ contactsApp }) => contactsApp.user);

	const [filteredData, setFilteredData] = useState(null);

	const columns = React.useMemo(
		() => [
			{
				Header: ({ selectedFlatRows }) => {
					const selectedRowIds = selectedFlatRows.map(row => row.original.id);

					return (
						selectedFlatRows.length > 0 && <ContactsMultiSelectMenu selectedContactIds={selectedRowIds} />
					);
				},
				accessor: 'profilePicture',
				Cell: ({ row }) => {
					return <Avatar className="mx-8" alt={row.original.firstName} src={row.original.profilePicture} />;
				},
				className: 'justify-center',
				width: 64,
				sortable: false
			},
			{
				Header: 'First name',
				accessor: 'firstName',
				// className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Last name',
				accessor: 'lastName',
				// className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Email',
				accessor: 'email',
				sortable: true
			},
			// {
			// 	Header: 'Entity',
			// 	accessor: 'entity',
			// 	// className: 'font-bold',
			// 	sortable: true
			// },
			{
				Header: 'Department',
				accessor: 'department',
				sortable: true
			},
			{
				Header: 'Phone Number',
				accessor: 'phoneNumber',
				sortable: true
			}
		],
		[dispatch, user.starred]
	);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}

		if (contacts) {
			setFilteredData(getFilteredArray(contacts, searchText));
		}
	}, [contacts, searchText]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					There are no contacts!
				</Typography>
			</div>
		);
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<ContactsTable
				columns={columns}
				data={filteredData}
				onRowClick={(ev, row) => {
					if (row) {
						dispatch(Actions.openEditContactDialog(row.original));
					}
				}}
			/>
		</FuseAnimate>
	);
}

export default ContactsList;
