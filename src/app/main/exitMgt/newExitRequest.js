import React, { useEffect, useState } from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory, useLocation } from 'react-router-dom';
// import RequestLoanTab from '../tabs/requestLoanTab';
import reducer from './store/reducers';
import ProgressBtn from 'app/shared/progressBtn';
import Formsy from 'formsy-react';
import { InputAdornment, MenuItem } from '@material-ui/core';
import { SelectFormsy, TextFieldFormsy } from '@fuse/core/formsy';
import * as Actions from './store/actions';
import withReducer from 'app/store/withReducer';

const NewActivity = () => {

    const [state, setState] = useState({
        name: "",
        description: "",
        code: "",
        type: "",
    });

    const theme = useTheme();
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const data = useSelector(({ activity }) => activity.activities.activity);

    const { name, description, code, type } = state;

    const handleSubmit = (model) => {
        if (id) {
            Actions.updateActivity(id, { ...model, ...state }, history);
        } else {
            Actions.createActivity({ ...model, ...state }, history);
        }
    }

    const handleChange = (value, key) => {
        setState((state) => ({ ...state, [key]: value }))
    }

    useEffect(() => {
        if (id && data.hasOwnProperty("name")) {
            const { name, description, code, type } = data;

            setState((state) => ({
                ...state,
                name, description, code, type
            }));
        }
        console.log(data)
    }, [data])

    useEffect(() => {
        if (id) {
            dispatch(Actions.fetchActivity(id));
        }
    }, [id, dispatch])

    if (id && !data.hasOwnProperty("name")) {
        return <p>Loading...</p>
    }

    return (
        <FusePageCarded
            classes={{
                toolbar: 'p-0',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={
                <div className="flex flex-1 w-full items-center justify-between">
                    <div className="flex flex-col items-start max-w-full">
                        <Typography
                            className="normal-case flex items-center sm:mb-12"
                            component={Link}
                            role="button"
                            to={"/activity/list"}
                            color="inherit"
                        >
                            <Icon className="text-20">
                                {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                            </Icon>
                            <span className="mx-4">Back</span>
                        </Typography>
                    </div>

                    <div className="flex items-center max-w-full">
                        <img
                            className="w-32 sm:w-48 rounded"
                            src="assets/images/ecommerce/product-image-placeholder.png"
                            alt={'form.name'}
                        />

                    </div>
                </ div>
            }
            content={
                <div className=" sm:p-24 ">
                    <div className={"w-full"}>
                        <Formsy
                            onSubmit={handleSubmit}
                            className="flex flex-col justify-center w-full"
                        >
                            <div className={"my-24 w-1/2 mx-auto"} >
                                <div className={"w-full"}>
                                    <TextFieldFormsy
                                        className="mb-16 w-full"
                                        type="text"
                                        name="name"
                                        label="Name"
                                        value={name}
                                        onChange={(e) => handleChange(e.target.value, "name")}
                                        // rows='5'
                                        // helperText={"must be more than 10 characters "}
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Icon className="text-20" color="action">
                                                        description
                                                    </Icon>
                                                </InputAdornment>
                                            )
                                        }}
                                        variant="outlined"
                                    />

                                    <TextFieldFormsy
                                        className="mb-16 w-full"
                                        type="text"
                                        name="description"
                                        label="Description"
                                        multiline
                                        onChange={(e) => handleChange(e.target.value, "description")}
                                        value={description}
                                        // rows='5'
                                        required
                                        // helperText={"must be more than 10 characters "}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Icon className="text-20" color="action">
                                                        description
                                                    </Icon>
                                                </InputAdornment>
                                            )
                                        }}
                                        variant="outlined"
                                    />

                                    <TextFieldFormsy
                                        className="mb-16 w-full"
                                        type="text"
                                        name="code"
                                        label="Activity Code"
                                        multiline
                                        value={code}
                                        // rows='5'
                                        required
                                        onChange={(e) => handleChange(e.target.value, "code")}
                                        // helperText={"must be more than 10 characters "}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Icon className="text-20" color="action">
                                                        description
                                                    </Icon>
                                                </InputAdornment>
                                            )
                                        }}
                                        variant="outlined"
                                    />

                                    <SelectFormsy
                                        className="mb-16 w-full"
                                        name="type"
                                        label="Productivity Scale"
                                        // disabled={userCheck}
                                        value={type}
                                        onChange={(e) => handleChange(e.target.value, "type")}
                                        // validations="not-equals:none"
                                        // validationError="requried"
                                        variant="outlined"
                                        defaultValue={""}
                                        // disabled={userCheck}
                                        required
                                    >
                                        {[{ name: "productive" }, { name: "unproductive" }].map(item => (
                                            <MenuItem value={item.name} key={item.name}>{item.name}</MenuItem>
                                        ))}
                                    </SelectFormsy>


                                    <ProgressBtn
                                        // success={loan.success} loading={loan.updating}
                                        // disable={!isFormValid || error}
                                        content={id ? 'Update Activity' : 'Add Activity'}
                                    />

                                </div>
                            </div>
                        </Formsy>
                    </div>
                </div>
            }
            innerScroll
        />
    )
}

export default withReducer('activity', reducer)(NewActivity);