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
import CompensationItem from './compensationItem';
import *  as Actions from 'app/main/employeeManagement/store/actions';
import { CompensationColumnsConfig } from 'app/main/compensationColumns/CompensationColumnsConfig';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      height: '100%',
    //   overflowY: 'scroll',
      flexDirection: 'column',
      margin: '0rem auto',
      padding: '5rem',
      '& form': {
        width: '100%',
      }
    }
}))

const schema = yup.object().shape({
    gradeId: yup.number(errorMsg({ name: 'Employee Grade', type: 'number' }))
        .required(errorMsg({ name: 'Employee Grade', type: 'required' })),
    level: yup.string(errorMsg({ name: 'Level', type: 'string' }))
        .required(errorMsg({ name: 'Level', type: 'required' })),
    description: yup.string(errorMsg({ name: 'Description', type: 'string' }))
        .max(1000, errorMsg({ name: 'Description', type: 'max', number: 1000 })),
    compensations: yup.object().required(errorMsg({ name: 'Compensations', type: 'required'})),
    pipCompensations: yup.array(),
});

export default function EmployeeGradeLevelModal ({open, employeeGrades, entities, setOpen, data, edit, compensationList}) {
    
    const { register, handleSubmit, formState:{ errors }, setValue, getValues } = useForm({
        mode: "all",
        reValidateMode: 'onChange',
        resolver: yupResolver(schema)
    });

    const dispatch = useDispatch();
    const [compensationObj, setCompensationObj] = React.useState({});
    const [newAdded, setNewAdded] = React.useState(false);
    const [updated, setUpdated] = React.useState(false);
    const [gradeId, setGradeId] = React.useState(0);
    const [gradeErr, setGradeErr] = React.useState("");
    const [level, setLevel] = React.useState("");
    const [employeeGrade, setEmployeeGrade] = React.useState("");
    const [compensationData, setCompensationData] = React.useState(['Housing', 'Transportation', 'Basic Salary']);
    const [pipCompensations, setPipCompensations] = React.useState([]);
    const [employeeGradeErr, setEmployeeGradeErr] = React.useState("");
    const [pipCompensationsErr, setPipCompensationsErr] = React.useState("");
    const classes = useStyles();

    React.useEffect(() => {
        setGradeErr(errors.gradeId?.message);
        setPipCompensationsErr(errors.pipCompensations?.message);
      }, [errors]);

      React.useEffect(() => {
        dispatch(Actions.getGradeLevels());
      }, [newAdded, updated]);

      const handlePipEligibilityChange = (event) => {
        setPipEligibility(event.target.checked);
      };


      const handleGradeChange = async (event) => {
        setGradeId(event.target.value.id);
        register({ name: 'gradeId', type: 'custom' }, { required: true });
        setValue("gradeId", event.target.value.id);
        setGradeErr(errors.gradeId?.message);
      };

      const handlePipCompensationsChange = async (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        setPipCompensations(value);
        register({ name: 'pipCompensations', type: 'custom' }, { required: true });
        setValue("pipCompensations", value);
        setPipCompensationsErr(errors.pipCompensations?.message);
      };

    const onSubmit = async (value) => {
        const form = { ...value };
        console.log('Employee Grade Level form: ', form);
        if (edit) {
            try {
                loading('Updating Employee Grade Level...');
                const { data: { message, success  } } = await api.patch(`employee-grade-level/`, form);
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
                loading('Adding Employee Grade Level...');
                const { data: { message, success  } } = await api.post('/employee-grade-level', form);
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
      title={edit ? 'Edit Employee Grade Level' : 'Add Employee Grade Level'}
      handleClose={() => setOpen(false)}
      open={open}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} justify='space-between' align='center' style={{ marginBottom: '2rem', marginTop: '2rem', overflowY: 'scroll'}}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Employee Grade</InputLabel>
                    <Select
                    justify='left'
                    align='left'
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name='gradeId'
                    error={errors.gradeId}
                    message={errors.gradeId?.message}
                    onChange={handleGradeChange}
                    label="Employee Grade"
                    >
                    {employeeGrades.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                        {item.gradeName}
                    </MenuItem>))}
                    </Select>
                    <FormHelperText style={{ color: 'red'}}>{gradeErr}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Input
                    label='Level Name'
                    name='level'
                    type='text'
                    error={errors.level}
                    message={errors.level?.message}
                    helperText={errors.level?.message}
                    refs={register}
                />
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

            <Typography variant="body1" style={{ marginTop: '15px', marginLeft: '15px' }} color="initial"><strong>Compensations</strong></Typography>
            <Grid item lg={12} md={12} sm={12} xs={12} align='left' style={{ borderRadius: '5px', border: 'solid 1px black', margin: '15px', height: '30vh', overflowY: "scroll"  }}>
              {compensationList.map(item => (
                 <CompensationItem name={item?.columnName} compensationObj={compensationObj} />))}
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
                <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                    <InputLabel shrink htmlFor="select-multiple-native" id="demo-simple-select-outlined-label">Pip Compensations</InputLabel>
                    <Select
                        justify='left'
                        align='left'
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        multiple
                        native
                        value={pipCompensations}
                        onChange={handlePipCompensationsChange}
                        inputProps={{ id: 'select-multiple-native', }}
                        name='pipCompensations'
                        error={errors.pipCompensations}
                        message={errors.pipCompensations?.message}
                    >
                        {compensationList.map((item) => (
                            <option key={item.id} value={item.columnName}>
                                {item.columnName}
                            </option>))}
                    </Select>
                    <FormHelperText style={{ color: 'red'}}>{pipCompensationsErr}</FormHelperText>
                </FormControl>
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
