import React from 'react';
import { updateKpoBehaviouralAttribute, updateBehaviouralAttribute, saveBehaviouralAttribute } from '../store/actions';

const useBehaviouralAttribute = (state, dispatch, kpoDetails) => {
  const [ba, setBa] = React.useState([]);

  React.useEffect(() => {
    setBa(state.data);
  }, [state])

  const handleChange = ({data, headerId}) => (e, value) => {
    // console.log({data, headerId});
    let headerIndex = null;
    let contentIndex = null;
    const currentContent = [];
    const contents = [];
    const currentHeader = ba.filter((item, index) => {
      if(item.id === headerId) {
        headerIndex = index;
        return item;
      }
    });

    currentHeader[0].contents.forEach((item, index) => {
      if(item.id === data.id) {
        contentIndex = index;
        currentContent.push(item)
      } else {
        contents.push(item);
      }
    });

    contents.splice(contentIndex, 0, {
      ...currentContent[0],
      score: value,
    });

    const header = {
      ...currentHeader[0],
      contents,
    }

    const x = ba.filter(item => item.id !== header.id);
    x.splice(headerIndex, 0, header);
    dispatch(updateBehaviouralAttribute(x));
  };

  const handleSubmit = () => {
    const model = {
      kpoId: kpoDetails.id,
      employeeId: kpoDetails.employeeId,
      behavioralAttributes: state.data
    }
    if(kpoDetails.behavioralAttributes) {
      dispatch(updateKpoBehaviouralAttribute({
        model,
        id: kpoDetails.behavioralAttributes.id
      }));
      return;
    }
    dispatch(saveBehaviouralAttribute(model));
  }

  return {
    state,
    handleChange,
    handleSubmit
  };
};

export default useBehaviouralAttribute;