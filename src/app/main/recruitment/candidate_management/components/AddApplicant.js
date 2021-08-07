import SideModal from 'app/shared/modal/SideModal';
import React from 'react';
import Input from 'app/shared/TextInput/Input';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';
import GridSystem from 'app/shared/gridSystem';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CandidateContentCard from './CandidateContentCard';
import FileInput from 'app/shared/fileInput/FileInput';
import SharedDropzone from 'app/shared/sharedDropZone';
import SharedDropzonePDF from 'app/shared/dropZonePdf';

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

	const {
		open,
		handleCloseModal,
		register,
		errors,
		onSubmit,
		control,
		loading,
		handleAddList,
		handleEditList,
		contentList,
		contentSelectedItem,
		setContentSelectedItem,
		convertFileToBase64,
	} = customHook;
	// console.log(contentSelectedItem);
	// console.log({customHook})
	return (
		<SideModal title="ADD CANDIDATE" open={open} handleClose={handleCloseModal}>
			<CandidateContentCard
				contentList={contentList}
				update={false}
				handleEditList={handleEditList}
			/>
			<form >
				<GridSystem>
					<Input
						className="my-10"
						name="applicantName"
						id="applicantName"
						label="Applicant Name"
						value={contentSelectedItem?.applicantName}
						onChange={ (ev) => setContentSelectedItem({
						  ...contentSelectedItem,
						  applicantName: ev.target.value
						})}
						error={errors.applicantName}
						message={errors.applicantName?.message}
						refs={register}
						type="text"
					/>
					
					<Input
						className="my-10"
						name="applicantEmail"
						id="applicantEmail"
						label="Applicant Email"
						value={contentSelectedItem?.applicantEmail}
						onChange={ (ev) => setContentSelectedItem({
						  ...contentSelectedItem,
						  applicantEmail: ev.target.value
						})}
						error={errors.applicantEmail}
						message={errors.applicantEmail?.message}
						refs={register}
						type="text"
					/>
					<Input
						className="my-10"
						name="contactNumber"
						id="contactNumber"
						label="Contact Number"
						value={contentSelectedItem?.contactNumber}
						onChange={ (ev) => setContentSelectedItem({
						  ...contentSelectedItem,
						  contactNumber: ev.target.value
						})}
						error={errors.contactNumber}
						message={errors.contactNumber?.message}
						refs={register}
						type="text"
					/>
					<div>
						<Typography>Job Applied Date</Typography>
						<Input
							className="my-10"
							name="dateApplied"
							id="dateApplied"
							value={contentSelectedItem?.dateApplied}
							onChange={ (ev) => setContentSelectedItem({
							...contentSelectedItem,
							dateApplied: ev.target.value
							})}
							error={errors.dateApplied}
							message={errors.dateApplied?.message}
							refs={register}
							type="date"
						/>
					</div>
					<Input
						className="my-10"
						name="homeAddress"
						id="homeAddress"
						label="Home Address"
						value={contentSelectedItem?.homeAddress}
						onChange={ (ev) => setContentSelectedItem({
						  ...contentSelectedItem,
						  homeAddress: ev.target.value
						})}
						error={errors.homeAddress}
						message={errors.homeAddress?.message}
						refs={register}
						type="text"
					/>
					
					<SelectTextField
						label="Application Source"
						className="my-10"
						control={control}
						name="applicationSource"
						id="applicationSource"
						error={errors.applicationSource}
						register={register}
						message={errors.applicationSource?.message}
						value={contentSelectedItem?.applicationSource}
						onChange={ (ev) => setContentSelectedItem({
							...contentSelectedItem,
							applicationSource: ev.target.value
						})}
					>
						{['Permanent', 'Temporary'].map((item, index) => {
							return (
								<MenuItem value={item} key={index}>
									{item}
								</MenuItem>
							);
						})}
					</SelectTextField>

					<SelectTextField
						label="Application Status"
						className="my-10"
						control={control}
						name="applicationStatus"
						id="applicationStatus"
						register={register}
						error={errors.applicationStatus}
						message={errors.applicationStatus?.message}
						value={contentSelectedItem?.applicationStatus}
						onChange={ (ev) => setContentSelectedItem({
							...contentSelectedItem,
							applicationStatus: ev.target.value
						})}
					>
						{['Permanent', 'Temporary'].map((item, index) => {
							return (
								<MenuItem value={item} key={index}>
									{item}
								</MenuItem>
							);
						})}
					</SelectTextField>
					<FileInput
						accept="application/pdf"
						id="input"
						className="my-10"
						onChange={ async(ev) => {
							const pdf = ev.target.files[0];
							let pdfData = await convertFileToBase64(pdf);
							pdfData = pdfData.split(',').pop()
							setContentSelectedItem({
								...contentSelectedItem,
								applicationFile: {
									name: pdf.name,
									size: pdf.size,
									type: pdf.type,
									extension: pdf.name.split('.').pop()
								},
								applicationData: pdfData
							});
						}}
					/>
				</GridSystem>
				{(contentList.length <= 3) && (
					<SharedButton
						variant="contained"
						color="secondary"
						type="button"
						startIcon={<AddIcon />}
						disabled={Object.keys(errors).length !== 0 || contentList.length >= 3 || !contentSelectedItem.applicationSource 
							|| !contentSelectedItem.applicationStatus || !contentSelectedItem.applicationData
						}
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
