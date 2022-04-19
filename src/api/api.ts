import axios, { AxiosError } from "axios";
import { ContactItemType } from "../types/actions";

const delay = () => new Promise(r => setTimeout(r, 500))

const errorCatcher = (e: AxiosError, message: string = 'An error occurred during the request') => {
  console.log(message)
  console.log((e as AxiosError).message)
  return (e as AxiosError).message
}

export const loginAPI = {
  async login(username: string, password: string) {
    await delay() // delay 0.5 sec
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: username,
        password: password
      })
      return response.data.accessToken as string
    } catch (e) {
      return (e as AxiosError).message
    }
  }
}

const headersTypes = {
  getAndDelete(token: string) {
    return {
      Authorization: `Bearer ${token}`
    }
  },
  patchAndPost(token: string) {
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }
}

export const contactsAPI = {
  async getContacts(token: string, searchValue: string) {

    let urlSearchQuery = ''
    if (searchValue) {
      urlSearchQuery = `?q=${searchValue}`
    }

    await delay()
    try {
      const response = await axios.get('http://localhost:3001/contacts' + urlSearchQuery, {
        headers: headersTypes.getAndDelete(token)
      })
      return response.data
    } catch(e) {
      return errorCatcher(e as AxiosError, 'An error occured during fetching contacts')
    }
  },

  async deleteContact(token: string, id: number) {
    await delay()
    try {
      const response = await axios.delete('http://localhost:3001/contacts/' + id, {
        headers: headersTypes.getAndDelete(token)
      })
      return response.data
    } catch(e) {
      return errorCatcher(e as AxiosError, 'An error occured during deleting the contact')
    }
  },

  async editContact(token: string, contact: ContactItemType) {

    const config = {
      headers: headersTypes.patchAndPost(token)
    }
    const data = {
      name: contact.name,
      surname: contact.surname,
      tel: contact.tel,
      email: contact.email
    }

    await delay()
    try {
      const response = await axios.patch('http://localhost:3001/contacts/' + contact.id, data, config)
      return response.data
    } catch (e) {
      return errorCatcher(e as AxiosError, 'An error occured during saving the contact')
    }
  },

  async createNewContact(token: string, contact: ContactItemType) {
    
    const config = {
      headers: headersTypes.patchAndPost(token)
    }
    const data = {
      name: contact.name,
      surname: contact.surname,
      tel: contact.tel,
      email: contact.email
    }

    await delay()
    try {
      const response = await axios.post('http://localhost:3001/contacts/', data, config)
      return response.data
    } catch (e) {
      return errorCatcher(e as AxiosError, 'An error occured during saving new contact')
    }
  },
}