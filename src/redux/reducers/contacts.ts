import { ContactsActions } from '../../types/actions';
import { ContactsState } from './../../types/reducers';

const initialState: ContactsState = {
  contactsIsFetching: false,
  contacts: [],
  searchContactsValue: '',
  editContactModal: {
    isOpen: false,
    data: {
      id: 0,
      name: '',
      surname: '',
      tel: '',
      email: ''
    }
  }
}

const contactsReducer = (state = initialState, action: ContactsActions) => {
  switch (action.type) {
    case 'SET_CONTACTS':
      return {
        ...state,
        contacts: [
          ...action.payload
        ].sort((a, b) => (a.name.toLowerCase() + a.surname.toLowerCase()) > (b.name.toLowerCase() + b.surname.toLowerCase()) ? 1 : -1)
        // alphabet sorting
      }

    case 'SET_IS_FETCHING':
      return {
        ...state,
        contactsIsFetching: action.payload
      }

    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchContactsValue: action.payload
      }

    case 'OPEN_CONTACT_EDIT_MODAL':
      let contact
      const filtered = state.contacts.filter(c => c.id === action.payload)
      if (filtered.length > 0) {
        contact = filtered[0]
      } else {
        contact = { id: 0, name: '', surname: '', tel: '', email: '' }
      }
      
      return {
        ...state,
        editContactModal: {
          ...state.editContactModal,
          isOpen: true,
          data: {
            ...state.editContactModal.data,
            id: contact.id,
            name: contact.name,
            surname: contact.surname,
            tel: contact.tel,
            email: contact.email
          }
        }
      }

    case 'CLOSE_CONTACT_EDIT_MODAL':
      return {
        ...state,
        editContactModal: {
          ...state.editContactModal,
          isOpen: false
        }
      }

    default:
      return state
  }
}

export default contactsReducer
