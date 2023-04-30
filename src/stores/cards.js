import { defineStore } from 'pinia'
import { v4 as uuidv4 } from "uuid";


export const useCardsStore = defineStore({
  id: 'cards',
  state: () => ({
    cards : [
        {
            id: uuidv4(),
            front: 'Germany',
            back: 'Berlin',
            type: 'learn',
        },
        {
            id: uuidv4(),
            front: 'France',
            back: 'Paris',
            type: 'learn',
        },
        {
            id: uuidv4(),
            front: 'Italy',
            back: 'Rome',
            type: 'learn',
        }
    ],
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
      const response = await db.post(card);
      card.id = response.id;
      this.cards.push(card);
    },
    async updateCard(updatedCard) {
      await db.put(updatedCard);
      const index = this.cards.findIndex((c) => c._id === updatedCard._id);
      if (index !== -1) {
        this.cards.splice(index, 1, updatedCard);
      }
    },
    async deleteCard(id) {
      const card = await db.get(id);
      await db.remove(card);
      const index = this.cards.findIndex((c) => c._id === id);
      if (index !== -1) {
        this.cards.splice(index, 1);
      }
    },
    getNewQueueCard() {
        this.queueCard = this.cards[Math.floor(Math.random() * this.cards.length)];
    }
  }
})

