import axios from 'axios'

const BASE_URL = 'http://localhost:5000'

const api = axios.create({
  baseURL: BASE_URL,
})

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// Auth
export const loginUser = (credentials) => api.post('/auth/login', credentials)

// Contacts
export const getContacts = () => api.get('/contacts/getAllContacts')
export const createContact = (data) => api.post('/contacts/create', data)
export const updateContact = (id, data) => api.put(`/contacts/${id}`, data)
export const deleteContact = (id) => api.delete(`/contacts/${id}`)
