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
import AddQuestionModal from './addQuestionModal';
import QuestionTable from './QuestionTable';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import { Link, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

function Question(props) {
	const dispatch = useDispatch();
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const rows = useSelector(({ checkList }) => checkList.question.data);
    const pageLayout = useRef(null);
    const checkListID = parseInt(props.match.params.id);
    const checkListType = props.match.params.type;

    useEffect(() => {
        dispatch(Actions.getAllQuestions(checkListID));
    }, [dispatch]);
    
	function handleDelete(event, id){
        dispatch(Actions.deleteQuestion(id, checkListID));
    }

    function handleEdit(event, model){
        let payload = {};
        payload.question = model.question;
        payload.checkListId = checkListID;
        // console.log(payload);
        dispatch(Actions.updateQuestion(payload, model.id));
    }

    const columns = [
        {
            id: 's/n',
            align: 'left',
            disablePadding: false,
            label: 'S/N',
            sort: true
        },
        {
            id: 'question',
            align: 'left',
            disablePadding: false,
            label: 'Question',
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
                                <span className="text-24 mx-16">{checkListType} Questions</span>
                            </FuseAnimate>
						<div className="flex flex-1 items-end">
							<FuseAnimate animation="transition.expandIn" delay={600}>
								<AddQuestionModal id={checkListID}/>
							</FuseAnimate>
						</div>
                        </div>
						<Typography
							className="absolute bottom-0 ltr:left-0 rtl:right-0 mx-16 mt-10 z-999"
							component={Link}
							role="button"
							to="/training/checklist"
							color="inherit"
						>
							<span className="mx-10">
								<Icon className="text-20">{'arrow_back_ios'}</Icon> Back
							</span>
						</Typography>
					</div>
			</ThemeProvider>
			}
			content={<QuestionTable title={""} type="default" handleDelete={handleDelete} handleEdit={handleEdit} columns={columns} rows={rows} props={props}/>}
			ref={pageLayout}
			innerScroll
		/>
	);
}

export default withReducer('checkList', reducer)(Question);