import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.PROD ? '' : 'http://localhost:8080/api',
})

export {api}