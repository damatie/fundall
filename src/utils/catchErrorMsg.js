const catchErrorMsg = (error) => {
  return error?.response?.data?.error || error?.response?.data?.message || error?.response?.message || error.response.error || 'Something went wrong';
};

export default catchErrorMsg;