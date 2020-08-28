import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import withReducer from 'app/store/withReducer';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddDisciplinaryCaseModal from './addDisciplinaryCaseModal';
import DisciplinaryTable from './DisciplinaryTable';
import * as Actions from './store/actions';
import reducer from './store/reducers';

function DisciplinaryCase() {
	const dispatch = useDispatch();
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const rows = useSelector(({ disciplinaryCase }) => disciplinaryCase.disciplinaryCase.data);
	const pageLayout = useRef(null);

	useEffect(() => {
		dispatch(Actions.getDisciplinaryCase());
	}, [dispatch]);

	const columns = [
		{
			id: 's/n',
			align: 'left',
			disablePadding: false,
			label: 'Case No',
			sort: true
		},
		{
			id: 'accuser',
			align: 'left',
			disablePadding: false,
			label: 'Accuser',
			sort: true
		},
		{
			id: 'accused',
			align: 'left',
			disablePadding: false,
			label: 'Accused',
			sort: true
		},
		{
			id: 'description',
			align: 'left',
			disablePadding: false,
			label: 'Description',
			sort: true
		},
		{
			id: 'createdAt',
			align: 'left',
			disablePadding: false,
			label: 'Created Time',
			sort: true
		},
		{
			id: 'updatedAt',
			align: 'left',
			disablePadding: false,
			label: 'Updated Time',
			sort: true
		},
		{
			id: 'status',
			align: 'left',
			disablePadding: false,
			label: 'Status',
			sort: true
		}
	];
	return (
		<FusePageSimple
			classes={{
				root: 'bg-red',
				header: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
				sidebarHeader: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
				rightSidebar: 'w-320'
			}}
			header={
				<ThemeProvider theme={mainTheme}>
					<div className="flex flex-col flex-1 p-8 sm:p-12 relative">
						<div className="flex items-center w-full">
							<FuseAnimate animation="transition.expandIn" delay={300}>
								<Icon className="text-32">announcement</Icon>
							</FuseAnimate>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<span className="text-24 mx-16">Disciplinary Case Management</span>
							</FuseAnimate>
						</div>
						<div className="flex flex-1 items-end">
							<FuseAnimate animation="transition.expandIn" delay={600}>
								<AddDisciplinaryCaseModal />
							</FuseAnimate>
						</div>
					</div>
				</ThemeProvider>
			}
			content={<DisciplinaryTable title={'Disciplinary Cases'} type="default" columns={columns} rows={rows} />}
			ref={pageLayout}
			innerScroll
		/>
	);
}

export default withReducer('disciplinaryCase', reducer)(DisciplinaryCase);
