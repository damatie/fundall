import { AppBar, Button, Dialog, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Toolbar, Typography } from '@material-ui/core'
// import { FormatListBulletedOutlined } from '@material-ui/icons';
import { DateTimePicker, DatePicker } from '@material-ui/pickers'
import CurrencyInput from 'app/shared/TextInput/CurrencyInput';
import React, { useEffect, useState } from 'react'
import * as Actions from 'app/store/actions';
import { SelectFormsy } from '@fuse/core/formsy';
import { useSelector, useDispatch } from 'react-redux';
import Formsy from 'formsy-react';


const AddNewTrainingDialogue = ({ open, handleClose, entities, departments, categories, roles, submit, update, changeDepartment, data }) => {

    const [formstate, setFormstate] = useState({
        department: "",
        category: "",
        entity: "",
        jobTitle: "",
        name: "",
        cost: "",
        description: "",
        employeeGrade: "",
        companySeniority: '0',
        industrySeniority: "0",
        certification: false,
        startDate: "",
        endDate: "",
        state: "",
        country: "",
        trainingCategoryId: 0
    });
    const dispatch = useDispatch();
    const [country, setCountry] = useState([]);
    const [canBeSubmitted, setCanBeSubmitted] = useState(false);
    const [errorEndDate, setErrorEndDate] = useState("Select End Date");
    const [errorStartDate, setErrorStartDate] = useState("Select Start Date");
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const state = useSelector(({ regions }) => regions.states.map(state => state.name));

    const handleChange = (name, value) => {
        if (value) console.log(value);

        if (name === "entity") {
            let id = entities.find(element => element.name = value);
            changeDepartment(id.id);
        }

        else if (name === "endDate") {
            if (!formstate.startDate) {
                setErrorEndDate("must select a start date");
                setTimeout(() => {
                    setErrorEndDate("")
                }, 2000);
                return;
            }
        }

        else if (name === "category") {
            let id = entities.find(element => element.name = value);
            let courseData = { trainingCourseId: data?.id }
            if (data) {
                setFormstate({ ...formstate, trainingCategoryId: id.id, [name]: value, ...courseData });
            }
            else {
                setFormstate({ ...formstate, trainingCategoryId: id.id, [name]: value });
            }
            return;
        }

        else if (name === "country") {
            getState(value);
        }

        setFormstate(formstate => ({ ...formstate, [name]: value }));
    }

    const getState = (country) => {
        dispatch(Actions.getStates(country));
    }

    useEffect(() => {
        if (country.length > 0) return;
        fetch('https://restcountries.eu/rest/v2/all')
            .then(res => res.json())
            .then(res => {
                setCountry(res.map(country => country.name));
            })
            .catch(err => console.log(err))
    }, [country])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Date.parse(formstate.startDate) >= Date.parse(formstate.endDate)) {
            setErrorStartDate("Start date cannot be greater than the end date");
            return
        } else if (formstate.name?.length < 10) {
            setTitleError("Minimum required length is 10");
            return;
        } else if (formstate.name?.length > 25) {
            setTitleError("Maximum required length is 25");
            return;
        }
        else if (formstate.description?.length < 25) {
            setDescriptionError("Minimum required length is 25");
            return;
        }

        let payload = formstate;
        payload.cost = Number(payload.cost);
        payload.industrySeniority = Number(payload.industrySeniority);
        payload.companySeniority = Number(payload.companySeniority);

        // console.log(payload);
        if (data) {
            update(payload, data.id)
        } else {
            submit(payload);
        }

        setFormstate({});
        handleClose();
    }

    useEffect(() => {
        if (formstate?.name?.length > 25) { setTitleError("") }
    }, [formstate?.name]);

    useEffect(() => {
        if (formstate?.description?.length > 25) { setDescriptionError("") }
    }, [formstate?.description]);

    useEffect(() => {
        if (data) {
            // console.log(data, departments.length > 0)
            if (departments.length > 0) {
                setFormstate({
                    department: data.department,
                    category: data.category,
                    entity: data.entity,
                    jobTitle: data.jobTitle,
                    name: data.name,
                    cost: data.cost,
                    description: data.description,
                    employeeGrade: data.employeeGrade,
                    companySeniority: data.companySeniority,
                    industrySeniority: data.industrySeniority,
                    certification: data.certification,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    state: data.state,
                    country: data.category,
                    trainingCourseId: data.id
                });
            }
            else {
                let id = entities.find(element => element.name = data.entity);
                if (id) {
                    changeDepartment(id.id);
                }
            }
        }
    }, [data, departments]);

    useEffect(() => {
        if (formstate.entity) {
            setFormstate(formstate);
        }
        // console.log(formstate, departments);
    }, [departments, data]);

    useEffect(() => {
        //reload when data changes
    }, [data]);

    useEffect(() => {
        if (Object.values(formstate).includes("")) {
            // console.log(formstate);
            setCanBeSubmitted(false)
        } else {
            setCanBeSubmitted(true)
        }
    }, [formstate]);

    const persistedData = {
        department: "",
        category: "",
        entity: "",
        jobTitle: "",
        name: "",
        cost: "",
        description: "",
        employeeGrade: "",
        companySeniority: '0',
        industrySeniority: "0",
        certification: false,
        startDate: "",
        endDate: "",
        state: "",
        country: "",
        trainingCategoryId: 0
    };

    return (
        <Dialog open={open} onClose={() => { handleClose(); setFormstate(persistedData); }} fullWidth>
            <AppBar position="static">
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {data ? "Update Training Request" : 'New Training Request'}
                    </Typography>
                </Toolbar>
            </AppBar>
            <form noValidate onSubmit={ev => handleSubmit(ev)}>
                <DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>

                    <TextField
                        id="outlined-secondary"
                        type="text"
                        variant="outlined"
                        onChange={(e) => handleChange("name", e.target.value)}
                        label="Course Title"
                        required
                        value={formstate?.name}
                        className="w-full mb-24"
                        error={Boolean(titleError)}
                        helperText={titleError}
                    />

                    <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="category-label-placeholder"> Category </InputLabel>
                        <Select
                            required
                            value={formstate?.category}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            input={
                                <OutlinedInput labelWidth={'category'.length * 9} name="category" id="category-label-placeholder" />
                            }
                        >
                            {categories?.map(category => (
                                <MenuItem value={category.name} key={Math.random()}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="entity-label-placeholder"> Entity </InputLabel>
                        <Select
                            value={formstate?.entity}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            input={
                                <OutlinedInput labelWidth={'entity'.length * 9} name="entity" id="entity-label-placeholder" />
                            }
                        >
                            {entities.map(entity => (
                                <MenuItem value={entity.entityName} key={Math.random()}>
                                    {entity.entityName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="department-label-placeholder"> Department </InputLabel>
                        <Select
                            value={formstate?.department}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            input={
                                <OutlinedInput labelWidth={'department'.length * 9} name="department" id="department-label-placeholder" />
                            }
                        >
                            {departments?.map(department => (
                                <MenuItem value={department.departmentName} key={Math.random()}>
                                    {department.departmentName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="jobTitle-label-placeholder"> Job Role </InputLabel>
                        <Select
                            value={formstate?.jobTitle}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            input={
                                <OutlinedInput labelWidth={'jobTitle'.length * 9} name="jobTitle" id="jobTitle-label-placeholder" />
                            }
                        >
                            {roles?.map(role => (
                                <MenuItem value={role.name} key={Math.random()}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        id="outlined-secondary"
                        type="text"
                        variant="outlined"
                        value={formstate?.employeeGrade}
                        onChange={(e) => handleChange("employeeGrade", e.target.value)}
                        label="Employee Grade"
                        className="w-full mb-24"
                    />

                    <TextField
                        id="outlined-secondary"
                        type="number"
                        variant="outlined"
                        value={formstate?.industrySeniority}
                        onChange={(e) => handleChange("industrySeniority", e.target.value)}
                        label="Industry Senority"
                        className="w-full mb-24"
                    // helperText={"must be more than 25 characters"}
                    />

                    <TextField
                        id="outlined-secondary"
                        type="number"
                        variant="outlined"
                        value={formstate?.companySeniority}
                        onChange={(e) => handleChange("companySeniority", e.target.value)}
                        label="Company Senority"
                        className="w-full mb-24"
                    />

                    <TextField
                        id="outlined-secondary"
                        type="text"
                        variant="outlined"
                        value={formstate?.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        label="Decription"
                        required
                        error={Boolean(descriptionError)}
                        className="w-full mb-24"
                        helperText={descriptionError}
                    />

                    <DatePicker
                        label="Start"
                        inputVariant="outlined"
                        disablePast
                        value={formstate?.startDate}
                        onChange={date => handleChange("startDate", date)}
                        className="mt-8 mb-16 w-full"
                        format={'MMMM Do, YYYY'}
                        helperText={!formstate?.startDate ? errorStartDate : ""}
                        // error={Boolean(errorStartDate)}
                        error={formstate?.startDate ? false : true}
                    // maxDate={formstate.endDate > formstate.startDate}
                    />

                    <DatePicker
                        label="End"
                        // disablePast
                        inputVariant="outlined"
                        value={formstate?.endDate}
                        onChange={date => handleChange("endDate", date)}
                        className="mt-8 mb-16 w-full"
                        format={'MMMM Do, YYYY'}
                        minDate={formstate?.startDate}
                        error={formstate?.endDate ? false : true}
                        helperText={!formstate?.endDate ? errorEndDate : ""}
                    />

                    <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="country-label-placeholder">Country </InputLabel>
                        <Select
                            value={formstate?.country}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            input={
                                <OutlinedInput labelWidth={'country'.length * 9} name="country" id="country-label-placeholder" />
                            }
                        >
                            {country.map(item => (
                                <MenuItem value={item} key={Math.random()}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="state-label-placeholder">State </InputLabel>
                        <Select
                            value={formstate?.state}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            input={
                                <OutlinedInput labelWidth={'state'.length * 9} name="state" id="state-label-placeholder" />
                            }
                        >
                            {state.map(item => (
                                <MenuItem value={item} key={Math.random()}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                    {/* <SelectFormsy
                            className="mb-16"
                            name={"country"}
                            label={"Country"}
                            variant="outlined"
                            required
                            requiredError='Must not be None'
                            value={formstate["country"]}
                            onChange={(e) => handleChange("country", e.target.value)}
                        >
                            {country.map((item, i) => (
                                <MenuItem value={item} key={i}>{item}</MenuItem>
                            ))}
                        </SelectFormsy>

                        <SelectFormsy
                            className="mb-16"
                            name={"country"}
                            label={"Country"}
                            variant="outlined"
                            required
                            requiredError='Must not be None'
                            value={formstate["state"]}
                            onChange={(e) => handleChange("state", e.target.value)}
                        >
                            {state.map((item, i) => (
                                <MenuItem value={item} key={i}>{item}</MenuItem>
                            ))}
                        </SelectFormsy> */}

                    {/* 
                    <TextField
                        id="outlined-secondary"
                        type="text"
                        value={formstate?.country}
                        variant="outlined"
                        onChange={(e) => handleChange("country", e.target.value)}
                        label="Country"
                        className="w-full mb-24"
                    />

                    <TextField
                        id="outlined-secondary"
                        type="text"
                        value={formstate?.state}
                        variant="outlined"
                        onChange={(e) => handleChange("state", e.target.value)}
                        label="State"
                        className="w-full mb-24"
                    /> */}

                    <CurrencyInput
                        id="outlined-secondary"
                        type="number"
                        values={formstate?.cost}
                        name="cost"
                        values={formstate.cost}
                        variant="outlined"
                        handleChange={(e) => handleChange("cost", e.target.value)}
                        label="Training Cost"
                        className="w-full mb-24"
                    />

                </DialogContent>
                <DialogActions className="justify-between m-10 px-24 pb-12 sm:px-16">
                    <Button variant="contained" color="primary" type="submit" disabled={!canBeSubmitted}>
                        {data ? "Update Training" : "Add New Training"}
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </form>
        </Dialog >
    )
}

export default AddNewTrainingDialogue
