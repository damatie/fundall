const catchErrorMsg = (error) => {
  return error.response?.data.error || error.response?.data.message || 'Service Unavailble';
};

export default catchErrorMsg;