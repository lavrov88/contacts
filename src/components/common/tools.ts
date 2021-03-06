import { Dispatch } from "@reduxjs/toolkit"
import { message } from "antd"
import { AxiosResponse } from "axios"
import { setLoggedOut, showLoginError } from "../../redux/actions/app"
import { setIsFetchingContacts } from "../../redux/actions/contacts"


// NETWORK

export const errorHandler = (result: AxiosResponse["data"],
                             dispatch: Dispatch,
                             actionIfSucceed: Function) => {
  if (result !== 'Request failed with status code 400'
      && result !== 'Network Error' 
      && result !== 'Request failed with status code 401') {

    actionIfSucceed()
    
  } else {
    switch (result) {
      case 'Network Error':
        message.error('Не удается подключиться к серверу...')
        break
      case 'Request failed with status code 400':
        dispatch(showLoginError(true, 'Неправильное имя пользователя или пароль!'))
        break
      case 'Request failed with status code 401':
        message.error('Время сессии истекло... Нужно войти заново.')
        setTimeout(() => dispatch(setLoggedOut()), 1000)
        break

      default:
        console.log('unidentified server problem...')
        console.error(result)
        break
    }
  }
}

export const showFetchingAndGetTokenDecorator = async (dispatch: Dispatch, getState: Function, callback: Function) => {
  dispatch(setIsFetchingContacts(true))
  const token = getState().app.token

  await callback(token)

  dispatch(setIsFetchingContacts(false))
}