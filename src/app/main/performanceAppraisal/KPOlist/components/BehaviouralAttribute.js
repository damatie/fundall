import React from 'react';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import BehaviouralAttributeList from './BehaviouralAttributeList';
import Typography from '@material-ui/core/Typography';
import useBehaviouralAttribute from '../hooks/useBehaviouralAttribute';

const BehaviouralAttribute = () => {
  const { data, loading, singleData } = useSelector(state => state.kpo.behaviouralAttribute);
  const dispatch = useDispatch();
  const { handleGetOneBehaviouralAttribute } = useBehaviouralAttribute({ data, loading, singleData }, dispatch)
  React.useEffect(() => {
    dispatch(Actions.getAllBehaviouralAttribute());
  }, []);

  return (
    <Paper variant="outlined" className='w-full flex flex-col mx-auto p-20'>
      <section className='w-1/4'>
        <SelectTextField
          label='Select Behavioural Attribute'
          onChange={ev => handleGetOneBehaviouralAttribute([ev.target.value])}
          value={singleData[0]?.name}
        >
          {
            data.map(item => (
              <MenuItem value={{...item}} key={item.id}>
                {item.name}
              </MenuItem>
            ))
          }
        </SelectTextField>
      </section>
      <>
          { singleData.map(item => (
            <div key={item.id}>
              <Typography variant="h6" color="initial" className='my-10 font-semibold'>{item.name}</Typography>
              {
                item.content.map(result => (
                  <BehaviouralAttributeList data={result} config={{
                    type: 'new'
                  }}/>
                ))
              }
            </div>
          ))}
      </>
      
    </Paper>
  );
};

export default BehaviouralAttribute;