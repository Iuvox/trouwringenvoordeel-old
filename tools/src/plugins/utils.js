import axios from 'axios'

const api = axios.create({
    timeout: 3000,
    baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:8080/api',
})

export {api}