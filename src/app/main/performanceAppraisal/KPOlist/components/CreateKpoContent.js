import SideModal from 'app/shared/modal/SharedModal';
import React from 'react';
import Input from 'app/shared/TextInput/Input';
import Card from '@material-ui/core/Card';
import { CardContent, CardHeader } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';
import useKpoContentList from '../hooks/useKpoContent';
import { Controller } from 'react-hook-form';

const CreateKpoContent = ({customHook}) => {
  const { open, handleCloseModal, register, errors, handleSubmit, onSubmit, control, kpoCategory, pipEligibility } = customHook;
  return (
    <SideModal
      title='Add KPO Content'
      open={open}
      handleClose={handleCloseModal}
    >
          <div className="flex-col flex">
            <div>
            <Typography variant="subtitle2" className="my-6">
              KPO Category
            </Typography>
            <Typography variant="body2" className="my-6">
              TEstdnkjndjnkjfd kdfnfd
            </Typography>
            </div>
            </div>
            <Typography variant="subtitle2" className="my-6 mt-4">
              Description
            </Typography>
            <Typography variant="body2" className="my-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qui autem esse poteris, 
              nisi te amor ipse ceperit? Atque haec ita iustitiae propria sunt, ut sint virtutum reliquarum communia. 
              Sed ea mala virtuti magnitudine obruebantur. Sic vester sapiens magno aliquo emolumento commotus cicuta, 
              si opus erit, dimicabit. Tu vero, inquam, ducas licet, si sequetur; Duo Reges: constructio interrete. Sic, 
              et quidem diligentius saepiusque ista loquemur inter nos agemusque communiter. Pudebit te, inquam, illius tabulae, 
              quam Cleanthes sane commode verbis depingere solebat.
            </Typography>
            <Typography variant="subtitle2" className="my-6">
             Target
            </Typography>
            <Typography variant="body2" className="my-6">
              Annually
            </Typography>
            <Typography variant="subtitle2" className="my-6">
              PIP Target
            </Typography>
            <Typography variant="body2" className="my-6">
              100%
            </Typography>
      <form onSubmit={handleSubmit(onSubmit())}>
        <Controller
          control={control}
          name='kpoCategoryId'
          as={
            <SelectTextField
              label='KPO Category'
              className='my-10'
              error={errors.kpoCategoryId}
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
          }
        />
        
        <Input
          name='kpoDescription'
          label='Description'
          className='my-16'
          multiline
          error={errors.kpoDescription}
          message={errors.kpoDescription?.message}
          refs={register}
        />
        <Input
          className='my-16'
          name='target'
          label='Target'
          error={errors.target}
          message={errors.target?.message}
          refs={register}
          type='text'
        />
        {pipEligibility && (
          <Input
            className='my-16'
            name='kpoPipTarget'
            label='PIP Target'
            error={errors.kpoPipTarget}
            message={errors.kpoPipTarget?.message}
            refs={register}
            type='number'
          />
        )}
        <SharedButton
          variant='contained'
          color='primary'
          type='submit'
          className='flex mx-auto'
        >
          Create
        </SharedButton>
      </form>
    </SideModal>
  );
};

export default CreateKpoContent;