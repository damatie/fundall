import React from "react";
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
// import catchErrorMsg from 'utils/catchErrorMsg';
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
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import DepartmentCard from "./components/departmentCard";
import DepartmentModal from "./components/departmentModal";
import *  as Actions from 'app/main/employeeManagement/store/actions';
import withReducer from "app/store/withReducer";
import employeesReducer from "app/main/employeeManagement/store/reducers/employees.reducer";
import { setStepper } from './components/setStepper';

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
    regSteps: yup.number()
        .required(errorMsg({ name: 'regSteps', type: 'required' })),
});

function Departments({handleNext}) {
  const { register, handleSubmit, formState:{ errors }, setValue, getValues } = useForm({
    mode: "all",
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const { entities, departments, accountSettings } = useSelector(state => state.employeeMgt);
  console.log('entities: ', entities);
  console.log('grades: ', departments);

  const dispatch = useDispatch();
  const [entityList, setEntityList] = React.useState([]);
  const [departmentList, setDepartmentList] = React.useState([]);
  const [accountSettingsData, setAccountSettingsData] = React.useState({});
  const [openDepartmentModal, setOpenDepartmentModal] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    dispatch(Actions.getEntities());
    dispatch(Actions.getAccountSettings());
    dispatch(Actions.getDept());
    dispatch(Actions.getGradeLevels());
    console.log('accountSettings: ', accountSettings);
  }, []);

  React.useEffect(() => {
    setEntityList(entities);
    setDepartmentList(departments);
    setAccountSettingsData(accountSettings);
  }, [departments, entities, accountSettings])

  React.useEffect(() => {
    console.log('data: ', {...getValues()});
  }, [getValues])

  
  const HandleAddDepartment = () => {
    setOpenDepartmentModal(true);
  }


  const onSubmit = async (data) => {
      try {
        const form = { ...data }
        loading('processing...');
        const { data: { message  } } = await api.post('/organization_info', form);
        swal.fire({
          text: message,
          icon: 'success'
        });
        setStepper([], 3);
        handleNext();
      } catch (e) {
        swal.fire({
          text: e?.message || 'Something went wrong',
          icon: 'error'
        })
      }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h5" color="initial" className='my-10'><strong>Departments</strong></Typography>
          <Grid container spacing={3} justify='space-between' align='center' style={{ marginBottom: '3rem'}}>
            <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='mt-10'>
              <Button onClick={HandleAddDepartment} variant="contained" color="secondary">
                <span style={{ marginRight: '5px' }}><AddBoxOutlinedIcon/></span> Add Department
              </Button>
            </Grid>
            
            <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='my-10'>
               {departmentList.map(item => (
                 <DepartmentCard name={item.departmentName} description={item.description} entities={entities} data={item}/>))}
            </Grid>
  
          </Grid>
          <Grid container spacing={3} justify='center' align='center' className='my-10'>
              <Button variant="contained" type='submit' color="primary">
                Submit 
              </Button>
              <Button variant="contained" color="secondary" className='mx-5' style={{ marginLeft: '10px', marginRight: '10px' }} onClick={handleNext}>
                temp NEXT
              </Button>
          </Grid>
      </form>
      <DepartmentModal open={openDepartmentModal} entities={entityList} setOpen={setOpenDepartmentModal} data={{}} edit={false}/>
    </div>
  );
}


withReducer('employeeMgt', employeesReducer)(Departments);
export default Departments;