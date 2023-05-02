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
function review(feedback) {
  isRevealed.value = false
  store.getNewQueueCard()
}
</script>

<template>
  <div class="p1 flex justify-center flex-column items-center max-width-4 ml-auto mr-auto">
  
    <div id="card" v-if="store.getQueueCard" class="p2 border width-full fit" style="width: 100%">
      <div id="card-info">
      <code>{{ store.getQueueCard.type }}</code>
    </div>
      <Markdown id="front" :source="store.getQueueCard.front" />
      <div class="" v-if="isRevealed && store.getQueueCard.type == 'learn'">
        <hr>
        <Markdown id="back" v-if="isRevealed" :source="store.getQueueCard.back" />
      </div>
    </div>
    <p v-else>
      cards loading...
    </p>

    <!-- LEARN -->
    <div v-if="store.getQueueCard.type == 'learn'">
      <button class="mt2" @click="isRevealed = !isRevealed" v-if="!isRevealed">
        Reveal
      </button>
      <div class="flex gap" v-else>
        <button class="mt2" @click="review('blackout')">
          Blackout
        </button>
        <button class="mt2" @click="review('wrong')">
          Wrong
        </button>
        <button class="mt2" @click="review('incorrect-but-remembered')">
          Incorrect But Remembered
        </button>
        <button class="mt2" @click="review('correct-but-hard')">
          Correct But Hard
        </button>
        <button class="mt2" @click="review('good')">
          Good
        </button>
      </div>
    </div>

    <!-- HABIT -->
    <div class="flex gap" v-if="store.getQueueCard.type == 'habit'">
      <button class="mt2" @click="review('not-today')">
        Not Today
      </button>
      <button class="mt2" @click="review('do-later')">
        Do Later
      </button>
      <button class="mt2" @click="review('done')">
        Done
      </button>
    </div>

    <!-- CHECK -->
    <div class="flex gap" v-if="store.getQueueCard.type == 'check'">
      <button class="mt2" @click="review('no')">
        No
      </button>
      <button class="mt2" @click="review('kind-of')">
        Kind Of
      </button>
      <button class="mt2" @click="review('yes')">
        Yes
      </button>
    </div>

    <!-- TODO -->
    <div class="flex gap" v-if="store.getQueueCard.type == 'todo'">
      <button class="mt2" @click="review('not-today')">
        Not Today
      </button>
      <button class="mt2" @click="review('do-later')">
        Do Later
      </button>
      <button class="mt2" @click="review('done')">
        Done
      </button>
    </div>

    <!-- MISC -->
    <div class="flex gap" v-if="store.getQueueCard.type == 'misc'">
      <button class="mt2" @click="review('show-next')">
        I already knew that...
      </button>
      <button class="mt2" @click="review('cool-thanks')">
        Cool, thanks!
      </button>
    </div>

    <!-- ARTICLE -->
    <div class="flex gap" v-if="store.getQueueCard.type == 'article'">
      <button class="mt2" @click="review('not-today')">
        Not Today
      </button>
      <button class="mt2" @click="review('do-later')">
        Do Later
      </button>
      <button class="mt2" @click="review('made-some-progress')">
        Made Some Progress
      </button>
      <button class="mt2" @click="review('finished')">
        Finished
      </button>
    </div>

    <!-- BOOK -->
    <div class="flex gap" v-if="store.getQueueCard.type == 'book'">
      <button class="mt2" @click="review('not-today')">
        Not Today
      </button>
      <button class="mt2" @click="review('do-later')">
        Do Later
      </button>
      <button class="mt2" @click="review('done')">
        Done
      </button>
      <button class="mt2" @click="review('finished')">
        Finished Book
      </button>
    </div>

    <!-- PROJECT -->
    <div class="flex gap" v-if="store.getQueueCard.type == 'project'">
      <button class="mt2" @click="review('done')">
        Ok, got it scheduled
      </button>
    </div>


  </div>
</template>