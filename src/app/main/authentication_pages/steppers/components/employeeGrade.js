import React from 'react';
import SharedModal from 'app/shared/modal/SharedModal';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { DatePicker } from "@material-ui/pickers";
import Input from 'app/shared/TextInput/Input';
import PhoneNumberInput from 'app/shared/TextInput/PhoneNumberInput';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Card from '@material-ui/core/Card';
import swal from 'sweetalert2';
import errorMsg from 'utils/errorMsg';
import api from 'app/services/api';
import loading from 'utils/loading';
import { makeStyles } from '@material-ui/core/styles';
import catchErrorMsg from 'utils/catchErrorMsg';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import ChipInput from "material-ui-chip-input";
import timeZone from "app/shared/timezoneList";
import currencyList from "app/shared/currencies";
import dateFormatList from "app/shared/dateformat";
import { FormHelperText } from "@material-ui/core";
import Modal from './modal';

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

const schema = yup.object().shape({
    entityId: yup.number(errorMsg({ name: 'Entity', type: 'string' }))
        .required(errorMsg({ name: 'Entity', type: 'required' })),
    employeeGrade: yup.string(errorMsg({ name: 'Employee Grade', type: 'string' }))
        .min(2, errorMsg({ name: 'Employee Grade', type: 'min', number: 3 }))
        .max(60, errorMsg({ name: 'Employee Grade', type: 'max', number: 60 }))
        .required(errorMsg({ name: 'Employee Grade', type: 'required' })),
    description: yup.string(errorMsg({ name: 'Description', type: 'string' }))
        // .min(3, errorMsg({ name: 'Description', type: 'min', number: 3 }))
        .max(1000, errorMsg({ name: 'Description', type: 'max', number: 1000 })),
});

export default function EmployeeGradeModal ({open, setOpen, edit, entities, employeeGrades, data}) {
    
    const { register, handleSubmit, formState:{ errors }, setValue, getValues } = useForm({
        mode: "all",
        reValidateMode: 'onChange',
        resolver: yupResolver(schema)
    });

    const dispatch = useDispatch();
    const [entityId, setEntityId] = React.useState(null);
    const [entityErr, setEntityErr] = React.useState("");
    const [employeeGrade, setEmployeeGrade] = React.useState(null);
    const [employeeGradeErr, setEmployeeGradeErr] = React.useState("");
    const classes = useStyles();

    React.useEffect(() => {
        setEntityErr(errors.entityId?.message);
        setEmployeeGradeErr(errors.employeeGrade?.message);
      }, [errors]);

      const handleEntityChange = async (event) => {
        setEntityId(event.target.value.id);
        register({ name: 'entityId', type: 'custom' }, { required: true });
        setValue("entityId", event.target.value.id);
        setEntityErr(errors.entityId?.message);
      };

      const handleEmployeeGradeChange = async (event) => {
        setEmployeeGrade(event.target.value);
        register({ name: 'employeeGrade', type: 'custom' }, { required: true });
        setValue("employeeGrade", event.target.value);
        setEntityErr(errors.employeeGrade?.message);
      };


    const onSubmit = async (value) => {
        const form = { ...value};
        console.log('form: ', form);
        if (edit) {
            try {
                loading('Updating Employee Grade...');
                const { data: { message, success  } } = await api.patch(`/entity/${data.id}`, form);
                if (success) {
                    swal.fire({
                        text: message,
                        icon: 'success'
                    });
                    setOpen(false);
                    setUpdated(true);
                } else {
                    swal.fire({
                        text: 'Something went wrong...',
                        icon: 'error'
                    })
                }
            } catch (e) {
                swal.fire({
                    text: 'Something went wrong...',
                    icon: 'error'
                })
            }
        } else {
            try {
                loading('Adding Employee Grade...');
                const { data: { message, success  } } = await api.post('/entity', form);
                if (success) {
                    swal.fire({
                        text: message,
                        icon: 'success'
                    });
                    setOpen(false);
                    setNewAdded(true);
                } else {
                    swal.fire({
                        text: 'Something went wrong...',
                        icon: 'error'
                    })
                }
            } catch (e) {
                swal.fire({
                    text: 'Something went wrong...',
                    icon: 'error'
                })
            }
        }
    };


  return (
    <Modal
      title={edit ? 'Edit Employee Grade' : 'Add Employee Grade'}
      handleClose={() => setOpen(false)}
      open={open}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} justify='space-between' align='center' style={{ marginBottom: '2rem', marginTop: '2rem', overflowY: 'scroll'}}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Entity</InputLabel>
                    <Select
                    justify='left'
                    align='left'
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name='entityId'
                    error={errors.entityId}
                    message={errors.entityId?.message}
                    onChange={handleEntityChange}
                    label="Entity"
                    >
                    {entities.map(item => (
                    <MenuItem key={item.id} value={item}>
                        {item.entityName}
                    </MenuItem>))}
                    </Select>
                    <FormHelperText style={{ color: 'red'}}>{entityErr}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Employee Grade</InputLabel>
                    <Select
                    justify='left'
                    align='left'
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name='employeeGrade'
                    error={errors.employeeGrade}
                    message={errors.employeeGrade?.message}
                    onChange={handleEmployeeGradeChange}
                    label="Employee Grade"
                    >
                    {employeeGrades.map(item => (
                    <MenuItem key={item} value={item}>
                        {item}
                    </MenuItem>))}
                    </Select>
                    <FormHelperText style={{ color: 'red'}}>{employeeGradeErr}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Input
                    label='Description'
                    name='description'
                    type='text'
                    multiline
                    rows="4"
                    error={errors.description}
                    message={errors.description?.message}
                    helperText={errors.description?.message}
                    refs={register}
                />
            </Grid>
        </Grid>
        <Grid container spacing={3} justify='center' align='center' className='my-10'>
            <Button variant="contained" type='submit' color="primary" className='mx-20'>
                Save 
            </Button>
            <Button variant="contained" onClick={() => setOpen(false)} >
                Cancel 
            </Button>
        </Grid>
      </form>
    </Modal>
  );
};
