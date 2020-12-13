import { AppBar, Button, Dialog, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Toolbar, Typography } from '@material-ui/core'
import { DateTimePicker } from '@material-ui/pickers'
import CurrencyInput from 'app/shared/TextInput/CurrencyInput';
import React, { useEffect, useState } from 'react'

const AddNewTrainingDialogue = ({ open, handleClose }) => {

    const [formstate, setFormstate] = useState({});
    const [canBeSubmitted, setCanBeSubmitted] = useState(false)

    const handleChange = (name, value) => {
        setFormstate({ ...formstate, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formstate);
    }

    useEffect(() => {
        if (Object.entries(formstate).length !== "") {
            setCanBeSubmitted(true)
        }
    }, [formstate])

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <AppBar position="static">
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {'New Training Request'}
                    </Typography>
                </Toolbar>
            </AppBar>
            <form noValidate onSubmit={ev => handleSubmit(ev)}>
                <DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>

                    <TextField
                        id="outlined-secondary"
                        type="text"
                        variant="outlined"
                        onChange=""
                        label="Course Title"
                        className="w-full mb-24"
                    />

                    <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="category-label-placeholder"> Category </InputLabel>
                        <Select
                            value={"Software"}
                            // onChange={handleFilter}
                            input={
                                <OutlinedInput labelWidth={'department'.length * 9} name="department" id="department-label-placeholder" />
                            }
                        >
                            <MenuItem value="all">
                                <em> All </em>
                            </MenuItem>
                            {["Software", "IT"].map(category => (
                                <MenuItem value={category} key={Math.random()}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="category-label-placeholder"> Entity </InputLabel>
                        <Select
                            value={"SpringRock"}
                            // onChange={handleFilter}
                            input={
                                <OutlinedInput labelWidth={'department'.length * 9} name="department" id="department-label-placeholder" />
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
                    </FormControl>

                    <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="category-label-placeholder"> Department </InputLabel>
                        <Select
                            value={"SpringRock"}
                            // onChange={handleFilter}
                            input={
                                <OutlinedInput labelWidth={'department'.length * 9} name="department" id="department-label-placeholder" />
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
                    </FormControl>

                    <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="category-label-placeholder"> Job Role </InputLabel>
                        <Select
                            value={"SpringRock"}
                            // onChange={handleFilter}
                            input={
                                <OutlinedInput labelWidth={'department'.length * 9} name="department" id="department-label-placeholder" />
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
                    </FormControl>

                    <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="category-label-placeholder"> Employee Grade </InputLabel>
                        <Select
                            value={"SpringRock"}
                            // onChange={handleFilter}
                            input={
                                <OutlinedInput labelWidth={'department'.length * 9} name="department" id="department-label-placeholder" />
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
                    </FormControl>

                    <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="category-label-placeholder"> Industrial Seniority </InputLabel>
                        <Select
                            value={"SpringRock"}
                            // onChange={handleFilter}
                            input={
                                <OutlinedInput labelWidth={'department'.length * 9} name="department" id="department-label-placeholder" />
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
                    </FormControl>

                    <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="category-label-placeholder"> Company Seniority </InputLabel>
                        <Select
                            value={"SpringRock"}
                            // onChange={handleFilter}
                            input={
                                <OutlinedInput labelWidth={'department'.length * 9} name="department" id="department-label-placeholder" />
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
                    </FormControl>

                    <TextField
                        id="outlined-secondary"
                        type="text"
                        variant="outlined"
                        onChange=""
                        label="Decription"
                        className="w-full mb-24"
                    />

                    <DateTimePicker
                        label="Start"
                        inputVariant="outlined"
                        value={formstate.start}
                        onChange={date => handleChange("start", date)}
                        className="mt-8 mb-16 w-full"
                        format={'MMMM Do, YYYY hh:mm a'}
                    />

                    <DateTimePicker
                        label="End"
                        inputVariant="outlined"
                        value={formstate.end}
                        onChange={date => handleChange("end", date)}
                        className="mt-8 mb-16 w-full"
                        format={'MMMM Do, YYYY hh:mm a'}
                    />

                    <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="category-label-placeholder"> Country </InputLabel>
                        <Select
                            value={"Nigeria"}
                            // onChange={handleFilter}
                            input={
                                <OutlinedInput labelWidth={'department'.length * 9} name="department" id="department-label-placeholder" />
                            }
                        >
                            <MenuItem value="all">
                                <em> All </em>
                            </MenuItem>
                            {["Software", "IT"].map(category => (
                                <MenuItem value={category} key={Math.random()}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className="flex w-full mb-24" variant="outlined">
                        <InputLabel htmlFor="category-label-placeholder"> State </InputLabel>
                        <Select
                            value={"Enugu"}
                            // onChange={handleFilter}
                            input={
                                <OutlinedInput labelWidth={'department'.length * 9} name="department" id="department-label-placeholder" />
                            }
                        >
                            <MenuItem value="all">
                                <em> All </em>
                            </MenuItem>
                            {["Software", "IT"].map(category => (
                                <MenuItem value={category} key={Math.random()}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <CurrencyInput

                        // id="outlined-secondary"
                        // type="text"
                        // variant="outlined"
                        // onChange=""
                        label="Training Cost"
                        className="w-full mb-24"
                    />

                </DialogContent>
                <DialogActions className="justify-between m-10 px-24 pb-12 sm:px-16">
                    <Button variant="contained" color="primary" type="submit" disabled={!canBeSubmitted}>
                        Add New Training
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddNewTrainingDialogue
