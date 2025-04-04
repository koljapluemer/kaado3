<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCards } from '../stores/cards'
import Markdown from "vue3-markdown-it";

const fsrs = require("./sr.js")

const components = {
  Markdown
}

const { cards, queueCard, cardsLeftToDo, getQueueCard, openQueueCard, updateCard, deleteCard, getNewQueueCard } = useCards()

// reveal logic
const isRevealed = ref(false)
function review(feedback) {
  isRevealed.value = false
  // logic to update card
  // TODO: add missing properties when necessary: occurrences, ease, due, parents, children, siblings
  // handle due logic (TODO: differentiate between card types and feedback, for now always set to 24 hours from now
  // HANDLE LOGIC WHEN 'learn'
  const card = queueCard.value

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

  if (feedback == 'finished') {
    card.type = 'misc'
  }

  card.due = new Date(Date.now() + 24 * 60 * 60 * 1000)
  console.log('sending card to store: ', card)

  updateCard(card)
  getNewQueueCard()
}

function deleteCardHandler() {
  if (confirm('Are you sure you want to delete this card?')) {
    deleteCard(queueCard.value)
    getNewQueueCard()
  }
}

function openQueueCardHandler(id) {
  console.log('Queue: opening card with id: ', id)
  openQueueCard(id)
}
</script>

<template>
  <div class="p1 flex justify-between items-start ">
    <div id="menu" class="flex flex-column gap border-right p1">
      <!-- Edit button -->
      <router-link v-slot="{ edit }" v-if="cardsLeftToDo && queueCard"
        :to="{ name: 'CardEdit', params: { id: queueCard.id } }">
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
      <button v-if="cardsLeftToDo && queueCard" @click="deleteCardHandler">
        Delete
      </button>
    </div>
    <div class="flex-auto flex flex-column items-center p2" v-if="cardsLeftToDo">
      <div id="card" class="bg-blue max-width-4 fit mb4" style="width: 100%">
        <div id="card-info" class="mb2 flex gap ">
          <code class="">{{ queueCard.type }}</code>
          <div class="border-right"></div>
          <code v-for="tag in queueCard.taglist" class="border-right" :key="tag">
            {{ tag }}
          </code>
        </div>
        <div class="p2 border fit">
          <Markdown id="front" class="" :source="queueCard.front" />
          <div class="" v-if="isRevealed && queueCard.type == 'learn'">
            <hr>
            <Markdown id="back" v-if="isRevealed" :source="queueCard.back" />
          </div>
        </div>
      </div>

      <div id="queue-buttons" class="border-top p1 flex justify-center">
        <!-- LEARN -->
        <div v-if="queueCard.type == 'learn'">
          <button class="mt2 button-primary" @click=" isRevealed = !isRevealed" v-if="!isRevealed">
            Reveal
          </button>
          <div class="flex gap" v-else>
            <button class="mt2 button-primary" @click=" review('wrong')">
              Wrong
            </button>
            <button class="mt2 button-primary" @click=" review('good')">
              Good
            </button>
            <button class="mt2 button-primary" @click=" review('easy')">
              Easy
            </button>
          </div>
        </div>

        <!-- HABIT -->
        <div class="flex gap" v-if="queueCard.type == 'habit'">
          <button class="mt2 button-primary" @click=" review('not-today')">
            Not Today
          </button>
          <button class="mt2 button-primary" @click=" review('do-later')">
            Do Later
          </button>
          <button class="mt2 button-primary" @click=" review('done')">
            Done
          </button>
        </div>

        <!-- CHECK -->
        <div class="flex gap" v-if="queueCard.type == 'check'">
          <button class="mt2 button-primary" @click=" review('no')">
            No
          </button>
          <button class="mt2 button-primary" @click=" review('kind-of')">
            Kind Of
          </button>
          <button class="mt2 button-primary" @click=" review('yes')">
            Yes
          </button>
        </div>

        <!-- TODO -->
        <div class="flex gap" v-if="queueCard.type == 'todo'">
          <button class="mt2 button-primary" @click=" review('not-today')">
            Not Today
          </button>
          <button class="mt2 button-primary" @click=" review('do-later')">
            Do Later
          </button>
          <button class="mt2 button-primary" @click=" review('done')">
            Done
          </button>
        </div>

        <!-- ARTICLE -->
        <div class="flex gap" v-if="queueCard.type == 'article'">
          <button class="mt2 button-primary" @click=" review('not-today')">
            Not Today
          </button>
          <button class="mt2 button-primary" @click=" review('do-later')">
            Do Later
          </button>
          <button class="mt2 button-primary" @click=" review('made-some-progress')">
            Made Some Progress
          </button>
          <button class="mt2 button-primary" @click=" review('finished')">
            Finished
          </button>
        </div>

        <!-- BOOK -->
        <div class="flex gap" v-if="queueCard.type == 'book'">
          <button class="mt2 button-primary" @click=" review('not-today')">
            Not Today
          </button>
          <button class="mt2 button-primary" @click=" review('do-later')">
            Do Later
          </button>
          <button class="mt2 button-primary" @click=" review('done')">
            Done
          </button>
          <button class="mt2 button-primary" @click=" review('finished')">
            Finished Book
          </button>
        </div>

        <!-- PROJECT -->
        <div class="flex gap" v-if="queueCard.type == 'project'">
          <button class="mt2 button-primary" @click=" review('done')">
            Ok, got it scheduled
          </button>
        </div>

        <!-- MISC -->
        <div class="flex gap" v-if="queueCard.type == 'misc' || !queueCard.type">
          <button class="mt2 button-primary" @click=" review('show-next')">
            I already knew that...
          </button>
          <button class="mt2 button-primary" @click=" review('cool-thanks')">
            Cool, thanks!
          </button>
        </div>
      </div>
    </div>
    <p v-else class="center flex-auto">
      cards loading...
    </p>
  </div>
</template>