import SharedModal from 'app/shared/modal/SharedModal';
import React from 'react';
import SharedDropzone from 'app/shared/sharedDropZone';
import SharedButton from 'app/shared/button/SharedButton';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployeeInfo } from '../store/actions';
import Typography from '@material-ui/core/Typography';
import userPermission from '../logic/userPermission';

const { useState } = React;

const Signature = ({ value }) => {
  const [update, setUpdate] = useState(false);
  const [signature, setSignature] = useState({
    value: {},
    error: false
  });
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const authState = useSelector(state => state.auth.user);

  const {
    employeeInfo: {
      info: { employeeId }
    }
  } = useSelector(state => state.employeeInformation);

  const { canDelete, canEdit, canAdd } = userPermission({
    role: authState.role,
    userId: authState.id,
    profileId: employeeId,
  });

  const handleUpdate = () => {
    setUpdate((prev) => !prev);
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
    setSignature({ value: {}, error: false });
  }

  const handldeChange = (value) => {
    // console.log(value);
    setSignature({ value: value[0], error: false });
  };

  const handleSave = () => {
    if (Object.entries(signature.value).length > 0) {
      const formData = new FormData();
      formData.append('signature', signature.value)
      dispatch(updateEmployeeInfo({
        id: value.id,
        value: formData
      }));
      handleUpdate();
      return;
    }
    setSignature((prev) => ({ ...prev, error: true }));
  }

  return (
    <section className='w-full flex justify-end'>
      <SharedButton
        variant="contained"
        className='w-3/12 my-6'
        color="secondary"
        onClick={handleOpen}
      >
        Signature
      </SharedButton>
      <SharedModal
        open={open}
        handleClose={handleOpen}
        title="Signature"
      >
        <section>
          <header className='w-full flex flex-row justify-end'>
            {canAdd() && (<SharedButton
              variant="contained"
              className='w-5/12'
              color="secondary"
              onClick={handleUpdate}
            >
              {update ? 'Cancel' : 'Update'}
            </SharedButton>)}
          </header>
          <section className='m-8'>
            {
              update ? (
                <>
                  <SharedDropzone
                    setValue={handldeChange}
                  />
                  {signature.error && (<Typography variant="subtitle1" className="text-red font-bold" color="initial">Please upload your signature</Typography>)}
                  <SharedButton
                    variant="contained"
                    className='w-1/2 my-6 flex flex-col mx-auto'
                    color="secondary"
                    onClick={handleSave}
                  >
                    Save
                  </SharedButton>
                </>
              ) : (
                <img
                  src={value.signature}
                  alt="signature"
                  style={{
                    width: '200px',
                    display: 'flex',
                    margin: '.5rem auto'
                  }}
                />
              )
            }
          </section>
        </section>
      </SharedModal>
    </section>
  );
};

export default Signature;