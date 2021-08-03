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

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(2)
		},
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	}
}));

const CreateNewOpening = ({ customHook }) => {
	const classes = useStyles();
	const {
		open,
		handleCloseModal,
		register,
		errors,
		handleSubmit,
		onSubmit,
		control,
		handleChangeRadioBtn,
		radioValue,
		positionType,
		handleChangePositionType,
		countries,
		states,
		handleCountryChange,
		employeeInfo,
	} = customHook;
	return (
		<SideModal title="Request Form" open={open} handleClose={handleCloseModal}>
			<form onSubmit={handleSubmit()}>
				<GridSystem>
					<SelectTextField
						label="Entity"
						className="my-10"
						control={control}
						name="entityId"
						id="entityId"
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
					>
						{employeeInfo.departmentList.map((item, index) => {
							return (
								<MenuItem value={item.id} key={index}>
									{item.name}
								</MenuItem>
							);
						})}
					</SelectTextField>

					<SelectTextField
						label="Employee Grade"
						className="my-10"
						control={control}
						name="employeeGrade"
						id="employeeGrade"
						error={errors.employeeGrade}
						message={errors.employeeGrade?.message}
					>
						{employeeInfo.grades.map((item, index) => {
							if(item.status.toUpperCase() === 'ACTIVE') {
								return (
								<MenuItem value={item.id} key={index}>
									{item.name}
								</MenuItem>
								)
							}
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
				<TextAreaEditor
					className="my-10"
					name="jobDescription"
					id="jobDescription"
					// label='Job Description'
					// value={contentSelectedItem?.kpoPipTarget}
					// onChange={ (ev) => setContentSelectedItem({
					//   ...contentSelectedItem,
					//   kpoPipTarget: parseInt(ev.target.value)
					// })}
					error={errors.jobDescription}
					message={errors.jobDescription?.message}
					refs={register}
				/>

				<RadioComponent
					label="New Employee"
					checked={radioValue === 'newEmployee'}
					id="newEmployee"
					value="newEmployee"
					name="newEmployee"
					color="primary"
					onChange={handleChangeRadioBtn}
				/>
				<RadioComponent
					label="Replacement"
					checked={radioValue === 'replacement'}
					id="replacement"
					value="replacement"
					name="replacement"
					color="primary"
					onChange={handleChangeRadioBtn}
				/>
				<RadioComponent
					label="Industrial Training"
					checked={radioValue === 'industrialTraining'}
					id="industrialTraining"
					value="industrialTraining"
					name="industrialTraining"
					color="primary"
					onChange={handleChangeRadioBtn}
				/>
				<RadioComponent
					label="National Service"
					checked={radioValue === 'nationalService'}
					id="nationalService"
					value="nationalService"
					name="nationalService"
					color="primary"
					onChange={handleChangeRadioBtn}
				/>
				<GridSystem>
					{/*TODO*/}
					{radioValue !== 'nationalService' && (
						<>
							<Input
								className="my-10"
								name="employeeToReplace"
								id="employeeToReplace"
								label="Employee to be replaced"
								// value={contentSelectedItem?.kpoPipTarget}
								// onChange={ (ev) => setContentSelectedItem({
								//   ...contentSelectedItem,
								//   kpoPipTarget: parseInt(ev.target.value)
								// })}
								error={errors.employeeToReplace}
								message={errors.employeeToReplace?.message}
								refs={register}
								type="text"
							/>

							<SelectTextField
								label="Position Type"
								className="my-10"
								control={control}
								name="positionType"
								id="positionType"
								error={errors.positionType}
								message={errors.positionType?.message}
							>
								{/* {kpoCategory.map(item => {
								if(item.status.toUpperCase() === 'ACTIVE') {
									return (
									<MenuItem value={item.id}>
										{item.name}
									</MenuItem>
									)
								}
								})} */}
							</SelectTextField>
						</>
					)}

					{radioValue === 'nationalService' && (
						<SelectTextField
							label="Duration"
							className="my-10"
							control={control}
							name="duration"
							id="duration"
							error={errors.duration}
							message={errors.duration?.message}
						>
							{/* {kpoCategory.map(item => {
							if(item.status.toUpperCase() === 'ACTIVE') {
								return (
								<MenuItem value={item.id}>
									{item.name}
								</MenuItem>
								)
							}
							})} */}
						</SelectTextField>
					)}

					<SelectTextField
						label="Urgency"
						className="my-10"
						control={control}
						name="urgency"
						id="urgency"
						error={errors.urgency}
						message={errors.urgency?.message}
					>
						{/* {kpoCategory.map(item => {
							if(item.status.toUpperCase() === 'ACTIVE') {
							return (
								<MenuItem value={item.id}>
								{item.name}
								</MenuItem>
							)
							}
						})} */}
					</SelectTextField>
					<Input
						className="my-10"
						name="hireDate"
						id="hireDate"
						label="Desired Hire date"
						// value={contentSelectedItem?.kpoPipTarget}
						// onChange={ (ev) => setContentSelectedItem({
						//   ...contentSelectedItem,
						//   kpoPipTarget: parseInt(ev.target.value)
						// })}
						error={errors.hireDate}
						message={errors.hireDate?.message}
						refs={register}
						type="date"
					/>
				</GridSystem>
				{radioValue === 'nationalService' && (
					<Paper variant="outlined" className={classes.root} title="Position type">
						<Typography>Temporary</Typography>
						<GridSystem>
							<Input
								className="my-5"
								name="startDate"
								id="startDate"
								label="Start Date"
								// value={contentSelectedItem?.kpoPipTarget}
								// onChange={ (ev) => setContentSelectedItem({
								//   ...contentSelectedItem,
								//   kpoPipTarget: parseInt(ev.target.value)
								// })}
								error={errors.startDate}
								message={errors.startDate?.message}
								refs={register}
								type="date"
							/>
							<Input
								className="my-5"
								name="endDate"
								id="endDate"
								label="End Date"
								// value={contentSelectedItem?.kpoPipTarget}
								// onChange={ (ev) => setContentSelectedItem({
								//   ...contentSelectedItem,
								//   kpoPipTarget: parseInt(ev.target.value)
								// })}
								error={errors.endDate}
								message={errors.endDate?.message}
								refs={register}
								type="date"
							/>
						</GridSystem>
						<RadioComponent
							label="Position may become permanent"
							checked={positionType === 'becomePermanent'}
							id="becomePermanent"
							value="becomePermanent"
							name="becomePermanent"
							color="primary"
							onChange={handleChangePositionType}
						/>
						<RadioComponent
							label="Position may be reappointed"
							checked={positionType === 'beReappionted'}
							id="beReappionted"
							value="beReappionted"
							name="beReappionted"
							color="primary"
							onChange={handleChangePositionType}
						/>
					</Paper>
				)}
				
				<GridSystem>
						<SelectTextField
							label="Country"
							className="my-10"
							control={control}
							name="country"
							id="country"
							error={errors.country}
							message={errors.country?.message}
							onChange={handleCountryChange}
						>
							{countries.map((country, index) => {
								return <MenuItem value={country.id} key={index}>{country.name}</MenuItem>;
							})}
						</SelectTextField>

						<SelectTextField
							label="State"
							className="my-10"
							control={control}
							name="state"
							id="state"
							error={errors.state}
							message={errors.state?.message}
						>
							{states.map((item, index) => {
								return <MenuItem value={item.id} key={index}>{item.name}</MenuItem>;
							})}
						</SelectTextField>
				</GridSystem>

				<SharedButton
					variant="contained"
					color="secondary"
					type="button"
					startIcon={<AddIcon />}
					disabled={Object.keys(errors).length !== 0}
				>
					ADD NEW
				</SharedButton>
				<SharedButton
					variant="contained"
					color="primary"
					type="button"
					className="flex mx-auto"
					onClick={ev => {
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
