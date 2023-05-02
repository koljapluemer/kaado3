<script setup>

import { useCardsStore } from '../stores/cards'
const store = useCardsStore()

</script>

<template>
    <h1>Your Cards:</h1>
    <p>
        {{ store.cards.length }} cards.
    </p>
    <div class="flex flex-column ">
        <button class="m1" v-for="card in store.cards" :key="card.id">
            <div class="front">
                {{ card.front }}
            </div>
        </button>
    </div>
</template>