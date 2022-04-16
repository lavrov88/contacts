import { AppActions } from '../../types/actions';
import { AppState } from './../../types/reducers';

const initialState: AppState = {
  isLogged: false,
  loggingInProgress: false,
  loginErrorMessage: {
    show: false,
    message: ''
  },
  previousUsername: null,
  previousPassword: null,
  token: ''
}

const appReducer = (state = initialState, action: AppActions): AppState => {
  switch (action.type) {
    case 'SET_LOG_IN':
      return {
        ...state,
        isLogged: true,
        loggingInProgress: false,
        token: action.payload,
      }

    case 'SET_LOG_OUT':
      return {
        ...state,
        isLogged: false,
        loggingInProgress: false,
        token: '',
      }

    case 'SET_INPUTS_VALUES':
      return {
        ...state,
        previousUsername: action.payload.username,
        previousPassword: action.payload.password
      }

    case 'SET_LOGIN_IN_PROGRESS':
      return {
        ...state,
        loggingInProgress: action.payload,
      }
    
    case 'SHOW_LOGIN_ERROR':
      return {
        ...state,
        loginErrorMessage: {
          ...state.loginErrorMessage,
          show: action.payload.show,
          message: action.payload.message
        }
      }
  
    default:
      return state
  }
}

export default appReducer
