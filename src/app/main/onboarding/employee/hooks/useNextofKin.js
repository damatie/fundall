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
  firstName: yup.string(
    errorMsg({
      name: 'First Name',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'First Name',
      type: 'required',
    })
  ),
  lastName: yup.string(
    errorMsg({
      name: 'Last Name',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Last Name',
      type: 'required',
    })
  ),
  gender: yup.string(
    errorMsg({
      name: 'Gender',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Gender',
      type: 'required',
    })
  ),
  nationality: yup.string(
    errorMsg({
      name: 'Nationality',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Nationality',
      type: 'required',
    })
  ),
  dob: yup.string(
    errorMsg({
      name: 'Date of Birth',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Date of Birth',
      type: 'required',
    })
  ),
  address: yup.string(
    errorMsg({
      name: 'Address',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Address',
      type: 'required',
    })
  ),
  contactNumber: yup.string(
    errorMsg({
      name: 'Contact Number',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Contact Number',
      type: 'required',
    })
  ),
  relationship: yup.string(
    errorMsg({
      name: 'Relationship',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Relationship',
      type: 'required',
    })
  )
});

const useNextofKin = ({dispatch, state}) => {

    const { countries, states, cities } = state.regions;
    const { data, loading, success, updated } = state.NextOfKin.nextofkin;
    // console.log({data})
    const [openModal, setOpenModal] = useState(false);
    const [items, setItems] = React.useState([]);
    const [addedSpouseAndDependant, setAddedSpouseAndDependant] = useState(false);
    const [showOnScreen, setShowOnScreen] = useState(false);
    const [selectedItem, setSelectedItem] = React.useState({
        firstName: "",
        lastName: "",
        gender: "",
        dob: new Date(),
        nationality: "",
        address: "",
        contactNumber: "",
        relationship: "",
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
        dispatch(Actions.getNextOfKin());
    }, []);

    const onSubmit = () => {
      if(showOnScreen){
        dispatch(Actions.updateNextOfKin(selectedItem));
            reset({
              firstName: "",
              lastName: "",
              gender: "",
              dob: new Date(),
              nationality: "",
              address: "",
              contactNumber: "+234",
              relationship: "",
            });
            setSelectedItem({
                firstName: "",
                lastName: "",
                gender: "",
                dob: new Date(),
                nationality: "",
                address: "",
                contactNumber: "+234",
                relationship: "",
            })
          setOpenModal(false);
          setShowOnScreen(false);
      }else{
        console.log(items);
        dispatch(Actions.addNextOfKin(items));
          setOpenModal(false);
          setItems([]);
      }
    };

    const handleClose = () => {
        reset({
          firstName: "",
          lastName: "",
          gender: "",
          dob: new Date(),
          nationality: "",
          address: "",
          contactNumber: "+234",
          relationship: "",
        });
        setSelectedItem({
            firstName: "",
            lastName: "",
            gender: "",
            dob: new Date(),
            nationality: "",
            address: "",
            contactNumber: "+234",
            relationship: "",
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
          firstName: "",
          lastName: "",
          gender: "",
          dob: new Date(),
          nationality: "",
          address: "",
          contactNumber: "+234",
          relationship: "",
      });
      setSelectedItem({
        firstName: "",
        lastName: "",
        gender: "",
        dob: new Date(),
        nationality: "",
        address: "",
        contactNumber: "+234",
        relationship: "",
    })
      setAddedSpouseAndDependant(true);
    }

    const handleEditItem = (index, isUpdate) => {
        // console.log(index)
        setShowOnScreen(isUpdate)
      if(isUpdate){
        const item = data?.map(d => {
          return {
            ...d,
            dob: d.birthday,
            contactNumber: d.phoneNo
          }
        }).find((item, ind) => index === ind);
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
      return !selectedItem.firstName ||!selectedItem.lastName ||!selectedItem.relationship 
      || !selectedItem.nationality || !selectedItem.dob || !selectedItem.gender || !selectedItem.contactNumber
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
    kins: data?.map(d => {
      return {
        ...d,
        dob: d.birthday,
        contactNumber: d.phoneNo
      }
    }),
    success,
    handleClose
  };
};

export default useNextofKin