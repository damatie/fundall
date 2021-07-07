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
import EntityModal from "./components/entityModal";
import EntityCard from "./components/entityCard";
import EmployeeGradeCard from "./components/employeeGradeCard";
import EmployeeGradeModal from "./components/employeeGrade";
import EmployeeGradeLevelModal from "./components/employeeGradeLevel";
import *  as Actions from 'app/main/employeeManagement/store/actions';
import withReducer from "app/store/withReducer";
import employeesReducer from "app/main/employeeManagement/store/reducers/employees.reducer";
import { setStepper } from './components/setStepper';
import EmployeeGradeLevelCard from './components/employeeGradeLevelCard';

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
    companyType: yup.string()
        .required(errorMsg({ name: 'Company Type', type: 'required' })),
    companyStartDate: yup.string()
        .required(errorMsg({ name: 'Company Start Date', type: 'required' })),
    noOfBranches: yup.string()
        .required(errorMsg({ name: 'Number Of Branches', type: 'required' })),
    companyEmail: yup.string()
        .matches(/^[A-Za-z\d@$!%*#?&]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/, "Enter a valid Email Address")
        .required(errorMsg({ name: 'Email Address', type: 'required' }))
        .email(),
    country: yup.string()
        .required(errorMsg({ name: 'Country', type: 'required' })),
    state: yup.string()
        .required(errorMsg({ name: 'State', type: 'required' })),
    city: yup.string()
        .required(errorMsg({ name: 'City', type: 'required' })),
    companyVision: yup.string(errorMsg({ name: 'Company Vision', type: 'string' }))
        // .min(3, errorMsg({ name: 'Company Vision', type: 'min', number: 3 }))
        // .max(60, errorMsg({ name: 'Company Vision', type: 'max', number: 60 }))
        ,
    companyMission: yup.string(errorMsg({ name: 'Company Mission', type: 'string' }))
        // .min(3, errorMsg({ name: 'Company Mision', type: 'min', number: 3 }))
        // .max(60, errorMsg({ name: 'Company Mision', type: 'max', number: 60 }))
        ,
    companyWebsite: yup.string(errorMsg({ name: 'Company Website', type: 'string' }))
        // .min(3, errorMsg({ name: 'Company Website', type: 'min', number: 3 }))
        // .max(60, errorMsg({ name: 'Company Website', type: 'max', number: 60 }))
        ,
    hqAddress: yup.string(errorMsg({ name: 'HQ Address', type: 'string' }))
        // .min(3, errorMsg({ name: 'Middle Name', type: 'min', number: 3 }))
        // .max(60, errorMsg({ name: 'Middle Name', type: 'max', number: 60 }))
        ,
    branchAddresses: yup.array()
        .min(1, 'Must have at least one Branch Addresses')
        .required(errorMsg({ name: 'Branch Addresses', type: 'required' })),
});

function Entities({handleNext}) {
  const { register, handleSubmit, formState:{ errors }, setValue, getValues } = useForm({
    mode: "all",
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const { entities, grades, gradeLevels, accountSettings, compensationData } = useSelector(state => state.employeeMgt);
  console.log('entities: ', entities);
  console.log('grades: ', grades);

  const dispatch = useDispatch();
// setEntityList setGradeList setAccountSettingsData
  const [entityList, setEntityList] = React.useState([]);
  const [gradeList, setGradeList] = React.useState([]);
  const [gradeLevelList, setGradeLevelList] = React.useState([]);
  const [accountSettingsData, setAccountSettingsData] = React.useState({});
  const [openEntityModal, setOpenEntityModal] = React.useState(false);
  const [openEmployeeGradeModal, setOpenEmployeeGradeModal] = React.useState(false);
  const [openEmployeeGradeLevelModal, setOpenEmployeeGradeLevelModal] = React.useState(false);
  const [humanResource, setHumanResource] = React.useState(true);
  const [finance, setFinance] = React.useState(true);
  const [informationTechnology, setInformationTechnology] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    dispatch(Actions.getEntities());
    dispatch(Actions.getAccountSettings());
    dispatch(Actions.getCompensations());
    dispatch(Actions.getGrades());
    dispatch(Actions.getGradeLevels());
    console.log('accountSettings: ', accountSettings);
  }, []);

  React.useEffect(() => {
    setEntityList(entities);
    setGradeList(grades);
    setGradeLevelList(gradeLevels);
    setAccountSettingsData(accountSettings);
  }, [grades, entities, gradeLevels, accountSettings])

  React.useEffect(() => {
    console.log('data: ', {...getValues()});
  }, [getValues])

  const handleHumanResourceChange = (event) => {
    setHumanResource(event.target.checked);
  };
  const handleFinanceChange = (event) => {
    setFinance(event.target.checked);
  };
  const handleInformationTechnologyChange = (event) => {
    setInformationTechnology(event.target.checked);
  };
  
  const HandleAddEntity = () => {
    setOpenEntityModal(true);
  }

  const handleAddEmployeeGrade = () => {
    setOpenEmployeeGradeModal(true);
  }

  const handleAddEmployeeGradeLevel = () => {
    setOpenEmployeeGradeLevelModal(true);
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
          <Typography variant="h5" color="initial" className='my-10'><strong>Entities</strong></Typography>
          <Typography variant="body1" color="initial" className='my-10'><strong>Please select departments that will be general for all entities</strong></Typography>
          <Grid container spacing={3} justify='space-between' align='center' style={{ marginBottom: '3rem'}}>
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
            <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='mt-10'>
              <Button onClick={HandleAddEntity} variant="contained" color="secondary">
                <span style={{ marginRight: '5px' }}><AddBoxOutlinedIcon/></span> Add Entity
              </Button>
            </Grid>
            
            <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='my-10'>
               {entityList.map(item => (
                 <EntityCard name={item.entityName} description={item.description} entities={entities} data={item}/>))}
            </Grid>

            
            <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='my-10'>
              <Typography variant="h5" color="initial" className='my-10'><strong>Employee Grade</strong></Typography>
              <Button onClick={handleAddEmployeeGrade} variant="contained" color="secondary">
                <span style={{ marginRight: '5px' }}><AddBoxOutlinedIcon/></span> Add Employee Grade
              </Button>
            </Grid>
            
            <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='my-10'>
               {gradeList.map(item => (
                 <EmployeeGradeCard name={item?.gradeName} entityName={item?.entityName} entities={entityList} description={item?.gradeDescription} employeeGrades={grades} data={item}/>))}
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='my-10'>
              <Typography variant="h5" color="initial" className='my-10'><strong>Employee Grade Level</strong></Typography>
              <Button onClick={handleAddEmployeeGradeLevel} variant="contained" color="secondary">
                <span style={{ marginRight: '5px' }}><AddBoxOutlinedIcon/></span> Add Employee Grade Level
              </Button>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='my-10'>
               {gradeLevelList.map(item => (
                 <EmployeeGradeLevelCard name={item?.gradeName} entityName={item?.entityName} entities={entityList} description={item?.gradeDescription} employeeGrades={grades} data={item}/>))}
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
      <EntityModal open={openEntityModal} setOpen={setOpenEntityModal} edit={false} data={{}}/>
      <EmployeeGradeModal open={openEmployeeGradeModal} employeeGrades={accountSettingsData?.employeeGrade || []} entities={entityList} setOpen={setOpenEmployeeGradeModal} data={{}} edit={false}/>
      <EmployeeGradeLevelModal open={openEmployeeGradeLevelModal}  compensationList={compensationData || []}  employeeGrades={grades || []} entities={entityList} setOpen={setOpenEmployeeGradeLevelModal} data={{}} edit={false}/>
    </div>
  );
}


withReducer('employeeMgt', employeesReducer)(Entities);
export default Entities;