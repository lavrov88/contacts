export type AppState = {
  isLogged: boolean
  loggingInProgress: boolean
  wrongUsernameOrPassword: boolean
  previousUsername: string | null
  previousPassword: string | null
  token: string | null
}

export type ContactsState = {
  
}