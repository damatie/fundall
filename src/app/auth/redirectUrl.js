export const redirectUrl = role => {
  switch(role) {
    case 'employee': {
      return '/employee/dashboard'
    }
    default: {
      return '/login'
    }
  } 
}