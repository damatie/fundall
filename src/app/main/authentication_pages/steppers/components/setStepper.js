import api from 'app/services/api';
export const setStepper = async (genericDept=[], regStep=0) => {
    const form = {};
    try {
        if (genericDept.length > 0) {
            form.genericDept = genericDept;
        }
        form.regStep = regStep;
        const { data: { message, success  } } = await api.post('/department/generic', form);
        if (success) {
            console.log('Steps Updated successfully');
        } 
    } catch(e) {
        console.error(e);
    }
  }