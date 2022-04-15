export type AppActions = LoginSucceedType 
                       | LogoutSucceedType 
                       | SetInputsValues
                       | LoginInProgress 
                       | ShowWrongUsernameOrPassword

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