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
    <form class="p3 border" @submit.prevent="addCard">
        <label for="type">Type</label>
        <select id="type" v-model="card.type">
            <option value="learn">Learn</option>
            <option value="habit">Habit</option>
            <option value="todo">Todo</option>
            <option value="check">Check</option>
            <option value="article">Article</option>
            <option value="book">Book</option>
            <option value="misc">Misc</option>
        </select>
        <label for="front">Front</label>
        <textarea id="front" v-model="card.front" rows="20" cols="80"></textarea>
        <div class="" v-if="card.type == 'learn'">
            <label for="back">Back</label>
            <textarea id="back" v-model="card.back" rows="20" cols="80"></textarea>
        </div>

        <hr>
        <!-- is_active, is_priority, is_started -->
        <div class="flex gap items-center">
            <input type="checkbox" id="is_active" v-model="card.is_active">
            <label for="is_active">active</label>
        </div>

        <div class="flex gap items-center">
            <input type="checkbox" id="is_priority" v-model="card.is_priority">
            <label for="is_priority">high priority</label>
        </div>

        <div class="flex gap items-center" v-if="card.type == 'book'">
            <input type="checkbox" id="is_started" v-model="card.is_started">
            <label for="is_started">book started</label>
        </div>
        <hr>
    </form>
    <button type="submit" @click="updateCard">Save</button>
</template>