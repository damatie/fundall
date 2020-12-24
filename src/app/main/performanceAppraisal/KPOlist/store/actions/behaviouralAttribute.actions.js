
export const GET_ALL_BEHAVIOURAL_ATTRIBUTE = 'GET ALL BEHAVIOURAL ATTRIBUTE';
export const GET_ONE_BEHAVIOURAL_ATTRIBUTE = 'GET ONE BEHAVIOURAL ATTRIBUTE';

export const getAllBehaviouralAttribute = () => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_BEHAVIOURAL_ATTRIBUTE,
      payload: [
        {
          name: 'Commitment and Leadership',
          id: 1,
          content: [
            {
              name: 'Service Focus',
              description: 'Dedication to external and internal customer service and to exceeding customer expectations',
              id: 1
            },
            {
              name: 'Continuous Improvement',
              description: 'Utilizes every opportunity to improve performance and maximize value.',
              id: 2
            }
          ]
        },
        {
          name: 'Integrity',
          id: 2,
          content: [
            {
              name: 'Decision Making',
              description: 'Make appropriate and timely choices for the company, our personnel, our customers and our stakeholders.',
              id: 1
            },
            {
              name: 'Responsibility',
              description: 'Take personal ownership and accountability for service outcome, HSE, work quality, ethics and sustainability',
              id: 2
            }
          ]
        }
      ]
    })
  };
};

export const getOneBehaviouralAttribute = (data) => {
  return (dispatch) => {
    dispatch({
      type: GET_ONE_BEHAVIOURAL_ATTRIBUTE,
      payload: data
    })
  };
};