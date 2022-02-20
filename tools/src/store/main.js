import { defineStore } from 'pinia'
import {api } from '/src/plugins/utils'

export const useMain =  defineStore('main', {
    state: () => {
        return {
            auth: {}
        }
    },
    getters: {
        loggedIn(state) {
            return 'token' in state.auth
        },
        bearer(state) {
            return `Bearer ${state.auth.token}`
        }
    },
    actions: {
        login() {
            return new Promise((resolve, reject) => {
                api.post('/auth/login', {
                    name: 'Joep',
                    password: 'test'
                }).then(res => {
                    this.auth = res.data
                    resolve(true)
                }).catch(err => {
                    reject(false)
                })
            })
        }
    },
})