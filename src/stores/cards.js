import { defineStore } from 'pinia'
import { v4 as uuidv4 } from "uuid";


export const useCardsStore = defineStore({
  id: 'cards',
  state: () => ({
    cards: [
      {
        id: uuidv4(),
        front: 'Afghanistan',
        back: 'Kabul',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Albania',
        back: 'Tirana',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Algeria',
        back: 'Algiers',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Andorra',
        back: 'Andorra la Vella',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Angola',
        back: 'Luanda',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Antigua and Barbuda',
        back: "Saint John's",
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Argentina',
        back: 'Buenos Aires',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Armenia',
        back: 'Yerevan',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Australia',
        back: 'Canberra',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Austria',
        back: 'Vienna',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Azerbaijan',
        back: 'Baku',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Bahamas',
        back: 'Nassau',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Bahrain',
        back: 'Manama',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Bangladesh',
        back: 'Dhaka',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Barbados',
        back: 'Bridgetown',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Belarus',
        back: 'Minsk',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Belgium',
        back: 'Brussels',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Belize',
        back: 'Belmopan',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Benin',
        back: 'Porto-Novo',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Bhutan',
        back: 'Thimphu',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Bolivia',
        back: 'La Paz (administrative), Sucre (judicial)',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Bosnia and Herzegovina',
        back: 'Sarajevo',
        type: 'learn',
      },
      {
        id: uuidv4(),
        front: 'Botswana',
        back: 'Gaborone',
        type: 'learn'
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

