import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import errorMsg from 'utils/errorMsg';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SINGLE_PROMOTION_HISTORY,
  addPromotionHistory,
  updatePromotionHistory,
  deletePromotionHistory,
} from '../store/actions';

const schema = yup.object().shape({
  jobTitleId: yup.string(
    errorMsg({
      name: 'Job Title',
      type: 'string'
    })
  ).required(
    errorMsg({
      name: 'Job Title',
      type: 'required'
    })
  ),
  employeeGradeId: yup.string(
    errorMsg({
      name: 'Employee Grade',
      type: 'string'
    })
  ).required(
    errorMsg({
      name: 'Employee Grade',
      type: 'required'
    })
  ),
  dateOfPromotion: yup.string(
    errorMsg({
      name: 'Promotion Date',
      type: 'string'
    })
  ).required(
    errorMsg({
      name: 'Promotion Date',
      type: 'required'
    })
  )
});

const usePromotionHistory = ({dispatch, employeeId}) => {
  const {
    handleSubmit,
    errors,
    register,
    control,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (id) => (formData) => {
    if(!!id) {
      dispatch(updatePromotionHistory({id, formData, employeeId}));
      return;
    }
    dispatch(addPromotionHistory({formData, employeeId}));
  };

  const handleOpen = () => dispatch({type: OPEN_MODAL});
  const handleClose = () => dispatch({type: CLOSE_MODAL});
  const getOneData = (data) => dispatch({type: SINGLE_PROMOTION_HISTORY, payload: data});
  const handleDelete = (id) => dispatch(deletePromotionHistory({id,employeeId}));

  return {
    handleSubmit,
    errors,
    register,
    control,
    onSubmit,
    handleOpen,
    handleClose,
    getOneData,
    handleDelete
  };
};

export default usePromotionHistory;