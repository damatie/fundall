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
import { useDispatch } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import ChipInput from "material-ui-chip-input";
import timeZone from "app/shared/timezoneList";
import currencyList from "app/shared/currencies";
import dateFormatList from "app/shared/dateformat";
import *  as Actions from 'app/main/employeeManagement/store/actions';
import { FormHelperText } from "@material-ui/core";
import Modal from './modal';

const schema = yup.object().shape({
    entityName: yup.string(errorMsg({ name: 'Entity', type: 'string' }))
        .min(3, errorMsg({ name: 'Entity', type: 'min', number: 3 }))
        .max(60, errorMsg({ name: 'Entity', type: 'max', number: 60 }))
        .required(errorMsg({ name: 'Entity', type: 'required' })),
    employeeCode: yup.string(errorMsg({ name: 'Employee Code Prefix', type: 'string' }))
        .min(2, errorMsg({ name: 'Employee Code Prefix', type: 'min', number: 3 }))
        .max(60, errorMsg({ name: 'Employee Code Prefix', type: 'max', number: 60 }))
        .required(errorMsg({ name: 'Employee Code Prefix', type: 'required' })),
    description: yup.string(errorMsg({ name: 'Description', type: 'string' }))
    // .min(3, errorMsg({ name: 'Description', type: 'min', number: 3 }))
        .max(1000, errorMsg({ name: 'Description', type: 'max', number: 1000 })),
    address: yup.array()
        .min(1, 'Must have at least one Entity Addresses')
        .required(errorMsg({ name: 'Entity Addresses', type: 'required' })),
});

export default function EntityModal ({open, setOpen, edit, data}) {
    
    const { register, handleSubmit, formState:{ errors }, setValue, getValues } = useForm({
        mode: "all",
        reValidateMode: 'onChange',
        resolver: yupResolver(schema)
    });

    const dispatch = useDispatch();
    // const entityAdd = data?.address !== '' ? JSON.parse(data?.address) : [];
    const [newAdded, setNewAdded] = React.useState(false);
    const [updated, setUpdated] = React.useState(false);
    const [entityAddresses, setEntityAddresses] = React.useState(data?.address || []);
    const [entityAddressesErr, setEntityAddressesErr] = React.useState("");

    React.useEffect(() => {
        dispatch(Actions.getEntities());
      }, [newAdded, updated]);

    React.useEffect(() => {
        setEntityAddressesErr(errors.address?.message);
      }, [errors]);

      const handleAddEntityAddresses = (chip) => {
        register({ name: 'address', type: 'custom' }, { required: true });
        entityAddresses.push(chip)
        setValue("address", entityAddresses);
        setEntityAddressesErr(errors.address?.message);
        // console.log('data: ', JSON.stringify({...getValues()}));
      };
    
      const handleDeleteEntityAddresses = (chip, index) => {
        register({ name: 'address', type: 'custom' }, { required: true });
        let entityAddressesData = entityAddresses;
        entityAddressesData.splice(index, 1);
        setEntityAddresses(entityAddressesData);
        setValue("address", entityAddressesData);
        setEntityAddressesErr(errors.address?.message);
      };

    const onSubmit = async (value) => {
        const form = { ...value};
        // console.log('form: ', form);
        if (edit) {
            try {
                loading('Updating Entity...');
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
                loading('Adding Entity...');
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
      title={edit ? 'Edit Entity' : 'Add Entity'}
      handleClose={() => setOpen(false)}
      open={open}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} justify='space-between' align='center' style={{ marginBottom: '2rem', marginTop: '2rem', overflowY: 'scroll'}}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Input
                    required
                    label='Entity'
                    name='entityName'
                    // type='text'
                    // multiline
                    // rows="4"
                    defaultValue={data.entityName}
                    error={errors.entityName}
                    message={errors.entityName?.message}
                    helperText={errors.entityName?.message}
                    refs={register}
                />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Input
                    required
                    label='Employee Code Prefix'
                    name='employeeCode'
                    // type='text'
                    // multiline
                    // rows="4"
                    defaultValue={data.employeeCode}
                    error={errors.employeeCode}
                    message={errors.employeeCode?.message}
                    helperText={errors.employeeCode?.message}
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
                    defaultValue={data.description}
                    error={errors.description}
                    message={errors.description?.message}
                    helperText={errors.description?.message}
                    refs={register}
                />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <ChipInput
                    label='Entity Addresses (Separate with Enter)'
                    name='address'
                    variant= 'outlined'
                    // newChipKeyCodes={[188]}
                    style={{ width: '100%'}}
                    error={errors.address}
                    message={errors.address?.message}
                    helperText={errors.address?.message}
                    // type='text'
                    // multiline
                    // rows="6"
                    allowDuplicates={false}
                    value={entityAddresses}
                    onAdd={(chip) => handleAddEntityAddresses(chip)}
                    onDelete={(chip, index) => handleDeleteEntityAddresses(chip, index)}
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
