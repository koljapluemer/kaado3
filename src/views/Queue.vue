<script setup>
  import { ref, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useCardsStore } from '../stores/cards'

  const store = useCardsStore()

  // reveal logic
  const isRevealed = ref(false)
  function review() {
    isRevealed.value = false
    store.getNewQueueCard()
  }
</script>

<template>
  <div class="p1" >
    <div v-if="store.getQueueCard" class="p2 border">
      <div id="front">
        {{ store.getQueueCard.front }}
      </div>
      <div id="back" v-if="isRevealed">
        <hr>
        {{ store.getQueueCard.back }}
      </div>
    </div>
    <p v-else>
      cards loading...
    </p> 
    <button class="mt2" @click="review" v-if="isRevealed">
      Show Next
    </button>
    <button class="mt2" @click="isRevealed = !isRevealed" v-else>
      Reveal
    </button>
  </div>

</template>