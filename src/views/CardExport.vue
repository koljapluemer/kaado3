<script setup>
import { ref } from 'vue'
import { VueCsvToggleHeaders, VueCsvSubmit, VueCsvMap, VueCsvInput, VueCsvErrors, VueCsvImport } from 'vue-csv-import';
import { useCards } from '../stores/cards'

const { cards } = useCards()

const filename = 'data.json';
const jsonStr = JSON.stringify(cards.value);

let element = document.createElement('a');
element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
element.setAttribute('download', filename);

element.style.display = 'none';
document.body.appendChild(element);

element.click();

document.body.removeChild(element);
</script>

<template>
    <h1>Export Cards</h1>
</template>