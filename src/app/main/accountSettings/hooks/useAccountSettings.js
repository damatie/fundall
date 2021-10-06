import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import errorMsg from 'utils/errorMsg';
import timeZone from "app/shared/timezoneList";
import currencyList from "app/shared/currencies";
import dateFormatList from "app/shared/dateformat";
import swal from 'sweetalert2';
import api from 'app/services/api';
import loading from 'utils/loading';
import { setStepper } from '../components/setStepper';
// import * as Actions from '../store/actions';

import moment from 'moment-timezone';

const schema = yup.object().shape({
    timeZone: yup.string()
        .required(errorMsg({ name: 'Time Zone', type: 'required' })),
    dateFormat: yup.string()
        .required(errorMsg({ name: 'Date Format', type: 'required' })),
    currencies: yup.array()
        .min(1, 'Must have at least one Currency')
        .required(errorMsg({ name: 'Currencies', type: 'required' })),
    employmentStatus: yup.array()
        .min(1, 'Must have at least one Employment Status')
        .required(errorMsg({ name: 'Employment Status', type: 'required' })),
    trainingCategories: yup.array()
        .min(1, 'Must have at least one Training Categories')
        .required(errorMsg({ name: 'Training Categories', type: 'required' })),
    modeOfEmployment: yup.array()
        .min(1, 'Must have at least one Mode Of Employment')
        .required(errorMsg({ name: 'Mode Of Employment', type: 'required' })),
    leaveTypes: yup.array()
        .min(1, 'Must have at least one Leave Status')
        .required(errorMsg({ name: 'Leave Status', type: 'required' })),
    jobTitle: yup.array()
        .min(1, 'Must have at least one Job Title')
        .required(errorMsg({ name: 'Job Title', type: 'required' })),
    employeeGrade: yup.array()
        .min(1, 'Must have at least one Employee Grade')
        .required(errorMsg({ name: 'Employee Grade', type: 'required' })),
    role: yup.array()
        .min(1, 'Must have at least one Role')
        .required(errorMsg({ name: 'Role', type: 'required' })),
});

const useAccountSettings = ({dispatch, state, handleNext}) => {
    const {
        control,
        errors,
        register,
        handleSubmit,
        setValue,
    } = useForm({
        mode: 'onBlur',
        // reValidateMode: 'onChange',
        resolver: yupResolver(schema)
    });

    // const { entities, roles, jobTitles, accountSettings, grades, loading, employees } = state;
    // // console.log('roles: ', roles);
    // const employmentStatusList = accountSettings?.employmentStatus ?? [];
    // const modeOfEmploymentList = accountSettings?.modeOfEmployment ?? [];
    console.log(moment().zoneName());
    const timezones = timeZone();
    const dateFormats = dateFormatList();
    const currencies = currencyList();
    const [accountSetting, setAcountSetting] = React.useState({
        id: 0,
        timeZone: moment.tz.guess(),
        dateFormat: '',
        currencies: [],
        employmentStatus: [],
        trainingCategories: [],
        modeOfEmployment: [],
        leaveTypes: [],
        jobTitle: [],
        employeeGrade: [],
        role: [],
    });

//   React.useEffect(() => {
//     dispatch(Actions.getEntities());
//     dispatch(Actions.getRoles());
//     dispatch(Actions.getGrades());
//     dispatch(Actions.getJobTitle());
//     dispatch(Actions.getAccountSettings());
//     dispatch(Actions.getEmployees());
//   }, []);

    const handleCheckedChange = (event) => {
        setChecked(event.target.checked);
    };

    const onSubmit = async() => {
        console.log(accountSetting)
        try {
            const form = { ...accountSetting }
            loading('processing...');
            const { data: { message, success  } } = await api.post('/account_settings', form);
            if(success){
                swal.fire({
                    text: message,
                    icon: 'success'
                });
                setStepper([], 1);
                const dataResponse = localStorage.getItem('login_data');
                const localData = JSON.parse(dataResponse);
                localData.company.regStep = 1;
                localStorage.setItem('login_data', JSON.stringify(localData));
                handleNext();
            }else{
                swal.fire({
                    text: message,
                    icon: 'error'
                });
            }
        } catch (e) {
            swal.fire({
            text: e?.message || 'Something went wrong',
            icon: 'error'
            })
        }
    };

    const validate = () => {
        console.log(accountSetting)
        return !accountSetting.dateFormat || !accountSetting.timeZone || accountSetting.currencies.length === 0 
        || accountSetting.employeeGrade.length === 0 || accountSetting.role.length === 0 || accountSetting.employmentStatus.length === 0
        || accountSetting.jobTitle.length === 0 || accountSetting.trainingCategories.length === 0 || accountSetting.modeOfEmployment.length === 0
        || accountSetting.leaveTypes.length === 0
    }


    const handleDeleteItem = (id) => {
        // dispatch(Actions.deleteEmployee(id))
    };

    const handleAddItem = (id) => {
        // dispatch(Actions.deleteEmployee(id))
    };

    
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

	// const handleNext = () => {
	// 	setActiveStep(prevActiveStep => prevActiveStep + 1);
	// };

  return {
    control,
    errors,
    register,
    handleSubmit,
    setValue,
    onSubmit,
    handleBack,
    handleNext,
    handleCheckedChange,
    timezones,
    dateFormats,
    currencies,
    accountSetting, 
    setAcountSetting,
    validate
  };
};

export default useAccountSettings;