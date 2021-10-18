import SideModal from 'app/shared/modal/SideModal';
import React from 'react';
import Input from 'app/shared/TextInput/Input';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';
import { Controller } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import GridSystem from 'app/shared/gridSystem';
import AddIcon from '@material-ui/icons/Add';
import TextAreaEditor from 'app/shared/TextInput/TextAreaEditor';
import RadioComponent from 'app/shared/TextInput/RadioComponent';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import OpeningContentCard from './OpeningContentCard';
import AutoCompleteInput from 'app/shared/TextInput/AutoComplete';
import AdvanceTextEditor from 'app/shared/TextInput/AdvanceTextEditor';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(2)
		},
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	}
}));

const CreateNewOpening = ({ customHook}) => {
	const classes = useStyles();

	const [error, setError] = React.useState(false);

	const {
		open,
		handleCloseModal,
		register,
		errors,
		handleSubmit,
		onSubmit,
		control,
		loading,
		countries,
		states,
		handleCountryChange,
		employeeInfo,
		handleAddList,
		handleEditList,
		contentList,
		contentSelectedItem,
		setContentSelectedItem,
		employees,
		description, 
		setDescription,
		getDurations
	} = customHook;
	console.log(description);
	return (
		<SideModal title="REQUEST FORM" open={open} handleClose={handleCloseModal}>
			<OpeningContentCard 
				contentList={contentList}
				index={1}
				entity={'CBIT'}
				department={'Engineering'}
				employeeGrade={'J9'}
				jobRole={'Software Dev'}
				update={false}
				handleEditList={handleEditList}
			/>
			<form onSubmit={handleSubmit()}>
				<GridSystem>
					<SelectTextField
						label="Entity"
						className="my-10"
						control={control}
						name="entityId"
						id="entityId"
						value={contentSelectedItem?.entityId}
						onChange={ (ev) => setContentSelectedItem({
						  ...contentSelectedItem,
						  entityId: parseInt(ev.target.value)
						})}
						error={errors.entityId}
						message={errors.entityId?.message}
					>
						{employeeInfo.entities.map((item, index) => {
							return (
							<MenuItem value={item.id} key={index}>
								{item.entityName}
							</MenuItem>
							);
						})}
					</SelectTextField>

					<SelectTextField
						label="Department"
						className="my-10"
						control={control}
						name="departmentId"
						id="departmentId"
						error={errors.departmentId}
						message={errors.departmentId?.message}
						value={contentSelectedItem?.departmentId}
						onChange={ (ev) => setContentSelectedItem({
						  ...contentSelectedItem,
						  departmentId: parseInt(ev.target.value)
						})}
					>
						{employeeInfo.departments.map((item, index) => {
							return (
								<MenuItem value={item.id} key={index}>
									{item.departmentName}
								</MenuItem>
							);
						})}
					</SelectTextField>

					<SelectTextField
						label="Employee Grade"
						className="my-10"
						control={control}
						name="employeeGradeId"
						id="employeeGradeId"
						error={errors.employeeGradeId}
						message={errors.employeeGradeId?.message}
						value={contentSelectedItem?.employeeGradeId}
						onChange={ (ev) => setContentSelectedItem({
						  ...contentSelectedItem,
						  employeeGradeId: ev.target.value
						})}
					>
						{employeeInfo?.grades.map((item, index) => {
							return (
								<MenuItem value={item?.id} key={index}>
									{item?.gradeName}
								</MenuItem>
							)
						})}
					</SelectTextField>

					<SelectTextField
						label="Job Role"
						className="my-10"
						control={control}
						name="jobRoleId"
						id="jobRoleId"
						error={errors.jobRoleId}
						message={errors.jobRoleId?.message}
						value={contentSelectedItem?.jobRoleId}
						onChange={ (ev) => setContentSelectedItem({
						  ...contentSelectedItem,
						  jobRoleId: ev.target.value
						})}
					>
						{employeeInfo.jobTitles.map((item, index) => {
							return (
								<MenuItem value={item.id} key={index}>
								{item.name}
								</MenuItem>
							);
						})}
					</SelectTextField>
				</GridSystem>
				<div className="my-16">
					<Typography variant="subtitle1" color="initial">Job Description</Typography>
					<AdvanceTextEditor setInput={setDescription} value={description} error={error}/>
				</div>
				<div>
					<RadioComponent
						label="New Employee"
						checked={contentSelectedItem?.openingType === 'New Employee'}
						id="newEmployee"
						value="New Employee"
						defaultValue="New Employee"
						name="newEmployee"
						color="primary"
						onChange={(ev) => {
							setContentSelectedItem({
								...contentSelectedItem,
								openingType: ev.target.value
							})
							}
						}
					/>
					<RadioComponent
						label="Replacement"
						checked={contentSelectedItem?.openingType === 'Replacement'}
						id="replacement"
						value="Replacement"
						name="replacement"
						color="primary"
						onChange={(ev) => {
							setContentSelectedItem({
								...contentSelectedItem,
								openingType: ev.target.value
							})
							}
						}
					/>
					<RadioComponent
						label="Industrial Training"
						checked={contentSelectedItem?.openingType === 'Industrial Training'}
						id="industrialTraining"
						value="Industrial Training"
						name="industrialTraining"
						color="primary"
						onChange={(ev) => {
							setContentSelectedItem({
								...contentSelectedItem,
								openingType: ev.target.value
							})
							}
						}
					/>
					<RadioComponent
						label="National Service"
						checked={contentSelectedItem?.openingType === 'National Service'}
						id="nationalService"
						value="National Service"
						name="nationalService"
						color="primary"
						onChange={(ev) => {
							setContentSelectedItem({
								...contentSelectedItem,
								openingType: ev.target.value
							})
							}
						}
					/>
				</div>
				{contentSelectedItem?.openingType &&(
					<>
						<GridSystem>
							{!(contentSelectedItem?.openingType === 'National Service' || contentSelectedItem?.openingType === 'Industrial Training') && (
								<>
								{contentSelectedItem?.openingType === 'Replacement' && (
									<AutoCompleteInput
										// className='my-10'
										name='employeeToReplace'
										label='Employee to be replaced'
										// control={control}
										data={employees || []}
										value={contentSelectedItem?.employeeToReplace}
										defaultValue={contentSelectedItem?.employeeToReplace}
										error={errors.employeeToReplace || !employees.length}
										helperText={errors.employeeToReplace?.message || !employees.length ? 'No Employees found' : ''}
										onChange={(ev, value) => {
											register({ name: 'employeeToReplace', value: value?.id });
											setContentSelectedItem({
												...contentSelectedItem,
												employeeToReplace: value?.id
											})
										}}
									/>
								)}

									<SelectTextField
										label="Position Type"
										className="my-10"
										control={control}
										name="positionType"
										id="positionType"
										error={errors.positionType}
										message={errors.positionType?.message}
										value={contentSelectedItem?.positionType}
										onChange={ (ev) => setContentSelectedItem({
										...contentSelectedItem,
										positionType: ev.target.value
										})}
									>
										{['Permanent (On Site)', 'Permanent (Remote)', 'Temporary (On Site)', 'Temporary (Remote)'].map((item, index) => {
											return (
												<MenuItem value={item} key={index}>
													{item}
												</MenuItem>
											);
										})}
									</SelectTextField>
								</>
							)}

							{(contentSelectedItem?.openingType === 'National Service' || contentSelectedItem?.openingType === 'Industrial Training') && (
								<SelectTextField
									label="Duration"
									className="my-10"
									control={control}
									name="duration"
									id="duration"
									error={errors.duration}
									message={errors.duration?.message}
									value={contentSelectedItem?.duration}
									onChange={ (ev) => setContentSelectedItem({
									...contentSelectedItem,
									duration: ev.target.value
									})}
								>
									{getDurations().map((item, index) => {
										return (
											<MenuItem value={item} key={index}>
												{item}
											</MenuItem>
										);
									})}
								</SelectTextField>
							)}

							<SelectTextField
								label="Urgency"
								className="mt-10 my-10"
								control={control}
								name="urgency"
								id="urgency"
								error={errors.urgency}
								message={errors.urgency?.message}
								value={contentSelectedItem?.urgency}
								onChange={ (ev) => setContentSelectedItem({
								...contentSelectedItem,
								urgency: ev.target.value
								})}
							>
								{['High','Medium', 'Low'].map((item, index) => {
									return (
										<MenuItem value={item} key={index}>
											{item}
										</MenuItem>
									);
								})}
							</SelectTextField>
							<div>
								<Typography>Desired Hire date</Typography>
								<Input
									className="my-10"
									name="hireDate"
									id="hireDate"
									value={contentSelectedItem?.hireDate}
									onChange={ (ev) => setContentSelectedItem({
									...contentSelectedItem,
									hireDate: ev.target.value
									})}
									error={errors.hireDate}
									message={errors.hireDate?.message}
									refs={register}
									type="date"
								/>
							</div>
						</GridSystem>
						{(contentSelectedItem?.openingType === 'National Service' || contentSelectedItem?.openingType === 'Industrial Training') && (
							<Paper variant="outlined" className={classes.root} title="Position type">
								<Typography>Temporary</Typography>
								<GridSystem>
									<div>
										<Typography>Start Date</Typography>
										<Input
											className="my-5"
											name="startDate"
											id="startDate"
											value={contentSelectedItem?.startDate}
											onChange={ (ev) => setContentSelectedItem({
											...contentSelectedItem,
											startDate: ev.target.value
											})}
											error={errors.startDate}
											message={errors.startDate?.message}
											refs={register}
											type="date"
										/>
									</div>

									<div>
										<Typography>End Date</Typography>
										<Input
											className="my-5"
											name="endDate"
											id="endDate"
											value={contentSelectedItem?.endDate}
											onChange={ (ev) => setContentSelectedItem({
											...contentSelectedItem,
											endDate: ev.target.value
											})}
											error={errors.endDate}
											message={errors.endDate?.message}
											refs={register}
											type="date"
										/>
									</div>
								</GridSystem>
								<RadioComponent
									label="Position may become permanent"
									checked={contentSelectedItem?.positionType === 'Temporary (Position may become permanent)'}
									id="becomePermanent"
									value="Temporary (Position may become permanent)"
									name="becomePermanent"
									color="primary"
									onChange={(ev) => {
										setContentSelectedItem({
											...contentSelectedItem,
											positionType: ev.target.value
										})
										}
									}
								/>
								<RadioComponent
									label="Position may be reappointed"
									checked={contentSelectedItem?.positionType === 'Temporary (Position may be reappointed)'}
									id="beReappionted"
									value="Temporary (Position may be reappointed)"
									name="beReappionted"
									color="primary"
									onChange={(ev) => {
										setContentSelectedItem({
											...contentSelectedItem,
											positionType: ev.target.value
										})
										}
									}
								/>
							</Paper>
						)}
					
						<GridSystem className="my-12">
					<SelectTextField
						label="Country"
						className="my-10"
						control={control}
						name="countryId"
						id="countryId"
						error={errors.countryId}
						message={errors.countryId?.message}
						value={contentSelectedItem?.countryId}
						onChange={(ev) => {
								handleCountryChange(ev);
								setContentSelectedItem({
									...contentSelectedItem,
									countryId: ev.target.value
									})
							}
						}
					>
						{countries.map((country, index) => {
							return <MenuItem value={country.id} key={index}>{country.name}</MenuItem>;
						})}
					</SelectTextField>
					{contentSelectedItem.countryId && (
						<SelectTextField
							label="State"
							className="my-10"
							control={control}
							name="stateId"
							id="stateId"
							error={errors.stateId}
							message={errors.stateId?.message}
							value={contentSelectedItem?.stateId}
							onChange={ (ev) => setContentSelectedItem({
							  ...contentSelectedItem,
							  stateId: ev.target.value
							})}
						>
							{states.map((item, index) => {
								return <MenuItem value={item.id} key={index}>{item.name}</MenuItem>;
							})}
						</SelectTextField>
					)}
				</GridSystem>
					</>
				)}

				{(contentList.length <= 3) && (
					<SharedButton
						variant="contained"
						color="secondary"
						type="button"
						startIcon={<AddIcon />}
						disabled={Object.keys(errors).length !==0 || contentList.length >= 3 || !contentSelectedItem.entityId || ! contentSelectedItem.departmentId|| ! contentSelectedItem.jobRoleId|| ! contentSelectedItem.employeeGradeId|| ! contentSelectedItem.countryId|| ! contentSelectedItem.stateId}
						onClick={(ev) => {handleAddList(contentSelectedItem)}}
					>
						ADD NEW
					</SharedButton>
				)}
				<SharedButton
					variant="contained"
					color="primary"
					type="button"
					className="flex mx-auto"
					disabled={!contentList.length || loading}
					onClick={() => {
						onSubmit();
					}}
				>
					SUBMIT
				</SharedButton>
			</form>
		</SideModal>
	);
};

export default CreateNewOpening;
