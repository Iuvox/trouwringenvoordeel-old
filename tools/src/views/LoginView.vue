<template>
    <div class="px-54 bg-slate-400 flex h-screen w-screen justify-center items-center">
        <div class="bg-slate-100 p-20 rounded-md shadow-md">
            <h1 class="text-2xl">Login hieronder in</h1>
            <button class="bg-slate-700 text-white px-2 py-1 rounded-md mt-2" @click="login()">Login ></button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {useMain} from '/src/store/main'

const main = useMain()
const router = useRouter()

console.log(router)
const login = () => {
    main.login()
    router.push({
        path: router.currentRoute.value.query.redirect_to
    })
}

</script>