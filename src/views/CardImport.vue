<script setup>
import { ref } from 'vue'
import { VueCsvToggleHeaders, VueCsvSubmit, VueCsvMap, VueCsvInput, VueCsvErrors, VueCsvImport } from 'vue-csv-import';
import { useCardsStore } from '../stores/cards'

const store = useCardsStore()

const csvCards = ref([])
async function importCards() {
    console.log(`importing ${csvCards.value.length} cards`)
    // append cards to store
    store.cards = [...store.cards, ...csvCards.value]
    console.log(`Store now has ${store.cards.length} cards`)
}
</script>

<template>
    <h1>Import Cards</h1>

    <!-- fields: front, back, type, tags, is_active, is_priority, is_started, interval -->
    <vue-csv-import v-model="csvCards"
        :fields="{ front: { required: false, label: 'Front' }, back: { required: false, label: 'Back' }, type: { required: false, label: 'Type' }, tags: { required: false, label: 'Tags' }, is_active: { required: false, label: 'Is Active' }, is_priority: { required: false, label: 'Is Priority' }, is_started: { required: false, label: 'Is Started' }, interval: { required: false, label: 'Interval' } }">
        <vue-csv-toggle-headers></vue-csv-toggle-headers>
        <vue-csv-errors></vue-csv-errors>
        <vue-csv-input></vue-csv-input>
        <vue-csv-map></vue-csv-map>
    </vue-csv-import>
    <button @click="importCards">Import</button>
</template>