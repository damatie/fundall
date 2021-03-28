import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import SharedDropzone from 'app/shared/sharedDropZone';
import {
  createNhfForm,
  createMalariaPPA,
  updateNhfForm,
  updateMalariaPPA
} from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import useUserID from '../hooks/useUserID';
import { useLocation, useParams } from 'react-router-dom';
import downloadLink from 'utils/downloadLink';

const { useState, useMemo, useEffect } = React;

const UploadForms = ({ title, data, type }) => {

  const {
    employeeInfo: {
      info,
    },
    uploadForms: {
      nhf,
      malaria
    },
  } = useSelector(state => state.onboardingForms);

  const [state, setState] = useState({});

  const [value, setValue] = useState({});

  const inputs = useMemo(() => [
    {
      label: 'Employee Name',
      value: `${info.firstName} ${info.lastName}`,
    },
    {
      label: 'Email',
      value: info.email
    },
    {
      label: 'Entity',
      value: info.entity.entityName
    },
    {
      label: 'Department',
      value: info.department.departmentName
    },
    {
      label: 'Phone Number',
      value: info.phoneNumber
    },
    {
      label: 'Start Date',
      value: info.startDate
    },
    {
      label: 'Status',
      value: state?.formUrl
    }
  ], [info, state]);

  const {
    id
  } = useUserID();

  const location = useLocation();

  const [url, setUrl] = useState({});

  const [fileName, setFileName] = useState('');

  useEffect(() => {
    setFileName(`${title}(${info.firstName}-${info.lastName}).jpg`)
  }, [info]);

  const params = useParams();

  useEffect(() => {
    switch (type) {
      case 'nhf':
        setState(nhf.data);
        break;
      case 'malaria':
        setState(malaria.data);
        break;
      default:
        setState({});
        break;
    }
  }, [malaria, nhf]);

  useEffect(() => {
    setUrl(
      !!state?.formUrl ? { link: '#', name: 'View Document' } : { link: `${window.location.origin}/library/folders/`, name: 'Download Document' }
    );
    console.log(state);
  }, [state])

  const handleDownload = () => {
    downloadLink(state?.formUrl, fileName);
  }

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const formData = new FormData();
    switch (type) {
      case 'nhf':
        formData.append('nhfForm', value[0]);
        if (Object.entries(nhf.data).length > 0) {
          dispatch(updateNhfForm({ formData, id }));
          return;
        }
        dispatch(createNhfForm({ formData, id }));
        break;
      case 'malaria':
        formData.append('malariaAttestationForm', value[0]);
        if (Object.entries(malaria.data).length > 0) {
          dispatch(updateMalariaPPA({ formData, id }));
          return;
        }
        dispatch(createMalariaPPA({ formData, id }));
        break;
      default:
        return null;
    }
  };

  return (
    <section className='text-center'>
      <header>
        <Typography className='my-16' variant="h5" color="initial"><b>{title}</b></Typography>
      </header>
      {
        inputs.map(({ label, value }, i) => (
          <Typography variant="subtitle1" color="initial" className='text-left'>
            <b>{label}</b>:&nbsp;{label !== 'Status' && value}
            {label === 'Status' && (
              <>
                {
                  url.link === '#' ? (
                    <Button
                      className='mx-auto my-16'
                      variant="contained"
                      color="primary"
                      onClick={handleDownload}
                    >
                      {url.name}
                    </Button>
                  ) : (
                    <a href={url.link} target='_blank' className='cursor-pointer'>{url.name}</a>
                  )
                }
              </>
            )}
          </Typography>
        ))
      }
      {
        !(!!params?.id) && (
          <section>
            <Typography variant="body1" color="initial" className='my-16'>
              {`UPLOAD ${title}`}
            </Typography>
            <SharedDropzone setValue={setValue} />
            <Button
              className='mx-auto w-4/12 my-16'
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
        </Button>
          </section>
        )
      }
    </section>
  );
};

export default UploadForms;