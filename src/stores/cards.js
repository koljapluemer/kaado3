import { defineStore } from 'pinia'
import { v4 as uuidv4 } from "uuid";


export const useCardsStore = defineStore({
  id: 'cards',
  state: () => ({
    cards: [],
    queueCard: {},
  }),
  getters: {
    getQueueCard: (state) => {
      // if queueCard is empty, set it to a random new one
      if (!state.queueCard.id) {
        state.queueCard = state.cards[Math.floor(Math.random() * state.cards.length)];
      }
      return state.queueCard;
    }
  },
  actions: {
    async addCard(card) {
      this.cards.push(card);
    },
    async updateCard(updatedCard) {
      const index = this.cards.findIndex((c) => c._id === updatedCard._id);
      if (index !== -1) {
        this.cards.splice(index, 1, updatedCard);
      }
    },
    async deleteCard(front) {
      console.log('deleting card: ', front);
      const index = this.cards.findIndex((c) => c.front === front);
      console.log('index: ', index);
      if (index !== -1) {
        this.$delete(this.cards, index);
        console.log('deleted card');
      } else {
        console.log('card not found');
      }
    },
    getNewQueueCard() {
      // filter for cards where dueAt does not exist or is in the past, also type cannot be undefined
      // const filteredCards = this.cards.filter((c) => !c.dueAt || c.dueAt < new Date() && c.type !== undefined);
      const filteredCards = this.cards
      const randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)];
      console.log('new queue card: ', randomCard);

      // if queueCard has no id, add one
      if (!randomCard.id) {
        randomCard.id = uuidv4();
      }
      this.queueCard = randomCard;

      // if undefined, set queueCard to {}
      if (!this.queueCard) {
        this.queueCard = {};
      }
    }
  },
  persist: {
    storage: localStorage,
  },
})

