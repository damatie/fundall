import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button, Paper } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';



const department = [
    "Human Resources",
    "Finance",
    "media",
    "concierge"
];

const group = [
    "Company policy survey group",
    "Manager performance survey group",
    "Network performance survey group",
    "Employee work life balance survey group",
]



function CreateSurvey({setCreateSurveyModal}) {

    const [departments, setDepartments] = useState([])
    const [groups, setGroups] = useState([])
    const [chipData, setChipData] = useState([])
    const [individuals, setIndividuals] = useState([])
    const [individual, setIndividual] = useState("")

    const handleChange = (event) => {
        setDepartments(event.target.value)
    }

    const handleChangeGroup = (event) => {
        setGroups(event.target.value)
    }


    const handleChangeIndividuals = (event) => {
        setIndividuals(event.target.value)
        setChipData(event.target.value)
    }


    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        setDepartments(value);
        setChipData(value)
      };

    const handleChangeMultipleGroup = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        setGroups(value);
        setChipData(value)
      };

      const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
      };


    return (
        <div className="fixed top-0 right-0 w-full h-full overflow-y-hidden bg-opacity-100 bg-black">
        <div className="bg-gray-100 pb-48 flex-col overflow-y-scroll flex h-full right-0 top-10 absolute w-8/12 pt-64">
            <div className="bg-blue-900 text-3xl text-white flex justify-between items-center p-20">
                <h3 className="text-2xl">Create Survey</h3>
                <CloseRoundedIcon className="cursor-pointer" onClick={()=>setCreateSurveyModal(false)} />
            </div>
            <h2 className="py-10 w-10/12 mx-auto">Create New  Audience/Groups</h2>
            <div className="h-full w-9/12 mt-8 mx-auto">
                <form className="bg-white shadow-md p-28 rounded-lg">
                    <TextField
                        label="Survey Name"
                        id="outlined-margin-normal"
                        defaultValue=""
                        className="inline-block p-1 mb-24"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        fullWidth
                        className="mb-16"
                        defaultValue=""
                        variant="outlined"
                    />
                    <div className="w-full flex items-center justify-between mb-16">
                        <FormControl className="w-1/3">
                            <InputLabel id="demo-mutiple-checkbox-label">Departments</InputLabel>
                            <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            multiple
                            value={departments}
                            onChange={handleChange}
                            input={<Input />}
                            renderValue={(selected) => selected.join(', ')}
                            div
                            >
                            {department.map((dept) => (
                                <MenuItem key={dept} value={dept}>
                                <Checkbox checked={departments.indexOf(dept) > -1} />
                                <ListItemText primary={dept} />
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        <FormControl className="w-1/3">
                            <InputLabel id="demo-mutiple-checkbox-label">Groups</InputLabel>
                            <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            multiple
                            value={groups}
                            onChange={handleChangeGroup}
                            input={<Input />}
                            renderValue={(selected) => selected.join(', ')}
                            div
                            >
                            {group.map((groupItem) => (
                                <MenuItem key={groupItem} value={groupItem}>
                                <Checkbox checked={groups.indexOf(groupItem) > -1} />
                                <ListItemText primary={groupItem} />
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </div>
                    <TextField id="outlined-basic" label="Individual's email" variant="outlined" onChange={handleChangeIndividuals} fullWidth className="mb-24" />

                    <TextField label="Survey Participants" className="w-full rounded-md border-gray-900 border-8 mb-16">
                        <Paper component="ul" className="block w-full bg-green-300 border">
                            {chipData.map((data) => {
                                let icon;
                                return (
                                <li key={data.key}>
                                    <Chip
                                    icon={icon}
                                    label={data.label}
                                    onDelete={handleDelete(data)}
                                    />
                                </li>
                                );
                            })}
                        </Paper>
                    </TextField>
                    <div className="w-full flex items-center justify-between mb-16">
                        <FormControl className="w-1/3">
                            <InputLabel id="demo-mutiple-checkbox-label">Departments</InputLabel>
                            <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            multiple
                            value={departments}
                            onChange={handleChange}
                            input={<Input />}
                            renderValue={(selected) => selected.join(', ')}
                            div
                            >
                            {department.map((dept) => (
                                <MenuItem key={dept} value={dept}>
                                <Checkbox checked={departments.indexOf(dept) > -1} />
                                <ListItemText primary={dept} />
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        <FormControl className="w-1/3">
                            <InputLabel id="demo-mutiple-checkbox-label">Groups</InputLabel>
                            <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            multiple
                            value={groups}
                            onChange={handleChangeGroup}
                            input={<Input />}
                            renderValue={(selected) => selected.join(', ')}
                            div
                            >
                            {group.map((groupItem) => (
                                <MenuItem key={groupItem} value={groupItem}>
                                <Checkbox checked={groups.indexOf(groupItem) > -1} />
                                <ListItemText primary={groupItem} />
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </div>
                    <TextField id="outlined-basic" label="Individual's email" variant="outlined" onChange={handleChangeIndividuals} fullWidth className="mb-24" />

                    <TextField label="Who can see response/reporting?" className="w-full rounded-md border-gray-900 border-8 mb-16">
                        <Paper component="ul" className="block w-full bg-green-300 border">
                            {chipData.map((data) => {
                                let icon;
                                return (
                                <li key={data.key}>
                                    <Chip
                                    icon={icon}
                                    label={data.label}
                                    onDelete={handleDelete(data)}
                                    />
                                </li>
                                );
                            })}
                        </Paper>
                    </TextField>

                    <div className="w-full flex items-center justify-center">
                        <Button
                            variant="contained"
                            color="secondary"
                            className="px-28 py-8  mr-20 text-base"
                        >
                            submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default CreateSurvey
