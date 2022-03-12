import axios from 'axios'
import { useMain } from '../store/main'


const api = axios.create({
    timeout: 3000,
    baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:8080/api',
})

api.interceptors.request.use(config => {
    const store = useMain()

    if(store.loggedIn) {
        config.headers['Authorization'] = store.bearer
    }
    
    return config
})

export {api}