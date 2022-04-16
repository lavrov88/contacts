import { ContactItemType } from "../../types/actions";
import { contactsAPI } from './../../api/api';
import { AnyAction, ThunkAction } from "@reduxjs/toolkit"
import { RootState } from "../reducers"
import { logoutSucceed } from "./app";
import { message } from "antd";

export const setContacts = (contacts: ContactItemType[]) => ({
  type: 'SET_CONTACTS',
  payload: contacts
})

export const setIsFetchingContacts = (value: boolean) => ({
  type: 'SET_IS_FETCHING',
  payload: value
})

export const setSearchValue = (value: string) => ({
  type: 'SET_SEARCH_VALUE',
  payload: value
})

export const openContactEditModal = (contactId: number) => ({
  type: 'OPEN_CONTACT_EDIT_MODAL',
  payload: contactId
})

export const closeContactEditModal = () => ({
  type: 'CLOSE_CONTACT_EDIT_MODAL'
})


// THUNKS

export const fetchContactsThunk = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    dispatch(setIsFetchingContacts(true))
    const token = getState().app.token
    const searchValue = getState().contacts.searchContactsValue
    const result = await contactsAPI.getContacts(token, searchValue)

    if (result === 'Network Error') {
      message.error({
        content: 'Сервер не отвечает, попробуйте повторить запрос позже...',
        style: { marginTop: '140px' },
      })
      //dispatch(setContacts([]))

    } else if (result === 'Request failed with status code 401') {
      message.info({
        content: 'Срок сессии истёк, нужно войти заново...',
        style: { marginTop: '140px' },
      })
      setTimeout(() => dispatch(logoutSucceed()), 1000)

    } else {
      dispatch(setContacts(result))
    }

    dispatch(setIsFetchingContacts(false))
  }
}

export const deleteContactThunk = (id: number): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    dispatch(setIsFetchingContacts(true))

    const token = getState().app.token
    const result = await contactsAPI.deleteContact(token, id)
    if (result === 'Network Error') {
      console.log('Server is not responding...')
      dispatch(setContacts([]))
    } else if (result === 'Request failed with status code 401') {
      console.log('Your session has been expired! Need to login again.')
      dispatch(logoutSucceed())
    } else {
      dispatch(fetchContactsThunk())
    }
    dispatch(setIsFetchingContacts(false))
  }
}

export const updateContactThunk = (updatedContact: ContactItemType): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    dispatch(setIsFetchingContacts(true))
    dispatch(closeContactEditModal())

    const token = getState().app.token
    await contactsAPI.editContact(token, updatedContact)

    dispatch(fetchContactsThunk())
    dispatch(setIsFetchingContacts(false))
  }
}

export const createNewContactThunk = (newContact: ContactItemType): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    dispatch(setIsFetchingContacts(true))
    dispatch(closeContactEditModal())

    const token = getState().app.token
    await contactsAPI.createNewContact(token, newContact)

    dispatch(fetchContactsThunk())
    dispatch(setIsFetchingContacts(false))
  }
}