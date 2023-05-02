<script setup>

import { useCardsStore } from '../stores/cards'
const store = useCardsStore()

</script>

<template>
    <div class="" v-if="store.cardsLoaded">
        <h1>Your Cards:</h1>
        <p>
            {{ store.cards.length }} cards.
        </p>
        <div class="flex flex-column ">
            <router-link class="m1" v-for="card in store.cards" :key="card.id" :to="{ name: 'CardEdit', params: { id: card.id } }">
                {{ card.front }}
            </router-link>
        </div>
    </div>
    <p v-else>
        cards loading...
    </p>
</template>