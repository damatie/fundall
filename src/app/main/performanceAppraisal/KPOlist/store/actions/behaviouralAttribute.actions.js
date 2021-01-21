import api from "app/services/api";
import catchErrorMsg from "utils/catchErrorMsg";
import loading from "utils/loading";
import swal from 'sweetalert2';
import { getOneKpo } from './kpoList.actions';

export const GET_ALL_BEHAVIOURAL_ATTRIBUTE = 'GET ALL BEHAVIOURAL ATTRIBUTE';
export const GET_ONE_BEHAVIOURAL_ATTRIBUTE = 'GET ONE BEHAVIOURAL ATTRIBUTE';

export const getAllBehaviouralAttribute = () => {
  return async (dispatch) => {
    try {
      const { data: { data: {rows} } } = await api.get(`/behavioral/attributes/header/?offset=${0}&limit=${100}`);
      const behaviouralAtt = [];
      rows.forEach((item, index) => {
        const value = {
          ...item,
          contents: [],
        }
        behaviouralAtt.push(value);
        item.contents.forEach((i, idx) => {
          behaviouralAtt[index].contents.push({
            ...i,
            score: ''
          });
        });

      });
      dispatch({
        type: GET_ALL_BEHAVIOURAL_ATTRIBUTE,
        payload: behaviouralAtt
      })
    } catch (e) {
      dispatch({
        type: GET_ALL_BEHAVIOURAL_ATTRIBUTE,
        payload: []
      })
    }
  };
};

export const updateBehaviouralAttribute = (payload) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_BEHAVIOURAL_ATTRIBUTE,
      payload,
    })
  }
};

export const saveBehaviouralAttribute = (model) => {
  return async (dispatch) => {
    try {
      loading('Saving...');
      const { data: {message} } = await api.post(`/appraisal/kpo/behavioral-attribute/`, model);
      swal.fire({
        text: message,
        icon: 'success',
      });
      dispatch(getOneKpo(model.kpoId))
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
      });
    }
  }
};

export const updateKpoBehaviouralAttribute = ({model, id}) => {
  return async (dispatch) => {
    try {
      loading('Saving...');
      const { data: {message} } = await api.patch(`/appraisal/kpo/behavioral-attribute/${id}`, model);
      swal.fire({
        text: message,
        icon: 'success',
      });
      dispatch(getOneKpo(model.kpoId))
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error',
      });
    }
  }
};