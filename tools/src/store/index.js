import {createPinia} from 'pinia'
import { watch } from 'vue'

const pinia = createPinia()


try {
    const localState = JSON.parse(localStorage.getItem('piniaState'))
    if (localState !== null) {
        if (localState.expires > Date.now()) {
            pinia.state.value = localState
        }
    }
} catch (error) {
    console.log(error)
}

watch(
    pinia.state,
    (state) => {
        state.expires = Date.now() + (1000 * 60 * 60 )
        localStorage.setItem('piniaState', JSON.stringify(state))
    },
    { deep: true }
)

export default pinia