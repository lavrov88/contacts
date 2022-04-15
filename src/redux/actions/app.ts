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

export const loginThunk = (username: string, password: string): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(setLoginInProgress(true))
    dispatch(showWrongUsernameOrPassword(false))
    dispatch(setInputsValues(username, password))
    const result = await loginAPI.login(username, password)
    console.dir(result)
    if (result) {
      dispatch(loginSucceed(result))
    } else {
      dispatch(showWrongUsernameOrPassword(true))
    }
    dispatch(setLoginInProgress(false))
  }
}