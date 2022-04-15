import React from "react";
import { contactsAPI } from "../../api/api";
import { ContactsListProps } from "../../types/props";

const ContactList = ({ app, contacts, dispatch }: ContactsListProps) => {
  contactsAPI.getContacts(app.token as string)
  return (
    <div className="contact_wrapper">
      YOU ARE LOGGED!
    </div>
  )
}

export default ContactList