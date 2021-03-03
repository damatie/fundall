import React from 'react';
import SharedButton from 'app/shared/button/SharedButton';
import Input from 'app/shared/TextInput/Input';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import { DatePicker } from '@material-ui/pickers';
import { Controller } from 'react-hook-form';

const GradeAndPromotionForm = ({
  form: {
    handleSubmit,
    errors,
    register,
    control,
    onSubmit,
  },
  data: { 
    jobTitle,
    employeeGrade,
    single
  }
}) => {
  const inputs = React.useMemo(() => [
    {
      name: 'jobTitleId',
      label: 'Job Title',
      type: 'select',
      defaultValue: single?.jobTitleId,
      className: 'my-20',
      data: jobTitle,
      fieldName: 'name'
    },
    {
      name: 'employeeGradeId',
      label: 'Employee Grade',
      type: 'select',
      defaultValue: single?.employeeGradeId,
      className: 'my-20',
      data: employeeGrade,
      fieldName: 'gradeName'
    },
    {
      name: 'dateOfPromotion',
      label: 'Date of Promotion',
      type: 'date',
      defaultValue: single?.dateOfPromotion,
      className: 'my-20'
    }
  ], [employeeGrade, jobTitle, single]);

  return (
    <form onSubmit={handleSubmit(onSubmit(single?.id))}>
      { inputs.map((input) => {
        if (input.type === 'date') {
          return (
            <Controller
              control={control}
              defaultValue={input.defaultValue}
              name={input.name}
              as={
                <DatePicker
                  inputVariant="outlined"
                  inputRef={register}
                  label={input.label}
                  className="w-full my-20"
                  value={input.defaultValue}
                  // maxDate={dob}
                  format={'MMMM Do, YYYY'}
                  error={errors[input.name]}
                  helperText={errors[input.name]?.message}
                // disabled={!shouldUpdate}
                />
              }
            />
          )
        }
        if (input.type === 'select') {
          return (
            <div className="w-full my-20">
              <Controller
              name={input.name}
              control={control}
              rules={{ required: true }}
              defaultValue={input.defaultValue}
              as={
                <SelectTextField
                  name={input.name}
                  label={input.label}
                  error={errors[input.name]}
                  message={errors[input.name]?.message}
                  defaultValue={input.defaultValue}
                  refs={register}

                >
                  {input.data.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                    >
                      {item[input.fieldName]}
                    </MenuItem>
                  ))}
                </SelectTextField>
              }
            />
            </div>
          )
        }
        return (
          <Input
            {...input}
            error={errors[input.name]}
            message={errors[input.name]?.message}
            refs={register}
          />
        )
      })}
      <SharedButton
        type='submit'
        variant='contained'
        color='secondary'
        className='flex mx-auto'
      >
        Create
      </SharedButton>
    </form>
  );
};

export default GradeAndPromotionForm;