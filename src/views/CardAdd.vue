<script setup>
import { v4 as uuidv4 } from 'uuid';

import { useCardsStore } from '../stores/cards'
import CardForm from '../components/CardForm.vue'

</script>

<template>
      <CardForm :card="{
            id: uuidv4(),
            is_active: true,
            is_priority: false,
            is_started: false,
            occurrences: 0,
            ease: 1,
            repetitions: 0,
            interval: 1,
            type: 'misc',
            front: '',
            back: '',
            taglist: [],
            due: new Date().getTime()
      }" :mode="'add'" />

  
</template>