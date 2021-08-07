import SideModal from 'app/shared/modal/SideModal';
import React from 'react';
import Input from 'app/shared/TextInput/Input';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';
import Divider from '@material-ui/core/Divider';
import GridSystem from 'app/shared/gridSystem';
import AddIcon from '@material-ui/icons/Add';
import TextAreaEditor from 'app/shared/TextInput/TextAreaEditor';
import Box from '@material-ui/core/Box';
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
	},
	openingDetailLabel: {
		fontWeight: 600,
		fontSize: 14,
		// lineHeight: 15,
		color: '#6F6F6F',

		[theme.breakpoints.down('xs')]: {
			fontSize: 11
		}
	},
	openingDetailContent: {
		fontWeight: 600,
		fontSize: 16,
		// lineHeight: 20,
		textAlign: 'justify',
		color: '#000000',

		[theme.breakpoints.down('xs')]: {
			fontSize: 12
		}
	},
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
		publishOpening,
		control,
		loading,
		employeeInfo,
		handleAddList,
		contentSelectedItem,
		setContentSelectedItem,
		employees,
		description, 
		getDurations,
		setDescription
	} = customHook;

	return (
		<SideModal title="Publish Request" open={open} handleClose={handleCloseModal}>
			<form >
				<Box
					boxShadow={0}
					// bgcolor="#6F6F6F"
					className="mr-10"
					p={0}
					style={{ borderRadius: '10px', marginTop: '20px', marginBottom: '35px', backgroundColor: "#cccccc",  width:'50%', padding: '25px'}}
					key={`icon${contentSelectedItem?.id}`}
				>	
					<GridSystem>
						<div>
							<Typography variant="body2" color="initial" className={`${classes.openingDetailLabel}`}>
								Entity
							</Typography>
							<Typography variant="body2" color="initial" className={` ${classes.openingDetailContent}`}>
								{contentSelectedItem?.entity?.entityName}
							</Typography>
						</div>
						<div>
							<Typography variant="body2" color="initial" className={`${classes.openingDetailLabel}`}>
								Department
							</Typography>
							<Typography variant="body2" color="initial" className={`${classes.openingDetailContent}`}>
								{contentSelectedItem?.department?.departmentName}
							</Typography>
						</div>
					</GridSystem>
				</Box>
				<GridSystem>

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
					
					<SelectTextField
						label="Urgency"
						className="my-10"
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
				</GridSystem>
				{/* <TextAreaEditor
					className="my-10"
					name="jobDescription"
					id="jobDescription"
					value={description}
					onChange={ (ev) => {
						// console.log(convertToRaw(ev.getCurrentContent()));
						const plainText = ev.getCurrentContent().getPlainText() // for plain text
						setDescription(plainText);
						// const rteContent = convertToRaw(ev.getCurrentContent()) // for rte content with text formating
						// setContentSelectedItem({
						// 	...contentSelectedItem,
						// 	jobDescription: plainText
						// });
						// console.log(description);
					}}
					error={errors.jobDescription}
					message={errors.jobDescription?.message}
					refs={register}
				/> */}

				<div className="my-16">
					<Typography variant="subtitle1" color="initial">Job Description</Typography>
					<AdvanceTextEditor setInput={setDescription} value={description} error={error}/>
				</div>

				<RadioComponent
					label="New Employee"
					checked={contentSelectedItem?.openingType === 'New Employee'}
					id="newEmployee"
					value="New Employee"
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
				<GridSystem>
					{/*TODO*/}
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

					<Input
						className="my-10"
						name="hireDate"
						id="hireDate"
						label="Desired Hire date"
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
				</GridSystem>
				{(contentSelectedItem?.openingType === 'National Service' || contentSelectedItem?.openingType === 'Industrial Training') && (
					<Paper variant="outlined" className={classes.root} title="Position type">
						<Typography>Temporary</Typography>
						<GridSystem>
							<Input
								className="my-5"
								name="startDate"
								id="startDate"
								label="Start Date"
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
							<Input
								className="my-5"
								name="endDate"
								id="endDate"
								label="End Date"
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

				<Divider className="my-10" />
				
				<GridSystem>
					<div>
						<Typography></Typography>
						<Input
							className="my-28"
							name="contactEmail"
							id="contactEmail"
							label="Contact Email"
							value={contentSelectedItem?.contactEmail}
							onChange={ (ev) => setContentSelectedItem({
								...contentSelectedItem,
								contactEmail: ev.target.value
							})}
							error={errors.contactEmail}
							message={errors.contactEmail?.message}
							refs={register}
							type="email"
						/>
					</div>
					<div>
						<Typography>Closing Date</Typography>
						<Input
							className="my-6"
							name="closingDate"
							id="closingDate"
							value={contentSelectedItem?.closingDate}
							onChange={ (ev) => setContentSelectedItem({
							...contentSelectedItem,
							closingDate: ev.target.value
							})}
							error={errors.closingDate}
							message={errors.closingDate?.message}
							refs={register}
							type="date"
						/>
					</div>
				</GridSystem>
				{(contentSelectedItem.status === 'UNPUBLISHED') && (
					<SharedButton
						variant="contained"
						color="primary"
						type="button"
						className="flex mx-auto my-16"
						disabled={!contentSelectedItem?.closingDate || !contentSelectedItem?.contactEmail || loading}
						onClick={() => {
							publishOpening();
						}}
					>
						PUBLISH
					</SharedButton>
				)}
			</form>
		</SideModal>
	);
};

export default CreateNewOpening;
