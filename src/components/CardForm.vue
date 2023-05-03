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

        <vue3-tags-input :tags="card.taglist" placeholder="input tags" class="mb3" />

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
    <button type="submit" @click="updateCard">Save</button>

    <!-- is_started: {{  editCard.is_started }} -->
    editCard: {{ editCard }}
</template>

<script>
import { ref } from 'vue'
import { useCardsStore } from '../stores/cards'
import { v4 as uuidv4 } from 'uuid';
import Vue3TagsInput from 'vue3-tags-input';

import { defineProps } from 'vue'

export default {
    name: 'CardForm',
    props: ['card', 'mode'],
    components: {
        Vue3TagsInput
    },
    setup(props) {
        const store = useCardsStore()

        // props "editCard" and "mode" are passed in 
        // mode is either "edit" or "add"
        const editCard = ref(props.card)
        // if tags of card is a string, convert to array
        if (typeof editCard.value.tags == 'string') {
            editCard.value.taglist = editCard.value.tags.split(' ')
        } else {
            // if taglist does not exist, create empty array
            if (!editCard.value.taglist) {
                editCard.value.taglist = []
            }
        }


        const tags = ref([])

        function updateCard() {
            console.log('COMPONENT: updateCard')
            if (props.mode == "add") {
                console.log('COMPONENT: addCard')
                store.addCard(editCard.value)
                editCard.value = {}
            }
            else if (props.mode == "edit") {
                console.log('COMPONENT: updateCard')
                store.updateCard(editCard.value)
            }
        }


        return {
            editCard,
            tags,
            updateCard
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