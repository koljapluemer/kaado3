<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCardsStore } from '../stores/cards'
import Markdown from "vue3-markdown-it";

const components = {
  Markdown
}

const store = useCardsStore()

// reveal logic
const isRevealed = ref(false)
function review() {
  isRevealed.value = false
  store.getNewQueueCard()
}
</script>

<template>
  <div class="p1 flex justify-center flex-column items-center max-width-4 ml-auto mr-auto">
    <div v-if="store.getQueueCard" class="p2 border width-full fit" style="width: 100%">
      <Markdown id="front" :source="store.getQueueCard.front" />
      <div class="" v-if="isRevealed">
        <hr>
        <Markdown id="back" v-if="isRevealed" :source="store.getQueueCard.back" />
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