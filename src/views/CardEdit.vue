<!-- edit card, getting id from router -->
<script setup>
import { ref } from 'vue'
import { useCardsStore } from '../stores/cards'
import { useRoute } from 'vue-router'
import CardForm from '../components/CardForm.vue'

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
    <CardForm :card="card" :mode="'edit'" />
</template>