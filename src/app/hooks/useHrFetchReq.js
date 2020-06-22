export const useHrFetchReq = async ( type, req ) => {
  switch(type) {
    case 'create_employee': {
      try {
        const employeeRes = await fetch('https://hris-cbit.herokuapp.com/api/v1/auth/employee/signup', {
          method: 'post',
          headers: {
            'Content-type': 'Application/json',
            Authorization: `JWT ${req.token}`
          },
          body: JSON.stringify(req.body)
        });
        const result = await employeeRes.json();
        return result;
      } catch(e) {
        console.error(e);
        break;
      }
    }
    default: {
      return type;
    }
  }
}