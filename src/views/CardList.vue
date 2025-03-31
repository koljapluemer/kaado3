<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCards } from '../stores/cards'

const { cards } = useCards()

// allow to filter card by having a computed cards array based on cards ref
const searchTerm = ref('')
const tagSearchTerm = ref('')
const cardTags = ref([])

const tagsHideCards = ref(false)
const cardsMustHaveAllTags = ref(false)

const tags = computed(() => {
    // extract all tags from cards
    console.log('cardTags', cardTags)
    return cardTags.value.filter(tag => {
        return tag.name.toLowerCase().includes(tagSearchTerm.value.toLowerCase())
    })
})

// extract tags from cards once at mounted
onMounted(() => {
    // extract all tags from cards and create a list storing the name of tag and a bool that is true by default
    // only unique tags
    const tagsFromCards = cards.value.flatMap(card => card.taglist).filter((tag, index, self) => {
        return self.indexOf(tag) === index
    })
    console.log('tagsFromCards', tagsFromCards)
    cardTags.value = tagsFromCards.map(tag => {
        return { name: tag, selected: true }
    })
})

const filteredCards = computed(() => {
    const cardsFilteredBySearch = cards.value.filter(card => {
        return card.front.toLowerCase().includes(searchTerm.value.toLowerCase())
    })
    // filter by tags, depending on state of tagsHideCards and cardsMustHaveAllTags
    const cardsFilteredByTags = cardsFilteredBySearch.filter(card => {
        // if tagsHideCards is true, hide cards that have any of the selected tags
        if (tagsHideCards.value) {
            // if cardsMustHaveAllTags is true, hide cards that have all of the selected tags
            if (cardsMustHaveAllTags.value) {
                // if card has all of the selected tags, return false to hide it
                return !card.taglist.some(tag => {
                    return cardTags.value.filter(tag => tag.selected).map(tag => tag.name).includes(tag)
                })
            } else {
                // if card has any of the selected tags, return false to hide it
                return !card.taglist.some(tag => {
                    return cardTags.value.filter(tag => tag.selected).map(tag => tag.name).includes(tag)
                })
            }
        } else {
            // if tagsHideCards is false, show cards that have any of the selected tags
            if (cardsMustHaveAllTags.value) {
                // if card has all of the selected tags, return true to show it
                return card.taglist.some(tag => {
                    return cardTags.value.filter(tag => tag.selected).map(tag => tag.name).includes(tag)
                })
            } else {
                // if card has any of the selected tags, return true to show it
                return card.taglist.some(tag => {
                    return cardTags.value.filter(tag => tag.selected).map(tag => tag.name).includes(tag)
                })
            }
        }
    })
    return cardsFilteredByTags
})
</script>

<template>
    <div class="flex">
        <div class="flex flex-column gap border-right  p1" style="min-width: 350px ;">
            <div>
                <!-- select between show and hide (dropdown with options) -->
                <select v-model="tagsHideCards">
                    <option value="false">Show</option>
                    <option value="true">Hide</option>
                </select>
                <span> cards that have </span>
                <!-- select between all and any -->
                <select v-model="cardsMustHaveAllTags">
                    <option value="false">any</option>
                    <option value="true">all</option>
                </select>
                <span> of the following tags:</span>
            </div>

            <input type="text" v-model="tagSearchTerm" placeholder="Filter tags..." class="p1" />

            <div class="m1 flex gap items-center" v-for="tag in tags" :key="tag">
                <input type="checkbox" v-model="tag.selected" />
                <small>{{ tag.name }}</small>
            </div>
        </div>
        <div class="flex flex-column gap  p1" style="min-width: 350px ;">
            <input type="text" v-model="searchTerm" placeholder="Filter cards..." class="p1" />
            <div class="flex flex-column overflow-auto" style="max-height: 70vh">
                <div class="m1 flex gap items-center" v-for="card in filteredCards" :key="card.id">
                    <small class="flex-auto">
                        {{ card.front.length > 100 ? card.front.substring(0, 100) + '...' : card.front }}
                    </small>

                    <router-link class="m1" :key="card.id" :to="{ name: 'CardEdit', params: { id: card.id } }">
                        <svg class="icon" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"
                            viewBox="0 0 24 24" @click="editOther" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>