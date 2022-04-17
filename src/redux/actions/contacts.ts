import { ContactItemType } from "../../types/actions";
import { contactsAPI } from './../../api/api';
import { AnyAction, ThunkAction } from "@reduxjs/toolkit"
import { RootState } from "../reducers"
import { errorHandler, showFetchingAndGetTokenDecorator } from "../../components/common/tools";

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
    showFetchingAndGetTokenDecorator(dispatch, getState, async (token: string) => {
      const searchValue = getState().contacts.searchContactsValue
      const result = await contactsAPI.getContacts(token, searchValue)
      errorHandler(result, dispatch, () => dispatch(setContacts(result)))
    })
  }
}

export const deleteContactThunk = (id: number): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    showFetchingAndGetTokenDecorator(dispatch, getState, async (token: string) => {
      const result = await contactsAPI.deleteContact(token, id)
      errorHandler(result, dispatch, () => dispatch(fetchContactsThunk()))
    })
  }
}

export const updateContactThunk = (updatedContact: ContactItemType): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    showFetchingAndGetTokenDecorator(dispatch, getState, async (token: string) => {
      dispatch(closeContactEditModal())
      const result = await contactsAPI.editContact(token, updatedContact)
      errorHandler(result, dispatch, () => dispatch(fetchContactsThunk()))
    })
  }
}

export const createNewContactThunk = (newContact: ContactItemType): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    showFetchingAndGetTokenDecorator(dispatch, getState, async (token: string) => {
      dispatch(closeContactEditModal())
      const result = await contactsAPI.createNewContact(token, newContact)
      errorHandler(result, dispatch, () => dispatch(fetchContactsThunk()))
    })
  }
}