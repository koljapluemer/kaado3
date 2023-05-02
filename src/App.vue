<template>
  <div id="app-wrapper">
    <header id="desktop-header">
      <nav class="list-reset flex">
        <li class="m2">
          <router-link :to="{ name: 'Queue' }">Queue</router-link>
        </li>
        <li class="m2">
          <router-link :to="{ name: 'CardList' }">Cards</router-link>
        </li>
        <li class="m2">
          <router-link :to="{ name: 'CardAdd' }">Add Card</router-link>
        </li>
        <li class="m2">
          <router-link :to="{ name: 'CardImport' }">Import Cards</router-link>
        </li>
      </nav>

    </header>


    <main>
      <router-view />
    </main>
  </div>
  <!-- 
  <component is="script" data-goatcounter="https://kaado-3353450qe3232.goatcounter.com/count" async
    src="//gc.zgo.at/count.js"></component> -->
</template>
<script setup>
import { useCardsStore } from './stores/cards'
import { watch } from 'vue'

const store = useCardsStore()
// run loadCardsFromPouchDB()  first thing
store.loadCardsFromPouchDB()

//  add a watcher for store.cards that saves to PouchDB
//  whenever store.cards changes
watch(() => store.cards, () => {
  store.saveAllCardsToPouchDB()
}, { deep: true })
</script>