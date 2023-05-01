<template>
  <div id="app-wrapper">
    <header id="desktop-header">
      <nav class="list-reset flex">
        <li class="m2">
          <router-link :to="{name: 'Queue'}">Queue</router-link>
        </li>
        <li class="m2">
          <router-link :to="{name: 'CardList'}">Cards</router-link>
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
<script>

export default {
  name: "App",
  el: "#app"
};
</script>
