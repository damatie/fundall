import React from 'react';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import BehaviouralAttributeList from './BehaviouralAttributeList';
import Typography from '@material-ui/core/Typography';
import useBehaviouralAttribute from '../hooks/useBehaviouralAttribute';
import SharedButton from 'app/shared/button/SharedButton';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';

const BehaviouralAttribute = ({ kpoDetails, role }) => {
  const { data, loading, singleData } = useSelector(state => state.kpo.behaviouralAttribute);
  const dispatch = useDispatch();
  const { handleChange, handleSubmit } = useBehaviouralAttribute({ data, loading, singleData }, dispatch, kpoDetails);

  React.useEffect(() => {
    if (kpoDetails.behavioralAttributes) {
      dispatch(Actions.updateBehaviouralAttribute(kpoDetails.behavioralAttributes?.behavioralAttributes));
      return;
    }
    dispatch(Actions.getAllBehaviouralAttribute());
  }, []);

  return (
    <>
      {
        loading ? (
          <section className='w-full flex flex-col mx-auto p-20'>
            <Skeleton animation='wave' width='100%' height='350px' variant='rect' />
          </section>
        ) : (
            <Paper variant="outlined" className='w-full flex flex-col mx-auto p-20'>

              <>
                { data.map(item => (
                  <div key={item?.id}>
                    <Typography variant="h6" color="initial" className='my-10 font-semibold'>{item.title}</Typography>
                    {/* <Typography variant="body1" color="initial">{item.description}</Typography> */}
                    {
                      item.contents.map(result => (
                        <BehaviouralAttributeList role={role} handleChange={handleChange} headerId={item.id} data={result} config={{
                          type: 'new'
                        }} />
                      ))
                    }
                    <Divider />
                  </div>
                ))}
              </>
              {
                role === 'linemanager' && (
                  <SharedButton
                    variant='contained'
                    className='my-10 w-1/4 flex flex-col justify-center self-center'
                    color='primary'
                    onClick={handleSubmit}
                  >
                    Save
                  </SharedButton>
                )
              }
            </Paper>
          )
      }
    </>

  );
};

export default BehaviouralAttribute;