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
import AddCategoryModal from './addCategoryModal';
import CategoryTable from 'app/shared/widgets/CategoryTableWidget'
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

function DocumentCategories() {
	const dispatch = useDispatch();
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const rows = useSelector(({ documentCategories }) => documentCategories.categories.categories);
	const pageLayout = useRef(null);

    useEffect(() => {
        dispatch(Actions.getCategories());
    }, [dispatch]);
    
	function handleDelete(event, id){
        dispatch(Actions.deleteCategory(id))
    }

    function handleEdit(event, model){
        console.log(model)
        dispatch(Actions.updateCategory(model, model.id));
    }

    const columns = [
        {
            id: 's/n',
            align: 'center',
            disablePadding: false,
            label: 'S/N',
            sort: true
        },
        {
            id: 'name',
            align: 'center',
            disablePadding: false,
            label: 'Name',
            sort: true
        },
        {
            id: 'createdAt',
            align: 'center',
            disablePadding: false,
            label: 'Created Time',
            sort: true
        },
        {
            id: 'updatedAt',
            align: 'center',
            disablePadding: false,
            label: 'Updated Time',
            sort: true
        },
        {
            id: 'option',
            align: 'center',
            disablePadding: false,
            label: 'Option',
            sort: true
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
                                <Icon className="text-32">folder</Icon>
                            </FuseAnimate>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <span className="text-24 mx-16">Document Category</span>
                            </FuseAnimate>
                        </div>
						<div className="flex flex-1 items-end">
							<FuseAnimate animation="transition.expandIn" delay={600}>
								<AddCategoryModal />
							</FuseAnimate>
						</div>
					</div>
			</ThemeProvider>
			}
			content={<CategoryTable title={"Category List"} type="default" handleDelete={handleDelete} handleEdit={handleEdit} columns={columns} rows={rows} showEdit={true}/>}
			ref={pageLayout}
			innerScroll
		/>
	);
}

export default withReducer('documentCategories', reducer)(DocumentCategories);
