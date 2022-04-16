import axios, { AxiosError } from "axios";
import { ContactItemType } from "../types/actions";

const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

export const loginAPI = {
  async login(username: string, password: string) {
    await delay(500) // delay 0.5 sec
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: username,
        password: password
      })
      const result = {
        isSucceed: true,
        token: response.data.accessToken,
        error: null
      }
      return result
    } catch (e) {
      const result = {
        isSucceed: false,
        token: null,
        error: (e as AxiosError).message
      }
      return result
    }
  }
}

export const contactsAPI = {
  async getContacts(token: string, searchValue: string) {

    let urlSearchQuery = ''
    if (searchValue) {
      urlSearchQuery = `?q=${searchValue}`
    }

    await delay(500) // delay 0.5 sec
    try {
      const response = await axios.get('http://localhost:3001/contacts' + urlSearchQuery, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch(e) {
      console.log('error has occurred during contacts fetching!')
      console.log((e as AxiosError).message)
      return (e as AxiosError).message
    }
  },

  async deleteContact(token: string, id: number) {
    await delay(500) // delay 0.5 sec
    try {
      const response = await axios.delete('http://localhost:3001/contacts/' + id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch(e) {
      console.log('error has occurred during contacts fetching!')
      console.log((e as AxiosError).message)
      return (e as AxiosError).message
    }
  },

  async editContact(token: string, contact: ContactItemType) {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
    const data = {
      name: contact.name,
      surname: contact.surname,
      tel: contact.tel,
      email: contact.email
    }

    await delay(500) // delay 0.5 sec
    try {
      const response = await axios.patch('http://localhost:3001/contacts/' + contact.id, data, config)
      return response.data
    } catch (e) {
      console.log('error has occurred during contacts fetching!')
      console.log((e as AxiosError).message)
      return (e as AxiosError).message
    }
  },

  async createNewContact(token: string, contact: ContactItemType) {
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
    const data = {
      name: contact.name,
      surname: contact.surname,
      tel: contact.tel,
      email: contact.email
    }

    await delay(500) // delay 0.5 sec
    try {
      const response = await axios.post('http://localhost:3001/contacts/', data, config)
      return response.data
    } catch (e) {
      console.log('error has occurred during contacts fetching!')
      console.log((e as AxiosError).message)
      return (e as AxiosError).message
    }
  },
}