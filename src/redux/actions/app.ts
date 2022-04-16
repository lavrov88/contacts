import { loginAPI } from './../../api/api';
import { AnyAction, ThunkAction } from "@reduxjs/toolkit"
import { RootState } from "../reducers"

export const loginSucceed = (token: string) => ({
  type: 'SET_LOG_IN',
  payload: token
})

export const logoutSucceed = () => ({
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
  return async (dispatch) => {
    dispatch(setLoginInProgress(true))
    dispatch(showLoginError(false))
    dispatch(setInputsValues(username, password))
    const result = await loginAPI.login(username, password)
    // console.dir(result)
    if (result.isSucceed) {
      dispatch(loginSucceed(result.token))
    } else {
      if (result.error === 'Network Error') {
        dispatch(showLoginError(true, 'Сервер не отвечает, возможно он не запущен...'))
      } else if (result.error === 'Request failed with status code 400') {
        dispatch(showLoginError(true, 'Неправильное имя пользователя или пароль!'))
      } else {
        console.log('unidentified server problem...')
        console.error(result.error)
      }
    }
    dispatch(setLoginInProgress(false))
  }
}