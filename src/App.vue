<template>
  <div id="app-wrapper" class="p2">
    <header class="mb3">
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
        <li class="m2">
          <router-link :to="{ name: 'CardExport' }">Export Cards</router-link>
        </li>
      </nav>

    </header>


    <main>
      <div class="" v-if="!store.cardsLoaded">loading...</div>
      <router-view v-else />
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


</script>