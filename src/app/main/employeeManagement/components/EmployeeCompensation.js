import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePicker } from '@material-ui/pickers';
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
import * as Actions from 'app/main/employeeManagement/store/actions';
import withReducer from 'app/store/withReducer';
import employeesReducer from 'app/main/employeeManagement/store/reducers/employees.reducer';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100%',
		overflowY: 'scroll',
		flexDirection: 'column',
		margin: '0rem auto',
		padding: '5rem',
		'& form': {
			width: '100%'
		}
	},
	container: {
		margin: '2rem 0',
		width: '100%',
		padding: '4rem',
		borderRadius: '2rem',
		backgroundColor: '#fff',
		boxShadow: '0 .5rem 2rem rgba(0,0,0,0.1)',
		textAlign: 'left'
	},
	gridContainer: {
		width: '100%'
	},
	card: {
		marginTop: '2rem',
		padding: '2rem',
		borderRadius: '2rem',
		backgroundColor: '#fff',
		boxShadow: '0 .5rem 2rem rgba(0,0,0,0.1)',
		position: 'relative'
	},
	floatingEditIcon: {
		position: 'absolute',
		top: '2rem',
		right: '2rem'
	},
}));

function EmployeeCompensation({ customHook }) {

	const dispatch = useDispatch();
	
	const classes = useStyles();
    const {
        setContentSelectedItem,
        contentSelectedItem,
        compensations,
        onSubmit
    } = customHook;

    React.useEffect(() => {
        setContentSelectedItem({
            ...contentSelectedItem,
            compensation: compensations?.map((comp) => {
                return {
                    name: comp.name,
                    value: (Number(comp.value) / 100) * Number(contentSelectedItem?.grossAnnualSalary).toFixed(2)
                }
            })
        })
    }, [compensations]);

	console.log('contentSelectedItem: ', contentSelectedItem);


	return (
		<div className={classes.root}>
			<div>
				<Typography variant="h5" color="initial" className="my-10">
					<strong>Employee Compensation</strong>
				</Typography>
				<Typography variant="body1" color="initial" className="my-10">
					<strong>Add and Edit employee compensation details here</strong>
				</Typography>
				<Grid container spacing={3} justify="space-between" align="center" style={{ marginBottom: '3rem' }}>
                        <Grid item lg={3} md={3} sm={3} xs={3}>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Grid container spacing={3} justify="space-between" align="center" className={classes.container}>
                                <Grid item lg={7} md={7} sm={7} xs={7}>
                                    <Typography variant="subtitle2" color="initial" className="my-10">
                                        Input employee gross annual salary
                                    </Typography>
                                    <Input
                                        name="grossSalary"
                                        type="number"
                                        className="w-full"
                                        // defaultValue={contentSelectedItem?.grossAnnualSalary}
                                        value={Number(Number(contentSelectedItem?.grossAnnualSalary)?.toFixed(2))}
                                        // error={errors.departmentName}
                                        // message={errors.departmentName?.message}
                                        disabled={true}
                                        // onChange={(ev) => {
                                        //     setContentSelectedItem({
                                        //         ...contentSelectedItem,
                                        //         grossAnnualSalary: Number(ev.target.value)?.toFixed(2),
                                        //         monthlyGross: (ev.target.value / 12).toFixed(2),
                                        //         compensation: compensations.map((comp) => {
                                        //             return {
                                        //                 name: comp.name,
                                        //                 value: (Number(comp.value) / 100) * Number(ev.target.value).toFixed(2)
                                        //             }
                                        //         })
                                        //     })
                                        // } }
                                        // label="Department Name"
                                        // refs={register}
                                    />
                                </Grid>
                                {contentSelectedItem?.compensation && contentSelectedItem?.compensation?.map((compensation, index) => 
                                    (
                                        <Grid key={index} item lg={12} md={12} sm={12} xs={12}>
                                            <Input
                                                name={compensation?.name}
                                                type="number"
                                                className="my-10"
                                                value={(contentSelectedItem?.compensation[index]?.value)}
                                                // error={errors.departmentName}
                                                // message={errors.departmentName?.message}
                                                onChange={(ev) => {
                                                    console.log(ev.target.value)
                                                    let comp = contentSelectedItem?.compensation;
                                                    comp[index] = {
                                                        name: comp[index].name,
                                                        value: Number(ev.target.value)
                                                    }
                                                    console.log({comp})
                                                    setContentSelectedItem({
                                                        ...contentSelectedItem,
                                                        compensation: comp,
                                                        grossAnnualSalary: Number((contentSelectedItem?.compensation.map(c => Number(c.value)).reduce((a, b) => a + b))?.toFixed(2)),
                                                        monthlyGross: Number((contentSelectedItem?.compensation.map(c => Number(c.value)).reduce((a, b) => a + b) / 12)?.toFixed(2))
                                                    })
                                                    // setTimeout(() => {
                                                    //     setContentSelectedItem({
                                                    //         ...contentSelectedItem,
                                                    //         compensation: contentSelectedItem?.compensation,
                                                    //         grossAnnualSalary: Number((contentSelectedItem?.compensation.map(c => Number(c.value)).reduce((a, b) => a + b))?.toFixed(2)),
                                                    //         monthlyGross: Number((contentSelectedItem?.compensation.map(c => Number(c.value)).reduce((a, b) => a + b) / 12)?.toFixed(2))
                                                    //     })
                                                    // }, 3500)
                                                }}
                                                label={compensation?.name}
                                                // refs={register}
                                            />
                                        </Grid>
                                    ))}
                                <Grid item lg={7} md={7} sm={7} xs={7}>
                                    <Typography variant="subtitle2" color="initial" className="my-10">
                                        Employee Gross Salary
                                    </Typography>
                                    <Input
                                        name="monthlyGross"
                                        type="number"
                                        className="w-full"
                                        disabled={true}
                                        // defaultValue={Number(contentSelectedItem?.monthlyGross)}
                                        value={Number(Number(contentSelectedItem?.monthlyGross)?.toFixed(2))}
                                        // error={errors.departmentName}
                                        // message={errors.departmentName?.message}
                                        // onChange={(ev) => {
                                        //     setContentSelectedItem({
                                        //         ...contentSelectedItem,
                                        //         monthlyGross: ev.target.value,
                                        //         grossAnnualSalary: (Number(ev.target.value) * 12)?.toFixed(2),
                                        //         compensation: compensations.map((comp) => {
                                        //             return {
                                        //                 name: comp.name,
                                        //                 value: ((Number(comp.value) / 100) * Number(ev.target.value) * 12)?.toFixed(2)
                                        //             }
                                        //         })
                                        //     })
                                        // } }
                                        // label="Department Name"
                                        // refs={register}
                                    />
                                </Grid>

                                <Grid container spacing={3} justify="center" align="center" className="my-10">
                                    <Button variant="contained" type="button" color="primary" onClick={() => onSubmit()}>
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={3} md={3} sm={3} xs={3}>
                        </Grid>
                    </Grid>
			</div>
		</div>
	);
}

withReducer('employeeMgt', employeesReducer)(EmployeeCompensation);
export default EmployeeCompensation;
