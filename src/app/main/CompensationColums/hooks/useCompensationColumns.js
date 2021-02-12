import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import errorMsg from 'utils/errorMsg';
import {
  addCompensationColumn,
  updateCompensationColumn,
  deleteCompensationColumn,
  OPEN_COMPENSATION_COLUMNS_MODAL,
  CLOSE_COMPENSATION_COLUMNS_MODAL,
  GET_ONE_COMPENSATION_COLUMN
} from '../store/actions';
const schema = yup.object().shape({
  columnName: yup.string(
    errorMsg({
      name: 'Column Name',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Column Name',
      type: 'required',
    })
  )
});

const useCompensationColumns = ({ dispatch, state }) => {
  const {
    errors,
    handleSubmit,
    register,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const handleDelete = (id) => {
    dispatch(deleteCompensationColumn(id));
  };

  const handleOpen = () => {
    dispatch({
      type: OPEN_COMPENSATION_COLUMNS_MODAL,
    });
  };

  const handleClose = () => {
    dispatch({
      type: CLOSE_COMPENSATION_COLUMNS_MODAL
    });
  }

  const getCompensationColumDetails = (data) => {
    dispatch({
      type: GET_ONE_COMPENSATION_COLUMN,
      payload: data
    })
  };

  const onSubmit = (value) => {
    if(state.type === 'details') {
      dispatch(updateCompensationColumn({
        id: state.details.id,
        value,
      }));
      return;
    }
    dispatch(addCompensationColumn(value));
  };

  return {
    handleClose,
    handleOpen,
    getCompensationColumDetails,
    onSubmit,
    handleDelete,
    errors,
    handleSubmit,
    register,
  }
};

export default useCompensationColumns;