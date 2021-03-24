const errorMsg = ({ name, number, type }) => {
  switch (type) {
    case 'string':
      return `${name} must not contain a number`;
    case 'email':
      return `${name} must be a valid email`;
    case 'number':
      return `${name} must not contain an alphabet`;
    case 'required':
      return `${name} is required`;
    case 'min':
      return `${name} must not be less than ${number} characters`;
    case 'max':
      return `${name} must not be more than ${number} characters`;
    default: {
      return '';
    }
  }
};

export default errorMsg;