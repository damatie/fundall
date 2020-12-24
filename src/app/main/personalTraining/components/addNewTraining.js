import { AppBar, Button, Dialog, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Toolbar, Typography } from '@material-ui/core'
import { DateTimePicker } from '@material-ui/pickers'
import CurrencyInput from 'app/shared/TextInput/CurrencyInput';
import React, { useEffect, useState } from 'react'

const AddNewTrainingDialogue = ({ open, handleClose, entities, departments, categories, roles, submit, update, changeDepartment, data }) => {

    const [formstate, setFormstate] = useState({
        department: "",
        category: "",
        entity: "",
        jobRole: "",
        name: "",
        cost: "",
        description: "",
        employeeGrade: "",
        companySeniority: 0,
        industrySeniority: 0,
        certification: false,
        startDate: new Date(),
        endDate: new Date(),
        state: "",
        country: "",
        trainingCategoryId: 0
    });
    const [canBeSubmitted, setCanBeSubmitted] = useState(false)

    const handleChange = (name, value) => {
        if (name === "entity") {
            let id = entities.find(element => element.name = value);
            changeDepartment(id.id);
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

        setFormstate({ ...formstate, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let payload = formstate;
        payload.cost = Number(payload.cost);
        payload.industrySeniority = Number(payload.industrySeniority);
        payload.companySeniority = Number(payload.companySeniority);

        // console.log(payload, e);
        if (data) {
            update(payload, data.id)
        } else {
            submit(payload);
        }

        setFormstate({});
        handleClose();
    }

    useEffect(() => {
        if (data) {
            // console.log(data, departments.length > 0)
            if (departments.length > 0) {
                setFormstate({
                    department: data.department,
                    category: data.category,
                    entity: data.entity,
                    jobRole: data.jobRole,
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
    }, [data, departments])

    useEffect(() => {
        if (formstate.entity) {
            setFormstate({ formstate });
        }

        // console.log(formstate, departments);
    }, [departments, data])

    // useEffect(() => {
    //     //reload when data changes
    // }, [data])

    useEffect(() => {
        if (Object.entries(formstate).length !== "") {
            setCanBeSubmitted(true)
        }
    }, [formstate])

    return (
        <Dialog open={open} onClose={() => { handleClose(); setFormstate({}); }} fullWidth>
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
                        value={formstate?.name}
                        className="w-full mb-24"
                    />

                    <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="category-label-placeholder"> Category </InputLabel>
                        <Select
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

                    {/* <TextField
                        id="outlined-secondary"
                        type="text"
                        variant="outlined"
                        onChange={(e) => handleChange("department", e.target.value)}
                        label="Department"
                        className="w-full mb-24"
                    /> */}

                    <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="jobRole-label-placeholder"> Job Role </InputLabel>
                        <Select
                            value={formstate?.jobRole}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            input={
                                <OutlinedInput labelWidth={'jobRole'.length * 9} name="jobRole" id="jobRole-label-placeholder" />
                            }
                        >
                            {roles?.map(role => (
                                <MenuItem value={role.name} key={Math.random()}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="category-label-placeholder"> Employee Grade </InputLabel>
                        <Select
                            value={formstate?.employeeGrade}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            input={
                                <OutlinedInput labelWidth={'employeeGrade'.length * 9} name="employeeGrade" id="employeeGrade-label-placeholder" />
                            }
                        >
                            <MenuItem value="">
                                <em> All </em>
                            </MenuItem>
                            {["SpringRock", "5cee", "CBit"].map(category => (
                                <MenuItem value={category} key={Math.random()}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}

                    {/* <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="industrySenority-label-placeholder"> Industrial Seniority </InputLabel>
                        <Select
                            value={formstate?.industrySeniority}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            input={
                                <OutlinedInput labelWidth={'industrySenority'.length * 9} name="industrySenority" id="industrySenority-label-placeholder" />
                            }
                        >
                            <MenuItem value="all">
                                <em> All </em>
                            </MenuItem>
                            {["SpringRock", "5cee", "CBit"].map(category => (
                                <MenuItem value={category} key={Math.random()}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}

                    {/* <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="companySenority-label-placeholder"> Company Seniority </InputLabel>
                        <Select
                            value={formstate?.companySeniority}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            input={
                                <OutlinedInput labelWidth={'companySenority'.length * 9} name="companySenority" id="companySenority-label-placeholder" />
                            }
                        >
                            <MenuItem value="all">
                                <em> All </em>
                            </MenuItem>
                            {["SpringRock", "5cee", "CBit"].map(category => (
                                <MenuItem value={category} key={Math.random()}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}

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
                        className="w-full mb-24"
                    />

                    <DateTimePicker
                        label="Start"
                        inputVariant="outlined"
                        value={formstate?.startDate}
                        onChange={date => handleChange("startDate", date)}
                        className="mt-8 mb-16 w-full"
                        format={'MMMM Do, YYYY hh:mm a'}
                    />

                    <DateTimePicker
                        label="End"
                        inputVariant="outlined"
                        value={formstate?.endDate}
                        onChange={date => handleChange("endDate", date)}
                        className="mt-8 mb-16 w-full"
                        format={'MMMM Do, YYYY hh:mm a'}
                    />

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
                    />

                    {/* <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="country-label-placeholder"> Country </InputLabel>
                        <Select
                            value={"Nigeria"}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            input={
                                <OutlinedInput labelWidth={'country'.length * 9} name="country" id="country-label-placeholder" />
                            }
                        >
                            <MenuItem value="all">
                                <em> All </em>
                            </MenuItem>
                            {["Nigeria", "Gambia"].map(category => (
                                <MenuItem value={category} key={Math.random()}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}

                    {/* <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="state-label-placeholder"> State </InputLabel>
                        <Select
                            value={"Enugu"}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            input={
                                <OutlinedInput labelWidth={'state'.length * 9} name="state" id="state-label-placeholder" />
                            }
                        >
                            <MenuItem value="all">
                                <em> All </em>
                            </MenuItem>
                            {["Enugu"].map(category => (
                                <MenuItem value={category} key={Math.random()}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}

                    <CurrencyInput

                        id="outlined-secondary"
                        type="number"
                        values={formstate?.cost}
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
