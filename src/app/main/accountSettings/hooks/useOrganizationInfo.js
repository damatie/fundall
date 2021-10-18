import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import swal from 'sweetalert2';
import errorMsg from 'utils/errorMsg';
import api from 'app/services/api';
import loading from 'utils/loading';
import companyTypes from "app/shared/companyTypes";
import *  as RegionActions from 'app/store/actions/regions.actions'
import { setStepper } from '../components/setStepper';
// import * as Actions from '../store/actions';

const schema = yup.object().shape({
    type: yup.string()
        .required(errorMsg({ name: 'Company Type', type: 'required' })),
    startDate: yup.string()
        .required(errorMsg({ name: 'Company Start Date', type: 'required' })),
    noOfBranch: yup.number(errorMsg({ name: 'Number Of Branches', type: 'number' }))
        .min(0)
        .required(errorMsg({ name: 'Number Of Branches', type: 'required' })),
    email: yup.string()
        .matches(/^[A-Za-z\d@$!%*#?&]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/, "Enter a valid Email Address")
        .required(errorMsg({ name: 'Email Address', type: 'required' }))
        .email(),
    country: yup.string()
        .required(errorMsg({ name: 'Country', type: 'required' })),
    state: yup.string()
        .required(errorMsg({ name: 'State', type: 'required' })),
    city: yup.string()
        .required(errorMsg({ name: 'City', type: 'required' })),
    vision: yup.string(errorMsg({ name: 'Company Vision', type: 'string' })),
    mission: yup.string(errorMsg({ name: 'Company Mission', type: 'string' })),
    website: yup.string(errorMsg({ name: 'Company Website', type: 'string' })),
    address: yup.string(errorMsg({ name: 'HQ Address', type: 'string' })),
    branchAddress: yup.array(),
    primaryPhoneNo: yup.string().required(errorMsg({
        name: "Primary Phone Number",
        type: "required"
    })),
    secondaryPhoneNo: yup.string().required(errorMsg({
        name: "Secondary Phone Number",
        type: "required"
    }))
        // .min(1, 'Must have at least one Branch Address')
        // .required(errorMsg({ name: 'Branch Addresses', type: 'required' })),
});

const useOrganizationInfo = ({dispatch, state, handleNext}) => {
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

    const { countries, states, cities } = state;
    // // console.log('roles: ', roles);
    // const employmentStatusList = accountSettings?.employmentStatus ?? [];
    // const modeOfEmploymentList = accountSettings?.modeOfEmployment ?? [];
    
    const companyTypeList = companyTypes();
    const [organizationInfo, setOrganizationInfo] = React.useState({
        type: '',
        startDate: '',
        noOfBranch: 0,
        email: '',
        country: '',
        state: '',
        city: '',
        vision: '',
        mission: '',
        website: '',
        address: '',
        branchAddress: [],
        primaryPhoneNo: '',
        secondaryPhoneNo: ''
    });
    const [logo, setLogo] = React.useState({});

    React.useState(() => {
        dispatch(RegionActions.getCountries());
      }, []);

    const handleCheckedChange = (event) => {
        setChecked(event.target.checked);
    };

    const convertFileToBase64 = (fileData) => {
		return new Promise((resolve, reject) => {
			var reader = new FileReader();
			reader.onload = function(){
				var arrayBuffer = this.result;
				// console.log(arrayBuffer);
				resolve(arrayBuffer);
			}
			reader.readAsDataURL(fileData);
		});
	}

    const onSubmit = async() => {
        console.log(organizationInfo)
        const form = { ...organizationInfo }
        let formData = new FormData();
        for (let i = 0; i < Object.keys(form).length; i++) {
            console.log(Object.keys(form)[i])
            formData.append(`${Object.keys(form)[i]}`, form[Object.keys(form)[i]]);
        }
        formData.append("logo", logo[0]);
        console.log('Form Values: ', form);
        console.log('FormData: ', formData);
        try {
            loading('processing...');
            // const config = {
            //     headers: {
            //         'content-type': 'multipart/form-data'
            //     }
            // }
            // api.defaults.headers.contentType = 'multipart/form-data';
            const { data: { message, success } } = await api.post('/organizationInfo', formData);
            if(success){
                await setStepper([], 2);
                const dataResponse = localStorage.getItem('login_data');
                const localData = JSON.parse(dataResponse);
                console.log('Org. localData: ', localData);
                localData.company.regStep = 2;
                localStorage.setItem('login_data', JSON.stringify(localData));
                swal.fire({
                    text: message,
                    icon: 'success'
                });
                handleNext();
            }else{
                swal.fire({
                    text: message,
                    icon: 'error'
                });
            }
        } catch (e) {
            console.log('Error Message: ', e?.message)
            swal.fire({
            text: e?.message || 'Something went wrong',
            icon: 'error'
            })
        }
    };

    const validate = () => {
        console.log(organizationInfo)
        return !organizationInfo.type || !organizationInfo.startDate || organizationInfo.noOfBranch === 0 
        || !organizationInfo.email || !organizationInfo.country || !organizationInfo.state || !organizationInfo.city
    }


    const handleDeleteItem = (id) => {
        // dispatch(Actions.deleteEmployee(id))
    };

    const getStates = (value) => {
        dispatch(RegionActions.getStates(value));
    }

    const getCitites = (value) => {
        dispatch(RegionActions.getCitites(value));
    }

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
    companyTypeList,
    countries, 
    states, 
    cities,
    organizationInfo, 
    setOrganizationInfo,
    getStates,
    getCitites,
    validate,
    logo,
    setLogo,
    convertFileToBase64
  };
};

export default useOrganizationInfo;