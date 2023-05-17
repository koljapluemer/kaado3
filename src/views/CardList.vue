<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCardsStore } from '../stores/cards'
const store = useCardsStore()

// allow to filter card by having a computed cards array based on store.cards
const searchTerm = ref('')
const cards = computed(() => {
    return store.cards.filter(card => {
        return card.front.toLowerCase().includes(searchTerm.value.toLowerCase())
    })
})

</script>

<template>
    <div class="flex">
        <div class="flex flex-column gap  p1" style="min-width: 350px ;">
            <input type="text" v-model="searchTerm" placeholder="Filter cards..." class="p1" />
            <div class="flex flex-column overflow-auto" style="max-height: 70vh">
                <div class="m1 flex gap items-center" v-for="card in cards" :key="card.id">
                    <small class="flex-auto">
                        {{ card.front.length > 100 ? card.front.substring(0, 100) + '...' : card.front }}
                    </small>

                    <router-link class="m1" :key="card.id"
                        :to="{ name: 'CardEdit', params: { id: card.id } }">
                        <svg class="icon" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"
                            viewBox="0 0 24 24" @click="editOther" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </router-link>

                </div>
            </div>
        </div>
    </div>
</template>