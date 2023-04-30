<script setup>
  import { storeToRefs } from 'pinia'
  import { useCardsStore } from '../stores/cards'

  const store = useCardsStore()
</script>

<template>
  <h2>Queue</h2>
  <div>
    <p v-if="store.getQueueCard">
      {{ store.getQueueCard.front }}
    </p>
    <p v-else>
      cards loading...
    </p> 
    <button @click="queueCard">
      Show Next
    </button>
  </div>

</template>