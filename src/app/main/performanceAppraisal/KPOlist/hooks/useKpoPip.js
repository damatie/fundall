import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import errorMsg from 'utils/errorMsg';
import { calculatePip } from '../store/actions';
import userRole from 'utils/userRole';

const schema = yup.object().shape({
  compensationComponent: yup.string(
    errorMsg({
      name: 'Compensation Type',
      type: 'string'
    })
  ).required(
    errorMsg({
      name: 'Compensation Type',
      type: 'required'
    })
  ),
  amount: yup.number(
    errorMsg({
      name: 'Amount',
      type: 'string'
    })
  ).required(
    errorMsg({
      name: 'Amount',
      type: 'required'
    })
  ),
});

const useKpoPip = ({dispatch, state, role}) => {
  const {
    errors,
    register,
    handleSubmit,
    control
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit = (model) => {
    dispatch(calculatePip({model, id: state.id}))
  };

  return {
    errors,
    register,
    handleSubmit,
    onSubmit,
    control,
    pipEligible: state.pipEligible,
    role: userRole(role),
  }
};

export default useKpoPip;