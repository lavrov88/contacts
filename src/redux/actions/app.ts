import { loginAPI } from './../../api/api';
import { AnyAction, Dispatch, ThunkAction } from "@reduxjs/toolkit"
import { errorHandler } from '../../components/common/tools';
import { RootState } from '../reducers';

export const setLoggedIn = (token: string) => ({
  type: 'SET_LOG_IN',
  payload: token
})

export const setLoggedOut = () => ({
  type: 'SET_LOG_OUT'
})

export const setInputsValues = (username: string, password: string) => ({
  type: 'SET_INPUTS_VALUES',
  payload: {
    username,
    password
  }
})

const setLoginInProgress = (value: boolean) => ({
  type: 'SET_LOGIN_IN_PROGRESS',
  payload: value
})

export const showWrongUsernameOrPassword = (value: boolean) => ({
  type: 'SHOW_WRONG_USERNAME_OR_PASSWORD',
  payload: value
})

export const showLoginError = (show: boolean, message: string = '') => ({
  type: 'SHOW_LOGIN_ERROR',
  payload: { show, message }
})

export const loginThunk = (username: string, password: string): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoginInProgress(true))
    dispatch(showLoginError(false))
    dispatch(setInputsValues(username, password))

    const result = await loginAPI.login(username, password)
    errorHandler(result, dispatch, () => dispatch(setLoggedIn(result)))

    dispatch(setLoginInProgress(false))
  }
}