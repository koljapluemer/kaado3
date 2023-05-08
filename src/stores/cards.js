import { defineStore } from 'pinia'
import { v4 as uuidv4 } from "uuid";

var db = new PouchDB('elephant');
var remoteCouch = false;


export const useCardsStore = defineStore({
  id: 'cards',
  state: () => ({
    cards: [],
    queueCard: undefined,
    cardsLoaded: false,
    cardsLeftToDo: false
  }),
  getters: {
    getQueueCard: (state) => {
      // if queueCard is empty, set it to a random new one
      if (!state.queueCard) {
        // only get cards that are due or past due, and are active
        const filteredCards = state.cards.filter((c) => (!c.due || c.due < new Date())
          && (c.is_active === true || c.is_active === "True"));
          
        if (filteredCards.length > 0) {
          state.queueCard = filteredCards[Math.floor(Math.random() * filteredCards.length)];
          state.cardsLeftToDo = true;
        } else {
          console.log('no cards left to do');
          state.cardsLeftToDo = false;
        }
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
      console.log('saving card to pouchdb: ', card);
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

      console.log('saving card to db: ', updatedCard);

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
        // delete from pouchDB
        db.get(this.cards[index]._id, function (err, doc) {
          if (err) {
            console.log('error deleting card from pouchdb: ', err);
          }
          db.remove(doc, function (err, response) {
            if (err) {
              console.log('error deleting card from pouchdb: ', err);
            }
            console.log('deleted card from pouchdb');
          });
        });

        this.cards.splice(index, 1);
        console.log('deleted card, we now have this many cards: ', this.cards.length);
      } else {
        console.log('card not found');
      }
    },
    getNewQueueCard() {
      // filter for cards where due does not exist or is in the past, also type cannot be undefined
      try {
        let randomCard = {};
        // only get cards that are due or past due, and are active

        const types = ['learn', 'todo', 'habit', 'check', 'misc', 'article', 'book'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        console.log('picking card of random type: ', randomType);
        // filter for cards where due does not exist or is in the past, also type cannot be undefined, also is_active must be true or "True", and conform to randomType
        let filteredCards = this.cards.filter((c) => (
          (c.due < new Date() || !c.due) &&
          (c.is_active === true || c.is_active === "True") &&
          c.type === randomType));
        // if no cards match, do again without type
        if (filteredCards.length > 0) {
          randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)];
          console.log('new queue card: ', randomCard);
          this.cardsLeftToDo = true;
        } else {
          this.cardsLeftToDo = false;
          console.log('no cards match type, trying again without type');
          filteredCards = this.cards.filter((c) => (!c.due || c.due < new Date())
            && (c.is_active === true || c.is_active === "True"));
          if (filteredCards.length > 0) {
            this.cardsLeftToDo = true;
            randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)];
          } else {
            this.cardsLeftToDo = false;
            console.log('absolutely no cards left to do');
          }
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

