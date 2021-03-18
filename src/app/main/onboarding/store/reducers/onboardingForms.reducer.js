import { 
  ONBOARDING_FORMS,
  GET_ID_CARD_ISSUANCE,
  GET_CHECK_FORMS,
  GET_SIM_CARD_ACK,
  GET_BUSINESS_CARD,
  GET_BANK_ACCOUNT_INFO,
  GET_REIMBURSABLE_EXPENSES,
  GET_MALARONE
} from '../actions';

const initialState = {
  forms: { },
  loading: true,
  idCardIssuance: { },
  checkForms: {
    loading: true,
    data: { }
  },
  simCardAck: {
    loading: true,
    data: { },
  },
  businessCard: {
    loading: true,
    data: { },
  },
  bankAccountInfo: {
    loading: true,
    data: { }
  },
  reimbursableExpenses: {
    loading: true,
    data: { }
  },
  malarone: {
    data: { },
    loading: true
  }
}
const onboardingFromReducer = (state = initialState , actions) => {
  switch(actions.type) {
    case ONBOARDING_FORMS:
      return {
        ...state,
        forms: actions.payload,
        loading: false,
      }
    case GET_ID_CARD_ISSUANCE:
      return {
        ...state,
        idCardIssuance: actions.payload,
      }
    case GET_CHECK_FORMS:
      return {
        ...state,
        checkForms: {
          data: actions.payload,
          loading: false
        },
      }
    case GET_SIM_CARD_ACK:
      return {
        ...state,
        simCardAck: {
          loading: false,
          data: actions.payload,
        }
      }
    case GET_BUSINESS_CARD:
      return {
        ...state,
        businessCard: {
          loading: false,
          data: actions.payload,
        }
      }
    case GET_BANK_ACCOUNT_INFO:
      return {
        ...state,
        bankAccountInfo: {
          loading: false,
          data: actions.payload
        }
      }
    case GET_REIMBURSABLE_EXPENSES:
      return {
        ...state,
        reimbursableExpenses: {
          loading: false,
          data: actions.payload
        }
      }
    case GET_MALARONE:
      return {
        ...state,
        malarone: {
          data: actions.payload,
          loading: false
        }
      }
    default:
      return state;
  }
};



export default onboardingFromReducer;