import { defineStore } from 'pinia'
import { v4 as uuidv4 } from "uuid";

var db = new PouchDB('elephant');
var remoteCouch = false;


export const useCardsStore = defineStore({
  id: 'cards',
  state: () => ({
    cards: [],
    queueCard: {},
    cardsLoaded: false
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
    async loadCardsFromPouchDB() {
      // load cards from pouchDB, using arrow function to preserve 'this'
      db.allDocs({ include_docs: true, descending: true }, (err, doc) => {
        if (err) {
          console.log('error loading cards from pouchDB: ', err);
        } else {
          console.log('cards loaded from pouchDB: ', doc.rows);
          // set cards to doc.rows
          this.cards = doc.rows.map((r) => r.doc);
          this.cardsLoaded = true;
        }
      });
    },
    async addCard(card) {
      this.cards.push(card);

      // save to pouchDB
      card._id = card.id;
      db.put(card, function callback(err, result) {
        if (!err) {
          console.log('Successfully added a card to pouchdb!');
        } else {
          console.log('error adding card to pouchdb: ', err);
        }
      }
      );
    },
    async updateCard(updatedCard) {
      if (updatedCard.is_active == 'True') updatedCard.is_active = true;
      if (updatedCard.is_active == 'False') updatedCard.is_active = false;

      const index = this.cards.findIndex((c) => c._id === updatedCard._id);
      if (index !== -1) {
        this.cards.splice(index, 1, updatedCard);
      }

      // save to pouchDB
      updatedCard._id = updatedCard.id;
      db.put(updatedCard, function callback(err, result) {
        if (!err) {
          console.log('Successfully updated a card in pouchdb!');
        } else {
          console.log('error updating card in pouchdb: ', err);
        }
      }
      );
    },
    async deleteCard(front) {
      // find index of card by front
      const index = this.cards.findIndex((c) => c.front === front);
      console.log('index: ', index);
      if (index !== -1) {
        this.cards.splice(index, 1);
        console.log('deleted card');
      } else {
        console.log('card not found');
      }
    },
    getNewQueueCard() {
      // filter for cards where dueAt does not exist or is in the past, also type cannot be undefined
      try {
        let randomCard = {};
        let filteredCards = [];
        const types = ['learn', 'todo', 'habit', 'check', 'misc', 'article', 'book'];
        // const randomType = types[Math.floor(Math.random() * types.length)];
        const randomType = 'book'
        console.log('randomType: ', randomType);
        // special logic for type book: see how many is_started books there are, if it's less than 5, get a is_started false, otherwise get a started one
        if (randomType === 'book') {
          const startedBooks = this.cards.filter((c) => c.type === 'book' && (c.is_started === true || c.is_started === "True"));
          const notStartedBooks = this.cards.filter((c) => c.type === 'book' && (c.is_started === false || c.is_started === "False"));
          console.log('there are ', startedBooks.length, ' started books');
          if (startedBooks.length < 5 && notStartedBooks.length > 0) {
            console.log('getting a not started book');
            // get only a book that is due
            const filteredCards = notStartedBooks.filter((c) => (!c.dueAt || c.dueAt < new Date()));
            if (filteredCards.length > 0) {
              randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)];
            }

          } else {
            console.log('getting a started book');
            // get only a book that is due
            const filteredCards = startedBooks.filter((c) => (!c.dueAt || c.dueAt < new Date()));
            if (filteredCards.length > 0) {
              randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)];
            }
          }
        } else {
          // filter for cards where dueAt does not exist or is in the past, also type cannot be undefined, also is_active must be true or "True", and conform to randomType
          let filteredCards = this.cards.filter((c) => (!c.dueAt || c.dueAt < new Date())
            && (c.is_active === true || c.is_active === "True")
            && c.type === randomType);
          // if no cards match, do again without type

          randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)];
          console.log('new queue card: ', randomCard);
        }

        // if no cards match, do again without type
        if (filteredCards.length === 0) {
          console.log('no cards match type, trying again without type');
          filteredCards = this.cards.filter((c) => (!c.dueAt || c.dueAt < new Date())
            && (c.is_active === true || c.is_active === "True"));
        }
        randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)];

        // if queueCard has no id, add one
        if (!randomCard.id) {
          randomCard.id = uuidv4();
        }
        this.queueCard = randomCard;

      } catch (error) {
        console.log('error getting new queue card: ', error);
        this.queueCard = {};
      }
    },
    saveAllCardsToPouchDB() {
      // save all cards to pouchDB
      this.cards.forEach((c) => {
        if (!c.id) {
          c.id = uuidv4();
        }
        c._id = c.id;

        db.put(c, function callback(err, result) {
          if (!err) {
            console.log('Successfully saved a card to pouchdb!');
          } else {
            console.log('error saving card to pouchdb: ', err);
          }
        }
        );
      });
    }
  },
  persist: {
    storage: localStorage,
  },
})

