import React from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from 'app/shared/TextInput/Input';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert2';
import api from 'app/services/api';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { DatePicker } from "@material-ui/pickers";
import useEmployees from "../hooks/useEmployees";
import { capitalizeWords } from 'app/shared/capitalizeWords';
import loading from "utils/loading";

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      height: '100%',
      overflowY: 'scroll',
      flexDirection: 'column',
      margin: '0rem auto',
      padding: '5rem',
      '& form': {
        width: '100%',
      }
    }
}))

const NewEmployeeForm = ({customHook}) => {

  const dispatch = useDispatch();

  const {
    errors,
    register,
    entities, 
    roles, 
    jobTitles,
    grades,
    employmentStatusList,
    modeOfEmploymentList,
    handleSubmit,
    onSubmit,
    handleNext,
    setContentSelectedItem,
    contentSelectedItem,
    setDepartments,
    departments
  } = customHook;
  

  
  const classes = useStyles();


//   const onSubmit = async (data) => {
//     try {
//       const form = { ...data, srgIdNumber: employeeId, entityId, departmentId, roleId, employmentStatus, modeOfEmployment, jobTitleId, employeeGradeId, employeeGradeLevelId };
//       form.employeeId = undefined;
//       form.employeeStatus = form.employmentStatus;
//       form.employmentStatus = undefined;
//       const dateValue = form.startDate.split(`\"`);
//       form.startDate = dateValue[1].substring(0, 10);
//       // console.log('Form: ', JSON.stringify(form));
//       loading('Creating Employee Account...');
//       const { data: { message  } } = await api.post('/auth/employee/add-employee', form);
//       swal.fire({
//         text: message,
//         icon: 'success'
//       });
//       window.location.assign('/employee_management');
//     } catch (e) {
//       swal.fire({
//         text: e?.message || 'Something went wrong',
//         icon: 'error'
//       })
//     }
//   };

  const grade = () => {
    return grades.find((g) => Number(g?.id) === Number(contentSelectedItem?.employeeGradeId));
  }

  const validate = () => {
      return ((Number(grade()?.minGross) > contentSelectedItem?.grossAnnualSalary) || (Number(grade()?.maxGross) < contentSelectedItem?.grossAnnualSalary));
  }

  return (
    // <Card className={classes.root}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
            <Typography variant="h5" color="initial" className='my-24'><strong>Employee Login Information</strong></Typography>
            <Grid container spacing={3} justify='space-between' align='center' style={{ marginBottom: '3rem'}}>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                <Input
                    required
                    label='First Name'
                    name='firstName'
                    error={errors.firstName}
                    message={errors.firstName?.message}
                    helperText={errors.firstName?.message}
                    value={contentSelectedItem?.firstName || ''}
                    onChange={ (ev) => setContentSelectedItem({
                        ...contentSelectedItem,
                        firstName: ev.target.value
                    })}
                    refs={register}
                />
                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                <Input
                    required
                    label='Middle Name'
                    name='middleName'
                    error={errors.middleName?.message}
                    message={errors.middleName?.message}
                    helperText={errors.middleName?.message}
                    value={contentSelectedItem?.middleName || ''}
                    onChange={ (ev) => setContentSelectedItem({
                        ...contentSelectedItem,
                        middleName: ev.target.value
                    })}
                    refs={register}
                />
                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                <Input
                    required
                    label='Last Name'
                    name='lastName'
                    error={errors.lastName}
                    message={errors.lastName?.message}
                    helperText={errors.lastName?.message}
                    value={contentSelectedItem?.lastName || ''}
                    onChange={ (ev) => setContentSelectedItem({
                        ...contentSelectedItem,
                        lastName: ev.target.value
                    })}
                    refs={register}
                />
                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                <Input
                    required
                    label='Official Email Address'
                    name='email'
                    error={errors.email}
                    message={errors.email?.message}
                    helperText={errors.email?.message}
                    value={contentSelectedItem?.email || ''}
                    onChange={ (ev) => setContentSelectedItem({
                        ...contentSelectedItem,
                        email: ev.target.value
                    })}
                    refs={register}
                />
                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                <Input
                    required
                    label='Employee ID'
                    name='employeeId'
                    error={errors.employeeId}
                    message={errors.employeeId?.message}
                    helperText={errors.employeeId?.message}
                    value={contentSelectedItem?.srgIdNumber || ''}
                    onChange={ (ev) => setContentSelectedItem({
                        ...contentSelectedItem,
                        srgIdNumber: ev.target.value
                    })}
                    refs={register}
                />
                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                <Input
                    required
                    label='Personal Email Address'
                    name='personalEmail'
                    error={errors.personalEmail}
                    message={errors.personalEmail?.message}
                    helperText={errors.personalEmail?.message}
                    value={contentSelectedItem?.personalEmail || ''}
                    onChange={ (ev) => setContentSelectedItem({
                        ...contentSelectedItem,
                        personalEmail: ev.target.value
                    })}
                    refs={register}
                />
                </Grid>
                {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                <FormControlLabel control={<Checkbox
                    checked={contentSelectedItem?.newsletter}
                    // onChange={handleCheckedChange}
                    onChange={ (ev) => setContentSelectedItem({
                        ...contentSelectedItem,
                        newsletter: ev.target.checked
                    })}
                    name="checked"
                    color="primary"
                    style={{ marginLeft: '10px' }}
                />}
                label="I want to recieve newsletters and updates" />
                </Grid> */}
            </Grid>

            <Typography variant="body1" color="initial" className='my-10'><strong>Company Information</strong></Typography>
            <Grid container spacing={3} justify='space-between' align='center' style={{ marginBottom: '3rem'}}>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Entity</InputLabel>
                    <Select
                    justify='left'
                    align='left'
                    name='entityId'
                    error={errors.entityId}
                    message={errors.entityId?.message}
                    value={contentSelectedItem?.entityId || ''}
                    onChange={ (ev) => {setContentSelectedItem({
                            ...contentSelectedItem,
                                entityId: ev.target.value
                            });
                            console.log(ev.target.value)
                            setDepartments(entities?.find((ent) => ent.id === ev.target.value).department);
                        }
                    }
                    label="Entity"
                    >
                    {entities.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                        {capitalizeWords(item.entityName)}
                    </MenuItem>))}
                    </Select>
                    <FormHelperText style={{ color: 'red'}}>{errors.entityId?.message}</FormHelperText>
                </FormControl>
                </Grid>
                {contentSelectedItem?.entityId > 0 && (
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                    <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Department</InputLabel>
                        <Select
                        justify='left'
                        align='left'
                        name='departmentId'
                        error={errors.departmentId}
                        message={errors.departmentId?.message}
                        value={contentSelectedItem?.departmentId || ''}
                        onChange={ (ev) => setContentSelectedItem({
                            ...contentSelectedItem,
                            departmentId: ev.target.value
                        })}
                        label="Department"
                        >
                        {departments.map(item => (
                        <MenuItem key={item.id} value={item.id}>
                            {capitalizeWords(item.departmentName)}
                        </MenuItem>))}
                        </Select>
                        <FormHelperText style={{ color: 'red'}}>{errors.departmentId?.message}</FormHelperText>
                    </FormControl>
                    </Grid>
                )}
                <Grid item lg={4} md={6} sm={12} xs={12}>
                <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                    <Select
                    justify='left'
                    align='left'
                    name='role'
                    error={errors.roleId}
                    message={errors.roleId?.message}
                    value={contentSelectedItem?.roleId || ''}
                    onChange={ (ev) => setContentSelectedItem({
                        ...contentSelectedItem,
                        roleId: ev.target.value
                    })}
                    label="Role"
                    >
                    {roles.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                        {capitalizeWords(item.name)}
                    </MenuItem>))}
                    </Select>
                    <FormHelperText style={{ color: 'red'}}>{errors.roleId?.message}</FormHelperText>
                </FormControl>
                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Employment Status</InputLabel>
                    <Select
                    justify='left'
                    align='left'
                    name='employmentStatus'
                    error={errors.employmentStatus}
                    message={errors.employmentStatus?.message}
                    value={contentSelectedItem?.employmentStatus || ''}
                    onChange={ (ev) => setContentSelectedItem({
                        ...contentSelectedItem,
                        employmentStatus: ev.target.value
                    })}
                    label="Employment Status"
                    >
                    {employmentStatusList.map(item => (
                    <MenuItem key={item} value={item}>
                        {capitalizeWords(item)}
                    </MenuItem>))}
                    </Select>
                    <FormHelperText style={{ color: 'red'}}>{errors.employmentStatus?.message}</FormHelperText>
                </FormControl>
                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Mode Of Employment</InputLabel>
                    <Select
                    justify='left'
                    align='left'
                    name='modeOfEmployment'
                    error={errors.modeOfEmployment}
                    message={errors.modeOfEmployment?.message}
                    value={contentSelectedItem?.modeOfEmployment || ''}
                    onChange={ (ev) => setContentSelectedItem({
                        ...contentSelectedItem,
                        modeOfEmployment: ev.target.value
                    })}
                    label="Mode Of Employment"
                    >
                    {modeOfEmploymentList.map(item => (
                    <MenuItem key={item} value={item}>
                        {capitalizeWords(item)}
                    </MenuItem>))}
                    </Select>
                    <FormHelperText style={{ color: 'red'}}>{errors.modeOfEmployment?.message}</FormHelperText>
                </FormControl>
                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                    <DatePicker
                    inputVariant="outlined"
                    name='startDate'
                    // maxDate={new Date()}
                    error={errors.startDate}
                    message={errors.startDate?.message}
                    label='Employee Start Date'
                    className="w-full"
                    value={contentSelectedItem?.startDate || ''}
                    onChange={(newValue) => {
                        setContentSelectedItem({
                            ...contentSelectedItem,
                            startDate: newValue
                        })
                    }}
                    format="MM/DD/yyyy"
                    helperText={errors.startDate?.message}
                    />
                </FormControl>
                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Job Title</InputLabel>
                    <Select
                    justify='left'
                    align='left'
                    name='jobTitleId'
                    error={errors.jobTitleId}
                    message={errors.jobTitleId?.message}
                    value={contentSelectedItem?.jobTitleId || ''}
                    onChange={ (ev) => setContentSelectedItem({
                        ...contentSelectedItem,
                        jobTitleId: ev.target.value
                    })}
                    label="Job Title"
                    >
                    {jobTitles.map(item => (
                    <MenuItem key={item.id} value={item.name}>
                        {capitalizeWords(item.name)}
                    </MenuItem>))}
                    </Select>
                    <FormHelperText style={{ color: 'red'}}>{errors.jobTitleId?.message}</FormHelperText>
                </FormControl>
                </Grid>
                {grades.length > 0 && (
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                    <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Employee Grade</InputLabel>
                        <Select
                        justify='left'
                        align='left'
                        name='employeeGradeId'
                        error={errors.employeeGradeId}
                        message={errors.employeeGradeId?.message}
                        value={contentSelectedItem?.employeeGradeId || ''}
                        onChange={ (ev) => setContentSelectedItem({
                            ...contentSelectedItem,
                            employeeGradeId: ev.target.value
                        })}
                        label="Employee Grade"
                        >
                            {grades.map(item => (
                            <MenuItem key={item.id} value={item.id}>
                                {`${item.gradeName} - (${item.minGross} - ${item.maxGross})`}
                            </MenuItem>))}
                        </Select>
                        <FormHelperText style={{ color: 'red'}}>{errors.employeeGradeId?.message}</FormHelperText>
                    </FormControl>
                    </Grid>
                )}
                {contentSelectedItem?.employeeGradeId > 0 && (
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                            <Input
                                required
                                label='Gross Annual Salary'
                                name='grossAnnualSalary'
                                type="number"
                                error={errors.grossAnnualSalary || validate()}
                                message={errors.grossAnnualSalary?.message || validate() ? `Gross Salary must not be between ${grade()?.minGross} - ${grade()?.maxGross}` : ""}
                                helperText={errors.grossAnnualSalary?.message || validate() ? `Gross Salary must not be between ${grade()?.minGross} - ${grade()?.maxGross}` : ""}
                                value={contentSelectedItem?.grossAnnualSalary || ''}
                                // min={grades.find((g) => Number(g?.id) === Number(contentSelectedItem?.employeeGradeId))?.minGross}
                                // max={grades.find((g) => Number(g?.id) === Number(contentSelectedItem?.employeeGradeId))?.maxGross}
                                onChange={ (ev) => setContentSelectedItem({
                                    ...contentSelectedItem,
                                    grossAnnualSalary: Number(ev.target.value),
                                    monthlyGross: Number(ev.target.value) / 12
                                })}
                                refs={register}
                            />
                        </FormControl>
                    </Grid>
                )}
            </Grid>
            <Grid container spacing={3} justify='center' align='center'>
                <Button 
                    variant="contained" 
                    type='button' 
                    color="primary"
                    disabled={Object.keys(errors).length !== 0 || (contentSelectedItem?.entityId?.length > 0 && validate())}
                    onClick={() => {handleNext()}}
                >
                    Submit 
                </Button>
            </Grid>
        </form>
    // </Card>
  );
}

export default NewEmployeeForm;