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
import EmployeeGradeCard from "./components/employeeGradeCard";
import EmployeeGradeModal from "./components/employeeGrade";
import EmployeeGradeLevelModal from "./components/employeeGradeLevel";
import { setStepper } from './components/setStepper';
import EmployeeGradeLevelCard from './components/employeeGradeLevelCard';
import *  as Actions from 'app/main/employeeManagement/store/actions';
import withReducer from "app/store/withReducer";
import employeesReducer from "app/main/employeeManagement/store/reducers/employees.reducer";
import { departments } from 'app/main/HR/business_unit/department/store/reducers/departments.reducer';

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
    regStep: yup.number()
});

function Departments({handleNext}) {
  const { register, handleSubmit, formState:{ errors }, setValue, getValues } = useForm({
    mode: "all",
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const { entities, departmentList, grades, gradeLevels, accountSettings, compensationData } = useSelector(state => state.employeeMgt);
  
  const dispatch = useDispatch();
  const [entityList, setEntityList] = React.useState([]);
  // const [departmentList, setDepartmentList] = React.useState([]);
  const [accountSettingsData, setAccountSettingsData] = React.useState({});
  const [openDepartmentModal, setOpenDepartmentModal] = React.useState(false);
  const [hasEntities, setHasEntities] = React.useState(true);
  const [gradeList, setGradeList] = React.useState([]);
  const [gradeLevelList, setGradeLevelList] = React.useState([]);
  const [openEmployeeGradeModal, setOpenEmployeeGradeModal] = React.useState(false);
  const [openEmployeeGradeLevelModal, setOpenEmployeeGradeLevelModal] = React.useState(false);
  const [humanResource, setHumanResource] = React.useState(true);
  const [finance, setFinance] = React.useState(true);
  const [informationTechnology, setInformationTechnology] = React.useState(false);
  const [canSubmit, setCanSubmit] = React.useState(false);
  let genericDept = [];
  let localData = {};
  const classes = useStyles();

  React.useEffect(() => {
    dispatch(Actions.getEntities());
    dispatch(Actions.getAccountSettings());
    dispatch(Actions.getCompensations());
    dispatch(Actions.getGrades());
    dispatch(Actions.getGradeLevels());
    dispatch(Actions.getDepartments());
    const dataResponse = localStorage.getItem('login_data');
	  localData = JSON.parse(dataResponse);
    if (localData?.company?.hasEntities === true) {
      setHasEntities(true);
    } else {
      setHasEntities(false);
    }
  }, []);

  React.useEffect(() => {
    if (localData?.company?.hasEntities === true) {
      if (departments.length > 0) {
        setCanSubmit(true);
      } else {
        swal.fire({
          text: 'Kindly sAdd Departments Before Proceeding',
          icon: 'info'
        })
      }
    } else {
      if (departmentList.length > 0 && grades.length > 0 && gradeLevels.lenth > 0) {
        setCanSubmit(true);
      } else {
        swal.fire({
          text: 'Kindly Complete Setup Before Proceeding',
          icon: 'info'
        })
      }
    }
  }, [departmentList, grades, gradeLevels])
  
  React.useEffect(() => {
    setEntityList(entities);
    setGradeList(grades);
    setGradeLevelList(gradeLevels);
    setAccountSettingsData(accountSettings);
    // setDepartmentList(departmentList);
  }, [grades, departmentList, entities, gradeLevels, accountSettings])

  const handleHumanResourceChange = (event) => {
    setHumanResource(event.target.checked);
    let data = {};
    data.name = "Human Resource";
    if (humanResource === true) {
      !genericDept.includes(data) ? genericDept.push(data) : '';
    } else {
      genericDept.filter(e => e !== data);
    }
  };
  const handleFinanceChange = (event) => {
    setFinance(event.target.checked);
    let data = {};
    data.name = "Finance";
    if (finance === true) {
      !genericDept.includes(data) ? genericDept.push(data) : '';
    } else {
      genericDept.filter(e => e !== data);
    }
  };
  const handleInformationTechnologyChange = (event) => {
    setInformationTechnology(event.target.checked);
    let data = {};
    data.name = "Information Technology";
    if (finance === true) {
      !genericDept.includes(data) ? genericDept.push(data) : '';
    } else {
      genericDept.filter(e => e !== data);
    }
  };


  const HandleAddDepartment = () => {
    setOpenDepartmentModal(true);
  }

  const handleAddEmployeeGrade = () => {
    setOpenEmployeeGradeModal(true);
  }

  const handleAddEmployeeGradeLevel = () => {
    setOpenEmployeeGradeLevelModal(true);
  }

  const onSubmit = async (data) => {
    if (canSubmit) {
      try {
        loading('processing...');
        await setStepper([], 4);
        localData.company.regStep = 4;
        localStorage.setItem('login_data', JSON.stringify(localData));
        swal.fire({
          text: 'Step Completed',
          icon: 'success'
        });
        window.location.assign('/employee/dashboard');
      } catch (e) {
        swal.fire({
          text: e?.message || 'Something went wrong',
          icon: 'error'
        })
      } 
    } else {
      return;
    }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h5" color="initial" className='my-10'><strong>Departments</strong></Typography>
          {!hasEntities && <Grid container spacing={3} justify='space-between' align='center' style={{ marginBottom: '3rem'}}>
          <Typography variant="body1" color="initial" className='my-10' style={{ marginLeft: '15px' }}><strong>Please select departments that will be general for all entities</strong></Typography>
            <Grid item lg={12} md={12} sm={12} xs={12} align='left' style={{ marginBottom: '-15px' }}>
              <FormControlLabel control={<Checkbox
                checked={humanResource}
                onChange={handleHumanResourceChange}
                name="humanResource"
                color="primary"
              />}
              label="Human Resource" />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} align='left' style={{ marginBottom: '-15px', marginTop: '-15px'  }}>
              <FormControlLabel control={<Checkbox
                checked={finance}
                onChange={handleFinanceChange}
                name="finance"
                color="primary"
              />}
              label="Finance" />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} align='left' style={{ marginTop: '-15px' }}>
              <FormControlLabel control={<Checkbox
                checked={informationTechnology}
                onChange={handleInformationTechnologyChange}
                name="informationTechnology"
                color="primary"
              />}
              label="Information Technology" />
            </Grid>
          </Grid>}          
          <Grid container spacing={3} justify='space-between' align='center' style={{ marginBottom: '3rem'}}>
            <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='mt-10'>
              <Button onClick={HandleAddDepartment} variant="contained" color="secondary">
                <span style={{ marginRight: '5px' }}><AddBoxOutlinedIcon/></span> Add Department
              </Button>
            </Grid>
            
            <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='my-10'>
               {departmentList && departmentList.map(item => (
                 <DepartmentCard name={item.departmentName} description={item.description} entities={entities} data={item}/>))}
            </Grid>
  
          </Grid>
          {!hasEntities && <Grid container spacing={3} justify='center' align='center' className='my-10'>
            <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='my-10'>
                <Typography variant="h5" color="initial" className='my-10'><strong>Employee Grade</strong></Typography>
                <Button onClick={handleAddEmployeeGrade} variant="contained" color="secondary">
                  <span style={{ marginRight: '5px' }}><AddBoxOutlinedIcon/></span> Add Employee Grade
                </Button>
              </Grid>
              
              <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='my-10'>
                {grades && grades.map(item => (
                  <EmployeeGradeCard name={item?.gradeName} entityName={item?.entityName} entities={entityList} description={item?.gradeDescription} employeeGrades={grades} data={item}/>))}
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='my-10'>
                <Typography variant="h5" color="initial" className='my-10'><strong>Employee Grade Level</strong></Typography>
                <Button onClick={handleAddEmployeeGradeLevel} variant="contained" color="secondary">
                  <span style={{ marginRight: '5px' }}><AddBoxOutlinedIcon/></span> Add Employee Grade Level
                </Button>
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='my-10'>
                {gradeLevels && gradeLevels.map(item => (
                  <EmployeeGradeLevelCard name={item?.level} description={item?.description} compensationData={compensationData || []} entityList={entities} gradeLevelList={gradeLevelList} data={item}/>))}
              </Grid>  
            </Grid>}
            <Grid container spacing={3} justify='center' align='center' className='my-10'>
              <Button variant="contained" type='submit' color="primary">
                Submit 
              </Button>
          </Grid>
      </form>
      <DepartmentModal open={openDepartmentModal} entities={entityList} setOpen={setOpenDepartmentModal} data={{}} edit={false}/>
      <EmployeeGradeModal open={openEmployeeGradeModal} employeeGrades={accountSettingsData?.employeeGrade || []} entities={entityList} setOpen={setOpenEmployeeGradeModal} data={{}} edit={false}/>
      <EmployeeGradeLevelModal open={openEmployeeGradeLevelModal}  compensationList={compensationData || []}  employeeGrades={grades || []} entities={entityList} setOpen={setOpenEmployeeGradeLevelModal} data={{}} edit={false}/>
    </div>
  );
}


withReducer('employeeMgt', employeesReducer)(Departments);
export default Departments;