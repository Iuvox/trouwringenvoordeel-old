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
                        value="kzv98dhu"
                    />
                </div>
                <button
                    type="submit"
                    class="bg-slate-800 text-white rounded-md px-3 py-1 mt-2"
                >Check Code</button>
            </form>
        </div>
        <div class="w-2/3">
            <div v-if="code && created_at">
                <h2 class="text-3xl font-bold">Code: {{ code }}</h2>
                <h3 class="text-xl font-semibold">Aangemaakt op {{ created_at }}</h3>

                <h2 class="text-2xl mt-3">Klantgevens:</h2>
                <p>Naam: {{ getCustomer.name }}</p>
                <p>Telefoon: {{ getCustomer.telephone }}</p>
                <p>Email: {{ getCustomer.email }}</p>
            </div>
            <div>
                <h2 class="text-3xl font-bold mt-6">Gebruikt op de volgende orders:</h2>
                <div v-for="order in usedOrders" class="mt-3">
                    <p>Naam: {{ order.customer.billingaddress.full_name }}</p>
                    <p>Telefoon: {{ order.customer.billingaddress.telephone }}</p>
                    <p>Email: {{ order.customer.email }}</p>
                    <p>Order Number: {{ order.ordernumber_full }}</p>
                    <a :href="`https://www.trouwringenvoordeel.nl/onderhoud/AdminItems/MyOrders/ShowOrder.php?AdminItem=251&Order=${order.id}`" target="_blank" class="underline font-bold">Ga naar order</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api } from '../plugins/utils'
import { useMain } from '../store/main'


export default {
    setup() {
        const main = useMain()
        return { main }
    },
    data() {
        return {
            order: {},
            code: null,
            created_at: {},
            usedOrders: []
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
                const data = res.data
                this.order = data.order
                this.created_at = data.created_at
                this.code = data.code
                this.usedOrders = data.usedOrders
            })
        },
        handleSubmit(e) {
            this.getReferralcode(e.target.elements.code.value)
        }
    },
    computed: {
        getCustomer() {
            const customer = this.order.customer
            return {
                name: customer.billingaddress.full_name,
                telephone: customer.billingaddress.telephone,
                email: customer.email
            }
        }
    }
}

</script>