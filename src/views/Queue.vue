<script setup>
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCardsStore } from '../stores/cards'
import Markdown from "vue3-markdown-it";

const fsrs = require("./sr.js")

const components = {
  Markdown
}

const store = useCardsStore()

const currentCard = store.getQueueCard
console.log('currentCard', currentCard)

// reveal logic
const isRevealed = ref(false)
function review(feedback) {
  isRevealed.value = false
  // logic to update card
  // TODO: add missing properties when necessary: occurrences, ease, due, parents, children, siblings
  // handle due logic (TODO: differentiate between card types and feedback, for now always set to 24 hours from now
  // HANDLE LOGIC WHEN 'learn'
  const card = store.queueCard

  if (card.type == 'learn') {
    console.log('Grading Learn Card')
    let grade = -1
    if (feedback == 'wrong') {
      grade = 0
    } else if (feedback == 'good') {
      grade = 1
    } else if (feedback == 'easy') {
      grade = 2
    }
    const cardData = {
      id: card.id
    }
    const globalData = null
    const outputData = fsrs(cardData, grade, globalData)
    console.log('outputData', outputData)

  }
  card.due = new Date(Date.now() + 24 * 60 * 60 * 1000)
  console.log('sending card to store: ', card)

  store.updateCard(card)
  store.getNewQueueCard()
}

// use card value as a ref
const card = ref(store.queueCard)

function deleteCard() {
  if (confirm('Are you sure you want to delete this card?')) {
    store.deleteCard(store.queueCard)
    store.getNewQueueCard()
  }
}

function openQueueCard(id) {
  console.log('Queue: opening card with id: ', id)
  store.openQueueCard(id)
}

// allow to filter card by having a computed cards array based on store.cards
const searchTerm = ref('')
const cards = computed(() => {
  return store.cards.filter(card => {
    return card.front.toLowerCase().includes(searchTerm.value.toLowerCase())
  })
})
</script>

<template>
  <div class="p1 flex justify-between items-start ">
    <div id="menu" class="flex flex-column gap border-right p1">
      <!-- Edit button -->
      <router-link v-slot="{ edit }" v-if="store.cardsLeftToDo && store.queueCard"
        :to="{ name: 'CardEdit', params: { id: store.queueCard.id } }">
        <button @click="edit" role="link" class="w-full">
          Edit
        </button>
      </router-link>
      <!-- Add button -->
      <router-link v-slot="{ add }" :to="{ name: 'CardAdd' }">
        <button @click="add" role="link" class="w-full">
          Add
        </button>
      </router-link>
      <!-- open browser confirmation prompt before deleting!! -->
      <button v-if="store.cardsLeftToDo && store.queueCard" @click="deleteCard">
        Delete
      </button>
    </div>
    <div class="flex-auto flex flex-column items-center p2" v-if="store.cardsLeftToDo">
      <div id="card" class="bg-blue max-width-4 fit mb4" style="width: 100%">
        <div id="card-info" class="mb2 flex gap ">
          <code class="">{{ store.queueCard.type }}</code>
          <div class="border-right"></div>
          <code v-for="tag in store.queueCard.taglist" class="border-right" :key="tag">
                    {{ tag }}
                  </code>
        </div>
        <div class="p2 border fit">
          <Markdown id="front" class="" :source="store.queueCard.front" />
          <div class="" v-if="isRevealed && store.queueCard.type == 'learn'">
            <hr>
            <Markdown id="back" v-if="isRevealed" :source="store.queueCard.back" />
          </div>
        </div>

      </div>

      <!-- LEARN -->
      <div v-if="store.queueCard.type == 'learn'">
        <button class="mt2" @click=" isRevealed = !isRevealed" v-if="!isRevealed">
          Reveal
        </button>
        <div class="flex gap" v-else>
          <button class="mt2" @click=" review('wrong')">
            Wrong
          </button>
          <button class="mt2" @click=" review('good')">
            Good
          </button>
          <button class="mt2" @click=" review('easy')">
            Easy
          </button>
        </div>
      </div>

      <!-- HABIT -->
      <div class="flex gap" v-if="store.queueCard.type == 'habit'">
        <button class="mt2" @click=" review('not-today')">
          Not Today
        </button>
        <button class="mt2" @click=" review('do-later')">
          Do Later
        </button>
        <button class="mt2" @click=" review('done')">
          Done
        </button>
      </div>

      <!-- CHECK -->
      <div class="flex gap" v-if="store.queueCard.type == 'check'">
        <button class="mt2" @click=" review('no')">
          No
        </button>
        <button class="mt2" @click=" review('kind-of')">
          Kind Of
        </button>
        <button class="mt2" @click=" review('yes')">
          Yes
        </button>
      </div>

      <!-- TODO -->
      <div class="flex gap" v-if="store.queueCard.type == 'todo'">
        <button class="mt2" @click=" review('not-today')">
          Not Today
        </button>
        <button class="mt2" @click=" review('do-later')">
          Do Later
        </button>
        <button class="mt2" @click=" review('done')">
          Done
        </button>
      </div>

      <!-- ARTICLE -->
      <div class="flex gap" v-if="store.queueCard.type == 'article'">
        <button class="mt2" @click=" review('not-today')">
          Not Today
        </button>
        <button class="mt2" @click=" review('do-later')">
          Do Later
        </button>
        <button class="mt2" @click=" review('made-some-progress')">
          Made Some Progress
        </button>
        <button class="mt2" @click=" review('finished')">
          Finished
        </button>
      </div>

      <!-- BOOK -->
      <div class="flex gap" v-if="store.queueCard.type == 'book'">
        <button class="mt2" @click=" review('not-today')">
          Not Today
        </button>
        <button class="mt2" @click=" review('do-later')">
          Do Later
        </button>
        <button class="mt2" @click=" review('done')">
          Done
        </button>
        <button class="mt2" @click=" review('finished')">
          Finished Book
        </button>
      </div>

      <!-- PROJECT -->
      <div class="flex gap" v-if="store.queueCard.type == 'project'">
        <button class="mt2" @click=" review('done')">
          Ok, got it scheduled
        </button>
      </div>

      <!-- MISC -->
      <div class="flex gap" v-if="store.queueCard.type == 'misc' || !store.queueCard.type">
        <button class="mt2" @click=" review('show-next')">
          I already knew that...
        </button>
        <button class="mt2" @click=" review('cool-thanks')">
          Cool, thanks!
        </button>
      </div>
    </div>
    <p v-else class="center flex-auto">
      cards loading...
    </p>
    <div class="flex flex-column gap border-left p1" style="min-width: 350px ;">
      <input type="text" v-model="searchTerm" placeholder="Filter cards..." class="p1" />
      <div class="flex flex-column overflow-auto" style="max-height: 70vh">
        <button class="m1" v-for="card in cards" :key="card.id" @click="openQueueCard(card.id)">
          <small>
            {{ card.front.length > 25 ? card.front.substring(0, 30) + '...' : card.front }}
          </small>
        </button>
      </div>
    </div>

  </div>
</template>