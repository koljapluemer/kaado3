<template>
  <div id="app-wrapper">
    <header id="desktop-header">
      <div>
        <h1 class="font-bold text-xl">
          <router-link to="/">Kaado.</router-link>
        </h1>
        <!-- <nav>
          <router-link to="/" class="button button-primary small-button" id="lefts-go">Let's Go!</router-link>
          <router-link to="/new">Add</router-link>
          <router-link to="/list">My Cards</router-link>
        </nav> -->
      </div>

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
