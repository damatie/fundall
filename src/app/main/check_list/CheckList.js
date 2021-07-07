import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import withReducer from 'app/store/withReducer';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddCheckListModal from './addCheckListModal';
import CheckListTable from './CheckListTable';
import * as Actions from './store/actions';
import reducer from './store/reducers';

function CheckList(props) {
    const dispatch = useDispatch();
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const rows = useSelector(({ checkList }) => checkList.checkList.data);
    const pageLayout = useRef(null);

    useEffect(() => {
        dispatch(Actions.getAllCheckLists());
    }, [dispatch]);

    function handleDelete(event, id) {
        dispatch(Actions.deleteCheckList(id))
    }

    function handleEdit(event, model) {
        // // console.log(model)
        dispatch(Actions.updateCheckList(model, model.id));
    }

    // // console.log(rows);

    const columns = [
        {
            id: 's/n',
            align: 'left',
            disablePadding: false,
            label: 'S/N',
            sort: true
        },
        {
            id: 'type',
            align: 'left',
            disablePadding: false,
            label: 'Type',
            sort: true
        },
        {
            id: 'createdAt',
            align: 'left',
            disablePadding: false,
            label: 'Created Time',
            sort: true
        },
        {
            id: 'updatedAt',
            align: 'left',
            disablePadding: false,
            label: 'Updated Time',
            sort: true
        },
        {
            id: 'option',
            align: 'left',
            disablePadding: false,
            label: 'Option',
            sort: false
        }
    ];
    return (
        <FusePageSimple
            classes={{
                root: 'bg-red',
                header: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
                sidebarHeader: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
                rightSidebar: 'w-320'
            }}
            header={
                <ThemeProvider theme={mainTheme}>
                    <div className="flex flex-col flex-1 p-8 sm:p-12 relative">
                        <div className="flex items-center w-full">
                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                <Icon className="text-32">announcement</Icon>
                            </FuseAnimate>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <span className="text-24 mx-16">Check List Management</span>
                            </FuseAnimate>
                        </div>
                        <div className="flex flex-1 items-end">
                            <FuseAnimate animation="transition.expandIn" delay={600}>
                                <AddCheckListModal />
                            </FuseAnimate>
                        </div>
                    </div>
                </ThemeProvider>
            }
            content={<CheckListTable title={""} type="default" handleDelete={handleDelete} handleEdit={handleEdit} columns={columns} rows={rows} props={props} />}
            ref={pageLayout}
            innerScroll
        />
    );
}

export default withReducer('checkList', reducer)(CheckList);