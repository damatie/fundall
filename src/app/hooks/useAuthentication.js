
export const useAuthentication = async (type, req) => {
  switch(type) {
    case 'hr_signup': {
      try {
        const hrRes = await fetch('https://hris-cbit.herokuapp.com/api/v1/auth/hr/signup', {
          method: 'post',
          headers: {'content-type': 'application/json', origin: req.origin},
          body: JSON.stringify(req.body)
        });
        const hrData = await hrRes.json();
        return hrData;
      } catch(e) {
        console.error(e);
        break;
      }
    }
    case 'hr_confirmation': {
      try {
        const hrRes = await fetch(`https://hris-cbit.herokuapp.com/api/v1/auth/hr/confirmation/${req.token}`);
        const hrData = await hrRes.json();
        return hrData;
      } catch(e) {
        console.error(e);
        break;
      }
    }
    case 'hr_login': {
      try {
        const hrRes = await fetch('https://hris-cbit.herokuapp.com/api/v1/auth/hr/login', {
          method: 'post',
          headers: {'content-type': 'application/json' },
          body: JSON.stringify(req.body)
        });
        const hrData = await hrRes.json();
        return hrData;
      } catch(e) {
        console.error(e);
        break;
      }
    }
    case 'employee_login': {
      try {
        const employeeRes = await fetch('https://hris-cbit.herokuapp.com/api/v1/auth/employee/login', {
          method: 'post',
          headers: {'content-type': 'application/json' },
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
};