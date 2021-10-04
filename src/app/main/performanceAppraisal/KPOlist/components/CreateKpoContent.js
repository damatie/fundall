import SideModal from 'app/shared/modal/SideModal';
import React from 'react';
import Input from 'app/shared/TextInput/Input';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';
import AddIcon from '@material-ui/icons/Add';
import KpoPreList from './KpoPreList';
import useKpoContentList from '../hooks/useKpoContent';
import { Controller } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

const CreateKpoContent = ({customHook}) => {
  const { open, handleCloseModal, register, errors, handleSubmit, onSubmit, control, kpoCategory, pipEligibility, handleAddList, contentList, contentSelectedItem, setContentSelectedItem } = customHook;
  // console.log(errors);
  // console.log(contentSelectedItem.target);
  return (
    <SideModal
      title='Add KPO Content'
      open={open}
      handleClose={handleCloseModal}
    >
      <KpoPreList customHook={customHook}/>

      <form onSubmit={handleSubmit()}>
          <SelectTextField
            label='KPO Category'
            className='my-10'
            control={control}
            name='kpoCategoryId'
            id='kpoCategoryId'
            error={errors.kpoCategoryId}
            onChange={ (ev) => setContentSelectedItem({
              ...contentSelectedItem,
              kpoCategoryId: parseInt(ev.target.value)
            })}
            value={contentSelectedItem?.kpoCategoryId}
            message={errors.kpoCategoryId?.message}
          >
            {kpoCategory.map(item => {
              if(item.status.toUpperCase() === 'ACTIVE') {
                return (
                  <MenuItem value={item.id}>
                    {item.name}
                  </MenuItem>
                )
              }
            })}
          </SelectTextField>
        
        <Input
          name='kpoDescription'
          id='kpoDescription'
          label='Description'
          className='my-16'
          value = {contentSelectedItem?.kpoDescription}
          onChange={ (ev) => setContentSelectedItem({
            ...contentSelectedItem,
            kpoDescription: ev.target.value
          })}
          multiline
          maxLength={100}
          error={errors.kpoDescription}
          message={errors.kpoDescription?.message}
          refs={register}
        />
        <Input
          className='my-16'
          name='target'
          id='target'
          label='Target'
          value={contentSelectedItem?.target}
          onChange={ (ev) => setContentSelectedItem({
            ...contentSelectedItem,
            target: ev.target.value
          })}
          error={errors.target}
          message={errors.target?.message}
          refs={register}
          type='number'
        />
        {pipEligibility && (
          <Input
            className='my-16'
            name='kpoPipTarget'
            id='kpoPipTarget'
            label='PIP Target'
            value={contentSelectedItem?.kpoPipTarget}
            onChange={ (ev) => setContentSelectedItem({
              ...contentSelectedItem,
              kpoPipTarget: parseInt(ev.target.value)
            })}
            error={errors.kpoPipTarget}
            message={errors.kpoPipTarget?.message}
            refs={register}
            type='number'
          />
        )}

          <SharedButton
            variant='contained'
            color='secondary'
            type='button'
            startIcon={<AddIcon/>}
            disabled={Object.keys(errors).length !==0 || contentList.length >= 20 || !contentSelectedItem.kpoPipTarget || ! contentSelectedItem.target|| ! contentSelectedItem.kpoDescription|| ! contentSelectedItem.kpoCategoryId}
            onClick={(ev) => {handleAddList(contentSelectedItem)}}
          >
            ADD NEW
          </SharedButton>
        <SharedButton
          variant='contained'
          color='primary'
          type='button'
          className='flex mx-auto'
          disabled={!contentList.length }
          onClick={(ev) => {onSubmit()}}
        >
          SUBMIT
        </SharedButton>
      </form>
      {/* <Button onClick={() => {console.log('Add Method Here')}} variant="contained" color="secondary">
        <span style={{ marginRight: '5px' }}><AddBoxOutlinedIcon/></span> Add New
      </Button> */}
    </SideModal>
  );
};

export default CreateKpoContent;
