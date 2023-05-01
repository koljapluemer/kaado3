<script setup>
import { ref } from 'vue'
import { useCardsStore } from '../stores/cards'

const store = useCardsStore()

const newCard = ref({
    front: '',
    back: ''
})

function addCard() {
    store.addCard(newCard.value)
    newCard.value = {
        front: '',
        back: ''
    }
}

</script>

<template>
    <!-- basic form to add a new card -->
    <form class="p1 border" @submit.prevent="addCard">
        <label for="front">Front</label>
        <input id="front" v-model="newCard.front" />
        <label for="back">Back</label>
        <input id="back" v-model="newCard.back" />
        <button type="submit">Add Card</button>
    </form>
</template>