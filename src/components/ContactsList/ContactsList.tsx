import { List } from "antd";
import React from "react";
import { ContactsListProps } from "../../types/props";
import "./ContactsList.css"
import { fetchContactsThunk } from "../../redux/actions/contacts";
import ContactsListItem from "./ContactsListItem/ContactsListItem";
import SearchAndAdd from "./SearchAndAdd/SearchAndAdd";
import ContactEditModal from "./ContactEditModal/ContactEditModal";


const ContactList = ({ app, contacts, dispatch }: ContactsListProps) => {

  React.useEffect(() => {
    dispatch(fetchContactsThunk())
  }, [])

  return (
    <div className="contacts_list_wrapper">
      <SearchAndAdd 
        dispatch={dispatch} 
        searchValue={contacts.searchContactsValue} />
      {<List
        className="contacts_list"
        itemLayout="horizontal"
        loading={contacts.contactsIsFetching}
        dataSource={contacts.contacts}
        renderItem={(contact) => (
          <ContactsListItem 
            c={contact}
            dispatch={dispatch}
          />
        )}
      />}
      <ContactEditModal 
        contacts={contacts}
        dispatch={dispatch}
      />
    </div>
  )
}

export default ContactList