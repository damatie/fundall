import FusePageCarded from '@fuse/core/FusePageCarded';
import _ from '@lodash';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from './store/actions';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Icon, Typography } from '@material-ui/core';
import NewExitRequest from './shared/exitRequestTab';
import { NavLink } from 'react-router-dom';


function CreateOpening(props) {
    const dispatch = useDispatch();
    // const classes = useStyles(props);

    useEffect(() => {
        // dispatch(Actions.getEntities());
    }, [])

    return (
        <FusePageCarded
            classes={{
                toolbar: 'p-0',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={
                <div className="flex flex-1 w-full items-center justify-between">
                    <div className="flex flex-col items-start max-w-full">
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Typography
                                className="normal-case flex items-center sm:mb-12"
                                color="inherit"
                            >
                                <Icon
                                    className="text-20 text-black bg-white rounded-20"
                                    component={NavLink}
                                    to={"/exit/home"}
                                    role="button"
                                >
                                    {"arrow_back"}
                                </Icon>
                                <span className="mx-4 text-20 ml-16">Exit Form</span>
                            </Typography>
                        </FuseAnimate>
                    </div>
                </div>
            }
            content={
                <div className=" sm:p-24 ">
                    <NewExitRequest />
                </div>
            }
            innerScroll
        />
    );
}

export default withReducer('createOpening', reducer)(CreateOpening);
