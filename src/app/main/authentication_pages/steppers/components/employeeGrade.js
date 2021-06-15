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
import { FormHelperText } from "@material-ui/core";
import Modal from './modal';

const schema = yup.object().shape({
    entity: yup.string(errorMsg({ name: 'Entity', type: 'string' }))
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
    entityAddresses: yup.array()
        .min(1, 'Must have at least one Entity Addresses')
        .required(errorMsg({ name: 'Entity Addresses', type: 'required' })),
});

export default function EmployeeGradeModal ({open, setOpen, edit, data}) {
    
    const { register, handleSubmit, formState:{ errors }, setValue, getValues } = useForm({
        mode: "all",
        reValidateMode: 'onChange',
        resolver: yupResolver(schema)
    });

    const dispatch = useDispatch();
    const [entityAddresses, setEntityAddresses] = React.useState([]);
    const [entityAddressesErr, setEntityAddressesErr] = React.useState("");

    React.useEffect(() => {
        setEntityAddressesErr(errors.entityAddresses?.message);
      }, [errors]);

      const handleAddEntityAddresses = (chip) => {
        register({ name: 'entityAddresses', type: 'custom' }, { required: true });
        entityAddresses.push(chip)
        setValue("entityAddresses", entityAddresses);
        setEntityAddressesErr(errors.entityAddresses?.message);
        console.log('data: ', JSON.stringify({...getValues()}));
      };
    
      const handleDeleteEntityAddresses = (chip, index) => {
        register({ name: 'entityAddresses', type: 'custom' }, { required: true });
        let entityAddressesData = entityAddresses;
        entityAddressesData.splice(index, 1);
        setEntityAddresses(entityAddressesData);
        setValue("entityAddresses", entityAddressesData);
        setEntityAddressesErr(errors.entityAddresses?.message);
      };

    const onSubmit = async (value) => {
        if (edit === false) {
            try {
                loading('Adding Employee Grade...');
                const { data: { message  } } = await api.post('/auth/employee/change_password', value);
                swal.fire({
                    text: message,
                    icon: 'success'
                });
                setOpen(false);
            } catch (e) {
                swal.fire({
                    text: catchErrorMsg(e),
                    icon: 'error'
                })
            }
        } else {
            try {
                loading('Updating Employee Grade...');
                const { data: { message  } } = await api.patch('/auth/employee/change_password', value);
                swal.fire({
                    text: message,
                    icon: 'success'
                });
                setOpen(false);
            } catch (e) {
                swal.fire({
                    text: catchErrorMsg(e),
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
                    name='entity'
                    // type='text'
                    // multiline
                    // rows="4"
                    error={errors.entity}
                    message={errors.entity?.message}
                    helperText={errors.entity?.message}
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
                    error={errors.employeeCode}
                    message={errors.employeeCode?.message}
                    helperText={errors.employeeCode?.message}
                    refs={register}
                />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Input
                    // required
                    label='Description'
                    name='Description'
                    type='text'
                    multiline
                    rows="4"
                    error={errors.description}
                    message={errors.description?.message}
                    helperText={errors.description?.message}
                    refs={register}
                />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <ChipInput
                    label='Entity Addresses (Separate with Comma / Enter)'
                    name='entityAddresses'
                    variant= 'outlined'
                    newChipKeyCodes={[188]}
                    style={{ width: '100%'}}
                    error={errors.entityAddresses}
                    message={errors.entityAddresses?.message}
                    helperText={errors.entityAddresses?.message}
                    // type='text'
                    // multiline
                    // rows="6"
                    allowDuplicates={false}
                    value={entityAddresses}
                    onAdd={(chip) => handleAddEntityAddresses(chip)}
                    onDelete={(chip, index) => handleDeleteEntityAddresses(chip, index)}
                />
                <FormHelperText style={{ color: 'red'}}>{entityAddressesErr}</FormHelperText>
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
