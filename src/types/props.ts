import { Dispatch } from "@reduxjs/toolkit"
import { AppState, ContactsState } from "./reducers"

export type LoginComponentProps = {
  app: AppState,
  dispatch: Dispatch<any>
}

export type ContactsListProps = {
  app: AppState,
  contacts: ContactsState,
  dispatch: Dispatch<any>
}

export type HeaderComponentProps = {
  app: AppState,
  dispatch: Dispatch<any>
}