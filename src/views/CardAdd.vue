<script setup>
import { useCardsStore } from '../stores/cards'
import CardForm from '../components/CardForm.vue'

</script>

<template>
      <CardForm :card="{}" :mode="'add'" />
</template>