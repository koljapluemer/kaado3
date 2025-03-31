<!-- edit card, getting id from router -->
<script setup>
import { ref, computed } from 'vue'
import { useCards } from '../stores/cards'
import { useRoute } from 'vue-router'
import CardForm from '../components/CardForm.vue'

const { cards } = useCards()
const route = useRoute()

// get id from router
const id = route.params.id
// get card from cards ref
const card = computed(() => cards.value.find(card => card.id === id))
</script>

<template>
    <CardForm :card="card" :mode="'edit'" />
</template>