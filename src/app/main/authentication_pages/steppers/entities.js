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
import { setStepper } from './components/setStepper';
import EmployeeGradeLevelCard from './components/employeeGradeLevelCard';
import *  as Actions from 'app/main/employeeManagement/store/actions';
import withReducer from "app/store/withReducer";
import employeesReducer from "app/main/employeeManagement/store/reducers/employees.reducer";

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

function Entities({handleNext}) {
  
  const { entities, grades, gradeLevels, accountSettings, compensationData } = useSelector(state => state.employeeMgt);
  // console.log('entities: ', entities);
  // console.log('grades: ', grades);

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
  const [canSubmit, setCanSubmit] = React.useState(false);
  let genericDept = [];
  const classes = useStyles();

  React.useEffect(() => {
    dispatch(Actions.getEntities());
    dispatch(Actions.getAccountSettings());
    dispatch(Actions.getCompensations());
    dispatch(Actions.getGrades());
    dispatch(Actions.getGradeLevels());
  }, [])

  React.useEffect(() => {
    if (grades.length > 0 && gradeLevels.lenth > 0) {
      setCanSubmit(true);
    }
  }, [grades, gradeLevels])

  React.useEffect(() => {
    setEntityList(entities);
    setGradeList(grades);
    setGradeLevelList(gradeLevels);
    setAccountSettingsData(accountSettings);
  }, [grades, entities, gradeLevels, accountSettings])

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
  
  const HandleAddEntity = () => {
    setOpenEntityModal(true);
  }

  const handleAddEmployeeGrade = () => {
    setOpenEmployeeGradeModal(true);
  }

  const handleAddEmployeeGradeLevel = () => {
    setOpenEmployeeGradeLevelModal(true);
  }


  const HandleSubmit = async () => {
      if (canSubmit) {
        try {
          loading('processing...');
          await setStepper(genericDept, 3);
          const dataResponse = localStorage.getItem('login_data');
	        const localData = JSON.parse(dataResponse);
          localData.company.regStep = 3;
          localStorage.setItem('login_data', JSON.stringify(localData));
          swal.fire({
            text: 'Step Completed',
            icon: 'success'
          });
          handleNext();
        } catch (e) {
          swal.fire({
            text: e?.message || 'Something went wrong',
            icon: 'error'
          })
        }
      } else {
        swal.fire({
          text: 'Kindly Complete Setup Before Proceeding',
          icon: 'info'
        })
      }
  };

  return (
    <div className={classes.root}>
      <div>
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
                 <EmployeeGradeCard name={item?.gradeName} entityName={item?.entityName} entities={entityList} description={item?.gradeDescription} employeeGrades={accountSettingsData?.employeeGrade || []} data={item}/>))}
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='my-10'>
              <Typography variant="h5" color="initial" className='my-10'><strong>Employee Grade Level</strong></Typography>
              <Button onClick={handleAddEmployeeGradeLevel} variant="contained" color="secondary">
                <span style={{ marginRight: '5px' }}><AddBoxOutlinedIcon/></span> Add Employee Grade Level
              </Button>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='my-10'>
               {gradeLevelList.map(item => (
                 <EmployeeGradeLevelCard name={item?.level} description={item?.description} compensationData={compensationData || []} entityList={entities} gradeLevelList={gradeLevelList} data={item}/>))}
            </Grid>  
          </Grid>
          <Grid container spacing={3} justify='center' align='center' className='my-10'>
              <Button variant="contained" onClick={HandleSubmit} color="primary">
                  Submit 
              </Button>
          </Grid>
      </div>
      <EntityModal open={openEntityModal} setOpen={setOpenEntityModal} edit={false} data={{}}/>
      <EmployeeGradeModal open={openEmployeeGradeModal} employeeGrades={accountSettingsData?.employeeGrade || []} entities={entityList} setOpen={setOpenEmployeeGradeModal} data={{}} edit={false}/>
      <EmployeeGradeLevelModal open={openEmployeeGradeLevelModal}  compensationList={compensationData || []}  employeeGrades={gradeList || []} entities={entityList} setOpen={setOpenEmployeeGradeLevelModal} data={{}} edit={false}/>
    </div>
  );
}


withReducer('employeeMgt', employeesReducer)(Entities);
export default Entities;