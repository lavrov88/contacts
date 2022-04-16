
// APP ACTIONS

export type AppActions = LoginSucceedType 
                       | LogoutSucceedType 
                       | SetInputsValues
                       | LoginInProgress 
                       | ShowWrongUsernameOrPassword
                       | ShowLoginError

type LoginSucceedType = {
  type: 'SET_LOG_IN'
  payload: string
}

type LogoutSucceedType = {
  type: 'SET_LOG_OUT'
}

type SetInputsValues = {
  type: 'SET_INPUTS_VALUES'
  payload: {
    username: string
    password: string
  }
}

type LoginInProgress = {
  type: 'SET_LOGIN_IN_PROGRESS'
  payload: boolean
}

type ShowWrongUsernameOrPassword = {
  type: 'SHOW_WRONG_USERNAME_OR_PASSWORD'
  payload: boolean
}

type ShowLoginError = {
  type: 'SHOW_LOGIN_ERROR'
  payload: {
    show: boolean
    message: string
  }
}


// CONTACTS LIST ACTIONS

export type ContactsActions = SetContactAction
                            | SetIsFetchingAction
                            | SetSearchValueAction
                            | OpenContactEditModalAction
                            | CloseContactEditModalAction

type OpenContactEditModalAction = {
  type: 'OPEN_CONTACT_EDIT_MODAL'
  payload: number
}

type CloseContactEditModalAction = {
  type: 'CLOSE_CONTACT_EDIT_MODAL'
}

type SetSearchValueAction = {
  type: 'SET_SEARCH_VALUE'
  payload: string
}

export type ContactItemType = {
  id: number
  name: string
  surname: string
  tel: string
  email: string
}

type SetContactAction = {
  type: 'SET_CONTACTS'
  payload: ContactItemType[]
}

type SetIsFetchingAction = {
  type: 'SET_IS_FETCHING'
  payload: boolean
}