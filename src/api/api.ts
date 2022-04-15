import axios from "axios";

const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

export const loginAPI = {
  async login(username: string, password: string) {
    await delay(500) // delay 0.5 sec
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: username,
        password: password
      })
      // console.log(data)
      return response.data.accessToken
    } catch (e) {
      // console.log('error catched!')
      // console.log(e)
    }
  }
}

export const contactsAPI = {
  async getContacts(token: string) {
    await delay(500)
    try {
      const response = await axios.get('http://localhost:3001/contacts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data)
    } catch(e) {

    }
  }
}