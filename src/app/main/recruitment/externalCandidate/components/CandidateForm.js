import React from 'react';
import Input from 'app/shared/TextInput/Input';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';
import GridSystem from 'app/shared/gridSystem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FileInput from 'app/shared/fileInput/FileInput';
import Grid from '@material-ui/core/Grid';
import PhoneNumberInput from 'app/shared/TextInput/PhoneNumberInput';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(2)
		},
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
        background: '#fff',
	},
    input: {
        // backgroundColor: "#D8D8D8",
    },
    phoneInput: {
        backgroundColor: "#D8D8D8",
        border: "none",
    }
}));

export default function CandidateForm({ customHook }) {
	const classes = useStyles();
    const {
		register,
		errors,
		control,
		loading,
        onSubmit,
		contentSelectedItem,
		setContentSelectedItem,
		convertFileToBase64,
        setApply,
        apply
	} = customHook;

    // console.log(customHook);
	return (
		<form className={classes.root}>
            <Typography variant="subtitle1" color="initial">Name</Typography>
            <GridSystem>
                <Input
                    className={`my-10 ${classes.input}`}
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    value={contentSelectedItem?.firstName || ''}
                    onChange={ (ev) => setContentSelectedItem({
                        ...contentSelectedItem,
                        firstName: ev.target.value
                    })}
                    error={errors.firstName}
                    message={errors.firstName?.message}
                    refs={register}
                    type="text"
                />

                <Input
                    className={`my-10 ${classes.input}`}
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    value={contentSelectedItem?.lastName || ''}
                    onChange={ (ev) => setContentSelectedItem({
                        ...contentSelectedItem,
                        lastName: ev.target.value
                    })}
                    error={errors.lastName}
                    message={errors.lastName?.message}
                    refs={register}
                    type="text"
                />
            </GridSystem>
            <Grid container xs={12} sm={12} md={12} lg={12}>
                
                <Grid item xs={5} sm={5} md={5} lg={5}>
                    <Typography variant="subtitle1" color="initial">Email</Typography>
                    <Input
                        className={`my-10 w-full ${classes.input}`}
                        name="applicantEmail"
                        id="applicantEmail"
                        value={contentSelectedItem?.applicantEmail || ''}
                        onChange={ (ev) => setContentSelectedItem({
                            ...contentSelectedItem,
                            applicantEmail: ev.target.value
                        })}
                        error={errors.applicantEmail}
                        message={errors.applicantEmail?.message}
                        refs={register}
                        type="text"
                    />
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                </Grid>
                <Grid item xs={5} sm={5} md={5} lg={5}>
                    <Typography variant="subtitle1" color="initial">Phone Number</Typography>
                    <PhoneNumberInput 
                        country="NG"
                        className={`w-full ${classes.input}`}
                        name="contactNumber"
                        id="contactNumber"
                        placeholder=''
                        enableAreaCodes={true}
                        value={contentSelectedItem?.contactNumber || ''}
                        onChange={ (value) => setContentSelectedItem({
                            ...contentSelectedItem,
                            contactNumber: value
                        })}
                        error={errors.contactNumber}
                        message={errors.contactNumber?.message}
                        refs={register}
                    />
                </Grid>
            </Grid>
                <Typography variant="subtitle1" color="initial">Home Address</Typography>
                <Input
                    className={`my-10 w-full ${classes.input}`}
                    name="homeAddress"
                    id="homeAddress"
                    multiline
                    rows={6}
                    value={contentSelectedItem?.homeAddress || ''}
                    onChange={ (ev) => setContentSelectedItem({
                        ...contentSelectedItem,
                        homeAddress: ev.target.value
                    })}
                    error={errors.homeAddress}
                    message={errors.homeAddress?.message}
                    refs={register}
                    type="text"
                />
                
            <GridSystem>
                <SelectTextField
                    label="Application Source"
                    className={`my-10 ${classes.input}`}
                    // control={control}
                    name="applicationSource"
                    id="applicationSource"
                    error={errors.applicationSource}
                    register={register}
                    message={errors.applicationSource?.message}
                    value={contentSelectedItem?.applicationSource || ''}
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
                <FileInput
                    accept="application/pdf"
                    id="input"
                    className={`my-10 ${classes.input}`}
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
            
            <SharedButton
                variant="contained"
                color="secondary"
                type="button"
                className="my-10 w-full"
                disabled={Object.keys(errors).length !== 0 || !contentSelectedItem.applicationSource 
                    || !contentSelectedItem.applicationData
                }
                onClick={() => {
                    // setApply(false);
                    onSubmit(contentSelectedItem)
                }}
            >
                Submit
            </SharedButton>
        </form>
	);
}
