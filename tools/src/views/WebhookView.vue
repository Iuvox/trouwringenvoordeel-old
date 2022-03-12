<template>
    <div class="grid grid-cols-2 gap-20">
        <div>
            <table class="border-collapse table-auto">
                <thead>
                    <tr>
                        <th
                            class="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-800 text-left"
                        >Aangemaakt op</th>
                        <th
                            class="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-800 text-left"
                        >Event</th>
                        <th
                            class="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-800 text-left"
                        >Actief?</th>
                        <th
                            class="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-800 text-left"
                        >Target Url</th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <tr v-for="item in items">
                        <td
                            class="border-b border-slate-100 p-4 pl-8 text-slate-500"
                        >{{ item.createdate }}</td>
                        <td
                            class="border-b border-slate-100 p-4 pl-8 text-slate-500"
                        >{{ item.event }}</td>
                        <td
                            class="border-b border-slate-100 p-4 pl-8 text-slate-500 text-center"
                            role="button"
                            @click="toggleItem(item)"
                        >
                            <span v-if="item.is_active">🟢</span>
                            <span v-else>🔴</span>
                        </td>
                        <td
                            class="border-b border-slate-100 p-4 pl-8 text-slate-500"
                        >{{ item.address }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="w-2/3">
            <h2 class="font-bold text-2xl">Voeg Webhook toe</h2>
            <form @submit.prevent="createWebhook()">
                <div>
                    <label for="href" class="block text-lg">Href</label>
                    <input
                    v-model="webhookAdd.href"
                        id="href"
                        class="border-solid border-slate-100 border-2 rounded-md px-3 py-1 w-full"
                    />
                </div>
                <div>
                    <label for="event" class="block text-lg">Event</label>
                    <input v-model="webhookAdd.event" list="event" name="browser" id="browser" role="button" class="border-solid border-slate-100 border-2 rounded-md px-3 py-1 w-full"/>

                    <datalist id="event"  >
                        <option value="orders.created">Created Order</option>
                        <option value="orders.updated.status">Updated Order Status</option>
                    </datalist>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { api } from "../plugins/utils"

export default {
    data() {
        return {
            webhooks: {},
            webhookAdd: {
                event: null,
                href: null,
            }
        }
    },
    mounted() {
        this.getWebhooks()
    },
    methods: {
        getWebhooks() {
            api.get('/webhook/ccvshop').then(res => {
                this.webhooks = res.data
            })
        },
        toggleItem(item) {
            item.is_active = !item.is_active
            api.patch(`/webhook/ccvshop/${item.id}`, {
                address: item.address,
                is_active: item.is_active,
            })
        },
        createWebhook() {
            api.post('/webhook/ccvshop',{
                event: this.webhookAdd.event,
                address: this.webhookAdd.href
            })
        }
    },
    computed: {
        items() {
            return this.webhooks.items
        }
    }
}
</script>