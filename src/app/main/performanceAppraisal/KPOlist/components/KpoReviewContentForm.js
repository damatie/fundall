import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Input from 'app/shared/TextInput/Input';
import Grid from '@material-ui/core/Grid';
import errorMsg from 'utils/errorMsg';
import api from 'app/services/api';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      height: '100%',
      // overflowY: 'scroll',
      flexDirection: 'column',
      margin: '0rem auto',
      padding: '5rem',
      '& form': {
        width: '100%',
      }
    }
}))

const schema = yup.object().shape({
    kpoCategory: yup.number(errorMsg({ name: 'KPO Category', type: 'string' }))
        .required(errorMsg({ name: 'KPO Category', type: 'required' })),
    description: yup.string(errorMsg({ name: 'Description', type: 'string' }))
            .min(2, errorMsg({ name: 'Description', type: 'min', number: 2 }))
            .max(1000, errorMsg({ name: 'Description', type: 'max', number: 1000 })),
    target: yup.string(errorMsg({ name: 'Department Name', type: 'string' }))
        .min(2, errorMsg({ name: 'Department Name', type: 'min', number: 2 }))
        .max(60, errorMsg({ name: 'Department Name', type: 'max', number: 60 }))
        .required(errorMsg({ name: 'Department Name', type: 'required' })),
    pipTarget: yup.string(errorMsg({ name: 'Department Code', type: 'string' }))
        .min(2, errorMsg({ name: 'Department Code', type: 'min', number: 2 }))
        .required(errorMsg({ name: 'Department Code', type: 'required' })),
});

export default function KpoReviewContentForm ({kpoReviewContents, setKpoReviewContents, contentIndex, kpoCategories, data}) {
    
    const { register, handleSubmit, formState:{ errors }, setValue, getValues } = useForm({
        mode: "onBlur",
        reValidateMode: 'onChange',
        resolver: yupResolver(schema)
    });

    const dispatch = useDispatch();
    const [kpoCategory, setKpoCategory] = React.useState(data?.kpoCategory || 0);
    const [kpoCategoryErr, setKpoCategoryErr] = React.useState("");
    const [target, setTarget] = React.useState(data?.target || "");
    const [pipTarget, setPipTarget] = React.useState(data?.pipTarget || "");
    const [description, setDescription] = React.useState(data?.description || "");
    const classes = useStyles();


    React.useEffect(() => {
      register({ name: 'kpoCategory', type: 'custom' }, { required: true });
      setValue("kpoCategory", kpoCategory);
      register({ name: 'description', type: 'custom' }, { required: true });
      setValue("description", description);
      register({ name: 'target', type: 'custom' }, { required: true });
      setValue("target", target);
      register({ name: 'pipTarget', type: 'custom' }, { required: true });
      setValue("pipTarget", pipTarget);
    }, []);


    React.useEffect(() => {
        setKpoCategoryErr(errors.kpoCategory?.message);
      }, [errors]);

      const handleKpoCategoryChange = async (event) => {
        setKpoCategory(event.target.value);
        register({ name: 'kpoCategory', type: 'custom' }, { required: true });
        setValue("kpoCategory", event.target.value);
        setKpoCategoryErr(errors.kpoCategory?.message);
      };

      
    const onSubmit = async (value) => {
        const form = { ...value };
        form.id = data?.id;
        await api.patch(`kpoReview/${data?.id}`, form);
        // replace the index with the new data
        // dispatch(Actions.getKpoReviewContents());         
    };


  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} justify='space-between' align='center' style={{ marginBottom: '2rem', marginTop: '2rem', overflowY: 'scroll'}}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">KPO Category</InputLabel>
                    <Select
                        justify='left'
                        align='left'
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name='kpoCategory'
                        defaultValue={kpoCategory}
                        error={errors.kpoCategory}
                        message={errors.kpoCategory?.message}
                        onChange={handleKpoCategoryChange}
                        label="KPO Category"
                    >
                    {kpoCategories.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                        {item?.kpoCategory}
                    </MenuItem>))}
                    </Select>
                    <FormHelperText style={{ color: 'red'}}>{kpoCategoryErr}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Input
                    label='Description'
                    name='description'
                    type='text'
                    multiline
                    rows="4"
                    defaultValue={description}
                    error={errors.description}
                    message={errors.description?.message}
                    helperText={errors.description?.message}
                    refs={register}
                />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Input
                    name='target'
                    type='text'
                    defaultValue={target}
                    error={errors.target}
                    message={errors.target?.message}
                    label="Target"
                    refs={register}
                />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Input
                    name='pipTarget'
                    type='text'
                    defaultValue={pipTarget}
                    error={errors.pipTarget}
                    message={errors.pipTarget?.message}
                    label="PIP Target"
                    refs={register}
                />
            </Grid>
        </Grid>
        <Grid container spacing={3} justify='left' align='center' className='my-10'>
            <Button variant="contained" type='submit' color="primary" className='mx-20'>
                Save 
            </Button>
            <Button variant="contained" onClick={() => {console.log("reset form")}} >
                Cancel 
            </Button>
        </Grid>
      </form>
    </div>
  );
};
