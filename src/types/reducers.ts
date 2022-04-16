import { ContactItemType } from "./actions"

export type AppState = {
  isLogged: boolean
  loggingInProgress: boolean
  loginErrorMessage: {
    show: boolean,
    message: string
  }
  previousUsername: string | null
  previousPassword: string | null
  token: string
}

export type ContactsState = {
  contactsIsFetching: boolean
  contacts: Array<ContactItemType>
  searchContactsValue: string
  editContactModal: {
    isOpen: boolean,
    data: ContactItemType
  }
}