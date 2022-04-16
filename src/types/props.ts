import { Dispatch } from "@reduxjs/toolkit"
import { ContactItemType } from "./actions"
import { AppState, ContactsState } from "./reducers"

// BASE COMPONENTS

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

// CONTACTS LIST

export type SearchAndAddPropsType = {
  dispatch: Dispatch<any>
  searchValue: string
}

export type ContactsListItemPropsType = {
  c: ContactItemType
  dispatch: Dispatch<any>
}

export type ContactTitleItemType = {
  name: string
  surname: string
  dispatch: Dispatch<any>
  id: number
}

export type ContactDescriptionItemType = {
  name: string
  surname: string
  tel: string
  email: string
}

export type ContactEditModalProps = {
  contacts: ContactsState
  dispatch: Dispatch<any>
}