<template>
    <div class="px-40 py-20 flex">
        <div class="w-1/3">
            <h1 class="text-3xl font-bold">Vul hier Referral code in</h1>
            <form @submit.prevent="handleSubmit($event)">
                <div>
                    <input
                        type="text"
                        name="code"
                        class="rounded-md outline-none border-slate-500 border-2 px-2 py-1"
                        value="kzn22f0c"
                    />
                </div>
                <button
                    type="submit"
                    class="bg-slate-800 text-white rounded-md px-3 py-1 mt-2"
                >Check Code</button>
            </form>
        </div>
        <div class="w2/3" v-if="data">
            <h2 class="text-3xl font-bold">Code: {{data.code}}</h2>
            <h3 class="text-xl font-semibold">Aangemaakt op {{data.created_at}}</h3>

            <h2 class="text-2xl mt-3">Klantgevens:</h2>
            <p>Naam: {{getCustomer.name}}</p>
            <p>Telefoon: {{getCustomer.telephone}}</p>
            <p>Email: {{getCustomer.email}}</p>

        </div>
    </div>
</template>

<script>
import {api} from '../plugins/utils'
import { useMain } from '../store/main'


export default {
    setup() {
        const main = useMain()
        return {main}
    },
    data() {
        return {
            data: null
        }
    },
    mounted() {
    },
    methods: {
        getReferralcode(code) {
            api.get(`/referral/${code}`, {
                headers: {
                    'Authorization': `${this.main.bearer}`
                }
            }).then(res => {
                this.data = res.data
            })
        },
        handleSubmit(e) {
            this.getReferralcode(e.target.elements.code.value)
        }
    },
    computed: {
        getCustomer() {
            const customer = this.data.order[0].customer
            return {
                name: customer.billingaddress.full_name,
                telephone: customer.billingaddress.telephone,
                email: customer.email
            }
        }
    }
}

</script>