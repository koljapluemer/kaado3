<template>
    <!-- basic form to add a new editCard -->
    <form class="p3 border" @submit.prevent="addeditCard">
        <label for="type">Type</label>
        <select id="type" v-model="editCard.type">
            <option value="learn">Learn</option>
            <option value="habit">Habit</option>
            <option value="todo">Todo</option>
            <option value="check">Check</option>
            <option value="article">Article</option>
            <option value="book">Book</option>
            <option value="misc">Misc</option>
        </select>
        <label for="front">Front</label>
        <textarea id="front" v-model="editCard.front" rows="20" cols="80"></textarea>
        <div class="" v-if="editCard.type == 'learn'">
            <label for="back">Back</label>
            <textarea id="back" v-model="editCard.back" rows="20" cols="80"></textarea>
        </div>

        <hr>

        <!-- <VoerroTagsInput element-id="tags" v-model="editCard.tags" :existing-tags="[
                { key: 1, value: 'Web Development' },
                { key: 2, value: 'PHP' },
                { key: 3, value: 'JavaScript' },
            ]" :typeahead="true">
        </VoerroTagsInput> -->


        <!-- is_active, is_priority, is_started -->
        <div class="flex gap items-center">
            <input type="checkbox" id="is_active" v-model="editCard.is_active">
            <label for="is_active">active</label>
        </div>

        <div class="flex gap items-center">
            <input type="checkbox" id="is_priority" v-model="editCard.is_priority">
            <label for="is_priority">high priority</label>
        </div>

        <div class="flex gap items-center" v-if="editCard.type == 'book'">
            <input type="checkbox" id="is_started" v-model="editCard.is_started">
            <label for="is_started">book started</label>
        </div>
        <hr>
    </form>
    <button type="submit" @click="updateeditCard">Save</button>

    <!-- is_started: {{  editCard.is_started }} -->
    editCard: {{ editCard }}
</template>

<script>
import { ref } from 'vue'
import { useCardsStore } from '../stores/cards'
import { v4 as uuidv4 } from 'uuid';
import VoerroTagsInput from '@voerro/vue-tagsinput';

import { defineProps } from 'vue'

export default {
    name: 'CardForm',
    props: ['card', 'mode'],
    setup(props) {
        const store = useCardsStore()

        // props "editCard" and "mode" are passed in 
        // mode is either "edit" or "add"
        const editCard = ref(props.card)


        const tags = ref([])

        function updateCard() {
            if (props.mode == "add") {
                store.addCard(editCard.value)
                editCard.value = {}
            }
            else if (props.mode == "edit") {
                store.updateCard(editCard.value)
            }
        }

        return {
            editCard,
            tags,
        }

    }
}

// id: uuidv4(),
// is_active: true,
// is_priority: false,
// is_started: false,
// occurrences: 0,
// ease: 1,
// repetitions: 0,
// interval: 1,
// type: 'misc',
// front: '',
// back: '',
// const editCard = ref(
//     props.editCard
// )

</script>