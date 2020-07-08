export const redirectUrl = role => {
  switch(role) {
    case 'employee': {
      return '/employee/dashboard'
    }
    case 'HR': {
      return '/hr/employee_management'
    }
    default: {
      return '/login'
    }
  } 
}