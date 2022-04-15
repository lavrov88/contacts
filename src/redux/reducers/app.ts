import { AppActions } from '../../types/actions';
import { AppState } from './../../types/reducers';

const initialState: AppState = {
  isLogged: false,
  loggingInProgress: false,
  wrongUsernameOrPassword: false,
  previousUsername: null,
  previousPassword: null,
  token: null
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
        token: null,
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
    
    case 'SHOW_WRONG_USERNAME_OR_PASSWORD':
      return {
        ...state,
        wrongUsernameOrPassword: action.payload
      }
  
    default:
      return state
  }
}

export default appReducer
