<!-- edit card, getting id from router -->
<script setup>
import { ref } from 'vue'
import { useCardsStore } from '../stores/cards'
import { useRoute } from 'vue-router'

const store = useCardsStore()
const route = useRoute()

// get id from router
const id = route.params.id
// get card from store
const card = store.cards.find(card => card.id === id)

function updateCard() {
    store.updateCard(card)
}

</script>

<template>
    <!-- basic form to add a new card -->
    <form class="p1 border" @submit.prevent="addCard">
        <label for="front">Front</label>
        <input id="front" v-model="card.front" />
        <label for="back">Back</label>
        <input id="back" v-model="card.back" />
        <button type="submit" @click="updateCard">Edit Card</button>
    </form>
</template>