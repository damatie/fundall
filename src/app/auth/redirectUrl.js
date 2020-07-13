export const redirectUrl = role => {
  switch(role) {
    case 'employee': {
      return '/employee/dashboard'
    }
    case 'Line managers': {
      return '/employee/dashboard'
    }
    case 'Head of department': {
      return '/employee/dashboard'
    }
    case 'Finance manager': {
      return '/employee/dashboard'
    }
    case 'HR': {
      return '/employee/dashboard'
    }
    default: {
      return '/login'
    }
  } 
}