import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import errorMsg from 'utils/errorMsg';
import React from 'react';
import {getCountries} from 'app/store/actions';
import * as Actions from '../store/actions';
import swal from 'sweetalert2';

const { useState, useEffect } = React;

const schema = yup.object().shape({
  school: yup.string(
    errorMsg({
      name: 'Institute or School',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Institute or School',
      type: 'required',
    })
  ),
  department: yup.string(
    errorMsg({
      name: 'Major/Department',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Major/Department',
      type: 'required',
    })
  ),
  grade: yup.string(
    errorMsg({
      name: 'Grade',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Grade',
      type: 'required',
    })
  ),
  qualification: yup.string(
    errorMsg({
      name: 'Qualification',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Qualification',
      type: 'required',
    })
  ),
  startYear: yup.string(
    errorMsg({
      name: 'Start Year',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Start Year',
      type: 'required',
    })
  ),
  endYear: yup.string(
    errorMsg({
      name: 'End Date',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'End Date',
      type: 'required',
    })
  )
});

const useEducationQualification = ({dispatch, state}) => {

    const { countries, states, cities } = state.regions;
    const { data, loading, success, updated } = state.EducationQualification.educationqualification;
    // console.log({data})
    const [openModal, setOpenModal] = useState(false);
    const [items, setItems] = React.useState([]);
    const [addedSpouseAndDependant, setAddedSpouseAndDependant] = useState(false);
    const [showOnScreen, setShowOnScreen] = useState(false);
    const [selectedItem, setSelectedItem] = React.useState({
        school: "",
        department: "",
        grade: "",
        qualification: "",
        startYear: new Date(),
        endYear: new Date(),
    });

    const {
        errors,
        register,
        handleSubmit,
        reset,
        control
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValue: selectedItem
    });

    React.useEffect(() => {
        dispatch(Actions.getEducationQualification());
    }, []);

    const onSubmit = () => {
      if(showOnScreen){
        dispatch(Actions.updateEducationQualification(selectedItem));
            reset({
              school: "",
              department: "",
              grade: "",
              qualification: "",
              startYear: new Date(),
              endYear: new Date(),
            });
            setSelectedItem({
              school: "",
              department: "",
              grade: "",
              qualification: "",
              startYear: new Date(),
              endYear: new Date(),
            })
          setOpenModal(false);
          setShowOnScreen(false);
      }else{
        console.log(items);
        dispatch(Actions.addEducationQualification(items));
          setOpenModal(false);
          setItems([]);
      }
    };

    const handleClose = () => {
        reset({
          school: "",
          department: "",
          grade: "",
          qualification: "",
          startYear: new Date(),
          endYear: new Date(),
        });
        setSelectedItem({
          school: "",
          department: "",
          grade: "",
          qualification: "",
          startYear: new Date(),
          endYear: new Date(),
        })
      setOpenModal(false);
      setShowOnScreen(false);
    }

    const handleAddItem = (item) => {
      // console.log(item)
      let pre = items;
      pre.push(item);
      setItems(pre);
      // console.log(items);
      reset({
        school: "",
        department: "",
        grade: "",
        qualification: "",
        startYear: new Date(),
        endYear: new Date(),
      });
      setSelectedItem({
        school: "",
        department: "",
        grade: "",
        qualification: "",
        startYear: new Date(),
        endYear: new Date(),
    })
      setAddedSpouseAndDependant(true);
    }

    const handleEditItem = (index, isUpdate) => {
        // console.log(index)
        setShowOnScreen(isUpdate)
      if(isUpdate){
        const item = data?.find((item, ind) => index === ind);
        setSelectedItem(item);
        setOpenModal(true);
      }else{
        let pre = items.filter((item, ind) => index !== ind);
        const item = items.find((item, ind) => index === ind);
        setSelectedItem(item);
        setItems(pre);
      }
    };

    const isValid = () => {
      // console.log(selectedItem);
      return !selectedItem.school ||!selectedItem.department ||!selectedItem.qualification 
      || !selectedItem.startYear || !selectedItem.endYear;
    }


  return {
    errors,
    register,
    handleSubmit,
    onSubmit,
    control,
    openModal, 
    setOpenModal,
    countries,
    selectedItem, 
    setSelectedItem,
    items, 
    setItems,
    addedSpouseAndDependant, 
    setAddedSpouseAndDependant,
    showOnScreen, 
    setShowOnScreen,
    isValid,
    handleAddItem,
    handleEditItem,
    educations: data,
    success,
    handleClose
  };
};

export default useEducationQualification