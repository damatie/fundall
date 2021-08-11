import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import PromotionalKpoContentList from './components/PromotionalKpoContentList';
import CreateKpoContent from './components/CreateKpoContent';
import reducer from './store/reducers';
import withReducer from 'app/store/withReducer';
import kpoCategoryReducer from '../KPOcategoryList/store/reducers/categoryList.reducer';
import Button from '@material-ui/core/Button';
import SideModal from 'app/shared/modal/SideModal';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import { MenuItem } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	toolBarDiv: {
		width: '55%',
		margin: 'auto',
		marginTop: '5%',

		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			alignItems: 'center',
			height: '100%'
		}
	},
	filterSelectDiv: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',

		[theme.breakpoints.down('sm')]: {
			width: '70%'
		},

		[theme.breakpoints.down('xs')]: {
			width: '100%'
		}
	},
	singleFilterSelect: {
		width: '22% !important'
	},
	promotionalContentDiv: {
		marginTop: '7.5%'
	}
}));

const PromotionalEmployeeKpoDetails = () => {
	const classes = useStyles();

	// React.useEffect(() => console.log(tabValue), [tabValue]);
	const confirmUpdate = () => {
		Swal.fire({
			icon: 'info',
			title: 'Do you want to start \n KPO Review ?',
			html:
				'<p class="kpo-custom-swal-text">Note that by clicking on continue, you will activeate your KPO \n quarterly review.</p>',
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: `CONTINUE`,
			confirmButtonColor: '#19AC4B',
			cancelButtonColor: '#FA1C1C',
			customClass: {
				cancelButton: 'kpo-custom-swal-btn',
				confirmButton: 'kpo-custom-swal-btn',
				title: 'kpo-custom-swal-title',
				popup: 'kpo-custom-swal-popup',
				icon: 'kpo-custom-swal-icon'
			}
		}).then(result => {
			if (result.isConfirmed) {
				setToggleUpdateKpoModal(true);
			}
		});
	};

	const promotionalKpoList = [
		{
			id: 1,
			employeeName: 'Hinata Hyuuga',
			employeeEmail: 'hinata@mail.com',
			entity: 'CBIT',
			department: 'Design',
			jobTitle: 'UI/UX Designer',
			contactNumber: '+234 802 374 7829',
			role: 'Employee',
			address: '12C Anderson Road, Thomas Estate, Lagos',
			gender: 'Female',
			gradeLevel: 'GL234',
			staffId: 'SRG1093',
			image: `${process.env.PUBLIC_URL}/assets/images/avatars/alice.jpg`
		},
		{
			id: 2,
			employeeName: 'Nezuko Kamado',
			employeeEmail: 'nezuko@mail.com',
			entity: 'CBIT',
			department: 'Tech',
			jobTitle: 'Front End Developer',
			contactNumber: '+234 802 374 7829',
			role: 'Employee',
			address: '12C Anderson Road, Thomas Estate, Lagos',
			gender: 'Female',
			gradeLevel: 'GL234',
			staffId: 'SRG1093',
			image: `${process.env.PUBLIC_URL}/assets/images/avatars/Barrera.jpg`
		},
		{
			id: 3,
			employeeName: 'Sakura Haruno',
			employeeEmail: 'sakura@mail.com',
			entity: 'CBIT',
			department: 'Tech',
			jobTitle: 'Back End Developer',
			contactNumber: '+234 802 374 7829',
			role: 'Employee',
			address: '12C Anderson Road, Thomas Estate, Lagos',
			gender: 'Female',
			gradeLevel: 'GL234',
			staffId: 'SRG1093',
			image: `${process.env.PUBLIC_URL}/assets/images/avatars/Nancy.jpg`
		},
		{
			id: 4,
			employeeName: 'Nora Jasmine',
			employeeEmail: 'nora@mail.com',
			entity: 'CBIT',
			department: 'Design',
			jobTitle: 'UI/UX Designer',
			contactNumber: '+234 802 374 7829',
			role: 'Employee',
			address: '12C Anderson Road, Thomas Estate, Lagos',
			gender: 'Female',
			gradeLevel: 'GL234',
			staffId: 'SRG1093',
			image: `${process.env.PUBLIC_URL}/assets/images/avatars/Nora.jpg`
		},
		{
			id: 5,
			employeeName: 'Katina Catalina',
			employeeEmail: 'katina@mail.com',
			entity: 'CBIT',
			department: 'Tech',
			jobTitle: 'Front End Developer',
			contactNumber: '+234 802 374 7829',
			role: 'Employee',
			address: '12C Anderson Road, Thomas Estate, Lagos',
			gender: 'Female',
			gradeLevel: 'GL234',
			staffId: 'SRG1093',
			image: `${process.env.PUBLIC_URL}/assets/images/avatars/Katina.jpg`
		},
		{
			id: 6,
			employeeName: 'Joyce Beckham',
			employeeEmail: 'joyce@mail.com',
			entity: 'CBIT',
			department: 'Tech',
			jobTitle: 'Back End Developer',
			contactNumber: '+234 802 374 7829',
			role: 'Employee',
			address: '12C Anderson Road, Thomas Estate, Lagos',
			gender: 'Female',
			gradeLevel: 'GL234',
			staffId: 'SRG1093',
			image: `${process.env.PUBLIC_URL}/assets/images/avatars/joyce.jpg`
		},
		{
			id: 7,
			employeeName: 'Helen Clement',
			employeeEmail: 'helen@mail.com',
			entity: 'SPRINGROCK',
			department: 'Human Resource',
			jobTitle: 'HR Supervisor',
			contactNumber: '+234 802 374 7829',
			role: 'Employee',
			address: '12C Anderson Road, Thomas Estate, Lagos',
			gender: 'Female',
			gradeLevel: 'GL234',
			staffId: 'SRG1093',
			image: `${process.env.PUBLIC_URL}/assets/images/avatars/Helen.jpg`
		},
		{
			id: 8,
			employeeName: 'Estes Nombre',
			employeeEmail: 'estes@mail.com',
			entity: 'CBIT',
			department: 'Tech',
			jobTitle: 'Back End Developer',
			contactNumber: '+234 802 374 7829',
			role: 'Employee',
			address: '12C Anderson Road, Thomas Estate, Lagos',
			gender: 'Female',
			gradeLevel: 'GL234',
			staffId: 'SRG1093',
			image: `${process.env.PUBLIC_URL}/assets/images/avatars/Estes.jpg`
		},
		{
			id: 9,
			employeeName: 'Vincent Drew',
			employeeEmail: 'vincent@mail.com',
			entity: 'SPRINGROCK',
			department: 'Finance',
			jobTitle: 'Accounting Manager',
			contactNumber: '+234 802 374 7829',
			role: 'Employee',
			address: '12C Anderson Road, Thomas Estate, Lagos',
			gender: 'Male',
			gradeLevel: 'GL234',
			staffId: 'SRG1093',
			image: `${process.env.PUBLIC_URL}/assets/images/avatars/vincent.jpg`
		},
		{
			id: 10,
			employeeName: 'Velazquez Arturito',
			employeeEmail: 'velazquez@mail.com',
			entity: 'CBIT',
			department: 'Tech',
			jobTitle: 'Front End Developer',
			contactNumber: '+234 802 374 7829',
			role: 'Employee',
			address: '12C Anderson Road, Thomas Estate, Lagos',
			gender: 'Male',
			gradeLevel: 'GL234',
			staffId: 'SRG1093',
			image: `${process.env.PUBLIC_URL}/assets/images/avatars/Velazquez.jpg`
		} /* ,
		{
			id: 11,
			employeeName: 'Abbott John',
			employeeEmail: 'abbott@mail.com',
			entity: 'CBIT',
			department: 'Tech',
			jobTitle: 'Back End Developer',
			contactNumber: '+234 802 374 7829',
			role: 'Employee',
			address: '12C Anderson Road, Thomas Estate, Lagos',
			gender: 'Male',
			gradeLevel: 'GL234',
			staffId: 'SRG1093',
			image: `${process.env.PUBLIC_URL}/assets/images/avatars/Abbott.jpg`
		} */
	];

	const filterStateData = {
		entities: ['CBIT', 'FIVEC', 'SPRINGROCK'],
		departments: ['Design', 'Tech'],
		jobTitles: ['Front End Developer', 'Back End Developer', 'UI/UX Designer'],
		order: ['Ascending', 'Descending']
	};

	localStorage.setItem('tempPromotionalKpoList', JSON.stringify(promotionalKpoList));
	const [selectFilterState, setSelectFilterState] = React.useState({
		entityFilter: '',
		departmentFilter: '',
		orderFilter: '',
		jobTitleFilter: ''
	});

	const handleSelectFilterChange = e => {
		const { name, value } = e.target;

		setSelectFilterState({
			...selectFilterState,
			[name]: value
		});
	};

	React.useEffect(() => console.log(selectFilterState, 'selectFilterState'), [selectFilterState]);

	return (
		<PageLayout
			noSearch={true}
			customToolBarSearchDivClass={true}
			header={{
				icon: '',
				title: 'EMPLOYEE LIST',
				handleSearch: ({ target: { value } }) => console.log(value)
			}}
			button={{
				showButton: true,
				btnComponent: (
					<Button
						variant="contained"
						color="secondary"
						/* onClick={customHook.handleOpenModal} */ startIcon={<AddIcon />}
					>
						Add Employee
					</Button>
				)
			}}
			contentToolbar={
				<div className={classes.toolBarDiv}>
					<div className={classes.filterSelectDiv}>
						<div className={classes.singleFilterSelect}>
							<SelectTextField
								name="entityFilter"
								label="Entity"
								onChange={handleSelectFilterChange}
								value={selectFilterState.entityFilter}
								// error={errors.jobTitleId}
								// message={errors.jobTitleId?.message}
							>
								{filterStateData.entities?.length > 0 &&
									['', ...filterStateData.entities].map((entity, index) => (
										<MenuItem value={entity} key={index}>
											{entity === '' ? 'Default Selection' : entity}
										</MenuItem>
									))}
							</SelectTextField>
						</div>
						<div className={classes.singleFilterSelect}>
							<SelectTextField
								name="departmentFilter"
								label="Department"
								value={selectFilterState.departmentFilter}
								onChange={handleSelectFilterChange}
								// error={errors.jobTitleId}
								// message={errors.jobTitleId?.message}
							>
								{filterStateData.departments?.length > 0 &&
									['', ...filterStateData.departments].map((department, index) => (
										<MenuItem value={department} key={index}>
											{department === '' ? 'Default Selection' : department}
										</MenuItem>
									))}
							</SelectTextField>
						</div>
						<div className={classes.singleFilterSelect}>
							<SelectTextField
								name="orderFilter"
								label="Order"
								value={selectFilterState.orderFilter}
								onChange={handleSelectFilterChange}
								// error={errors.jobTitleId}
								// message={errors.jobTitleId?.message}
							>
								{filterStateData.order?.length > 0 &&
									['', ...filterStateData.order].map((order, index) => (
										<MenuItem value={order} key={index}>
											{order === '' ? 'Default Selection' : order}
										</MenuItem>
									))}
							</SelectTextField>
						</div>
						<div className={classes.singleFilterSelect}>
							<SelectTextField
								name="jobTitleFilter"
								label="Job Title"
								value={selectFilterState.jobTitleFilter}
								onChange={handleSelectFilterChange}
								// error={errors.jobTitleId}
								// message={errors.jobTitleId?.message}
							>
								{filterStateData.jobTitles?.length > 0 &&
									['', ...filterStateData.jobTitles].map((jobTitle, index) => (
										<MenuItem value={jobTitle} key={index}>
											{jobTitle === '' ? 'Default Selection' : jobTitle}
										</MenuItem>
									))}
							</SelectTextField>
						</div>
					</div>
				</div>
			}
			content={
				<div className={`sm:p-24 ${classes.promotionalContentDiv}`}>
					<>
						<PromotionalKpoContentList filterState={selectFilterState} />
						{/* <CreateKpoContent /> */}
					</>
					{/* <SideModal
						open={toggleUpdateKpoModal}
						handleClose={() => setToggleUpdateKpoModal(false)}
						title="KPO Quarterly Review"
					>
						<>
							{kpoDetail.map((detail, index) => (
								<KpoContentCard
									index={index}
									theKpoCategory={detail?.kpoCategory?.name}
									description={detail?.kpoCategory?.description}
									target={detail?.target}
									pipTarget={detail?.kpoPipTarget}
									entireData={detail}
									update={true}
								/>
							))}
						</>
					</SideModal> */}
				</div>
			}
		/>
	);
};

withReducer('kpoCategory', kpoCategoryReducer)(PromotionalEmployeeKpoDetails);
export default withReducer('kpo', reducer)(PromotionalEmployeeKpoDetails);
