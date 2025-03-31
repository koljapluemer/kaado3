import { ref, computed } from 'vue'
import { v4 as uuidv4 } from "uuid";

export function useCards() {
  const cards = ref([])
  const queueCard = ref(undefined)
  const cardsLeftToDo = ref(false)

  const getQueueCard = computed(() => {
    if (!queueCard.value) {
      const filteredCards = cards.value.filter((c) => (!c.due || new Date(c.due).getTime() < new Date().getTime())
        && (c.is_active === true || c.is_active === "True"));

      if (filteredCards.length > 0) {
        queueCard.value = filteredCards[Math.floor(Math.random() * filteredCards.length)];
        cardsLeftToDo.value = true;
      } else {
        cardsLeftToDo.value = false;
      }
    }
    return queueCard.value;
  })

  async function openQueueCard(id) {
    const card = cards.value.find((c) => c.id === id);
    queueCard.value = card;
    cardsLeftToDo.value = true;
  }

  async function addCard(card) {
    if (!card.id) {
      card.id = uuidv4();
    }
    cards.value.push(card);
  }

  async function updateCard(updatedCard) {
    if (updatedCard.is_active == 'True') updatedCard.is_active = true;
    if (updatedCard.is_active == 'False') updatedCard.is_active = false;

    const index = cards.value.findIndex((c) => c.id === updatedCard.id);
    if (index !== -1) {
      cards.value.splice(index, 1, updatedCard);
    }
  }

  async function deleteCard(card) {
    const index = cards.value.findIndex((c) => c.id === card.id);
    if (index !== -1) {
      cards.value.splice(index, 1);
    }
  }

  async function getNewQueueCard() {
    try {
      let randomCard = {};
      const types = ['learn', 'todo', 'habit', 'check', 'misc', 'article', 'book'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      let filteredCards = cards.value.filter((c) => (
        (new Date(c.due).getTime() < new Date().getTime()|| !c.due) &&
        (c.is_active === true || c.is_active === "True") &&
        c.type === randomType));

      if (filteredCards.length > 0) {
        if (randomType === 'book') {
          const nrOfStartedBooks = filteredCards.filter((c) => c.is_started === true).length;
          if (nrOfStartedBooks < 5) {
            const inactiveBooks = filteredCards.filter((c) => c.is_started === false || c.is_started === "False" || !c.is_started);
            if (inactiveBooks.length > 0) {
              const randomInactiveBook = inactiveBooks[Math.floor(Math.random() * inactiveBooks.length)];
              randomInactiveBook.is_started = true;
            }
          }
          randomCard = filteredCards.find((c) => c.is_started === true);
        } else {
          randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)];
          cardsLeftToDo.value = true;
        }
      } else {
        cardsLeftToDo.value = false;
        filteredCards = cards.value.filter((c) => (!c.due || new Date(c.due).getTime() < new Date().getTime())
          && (c.is_active === true || c.is_active === "True"));
        if (filteredCards.length > 0) {
          cardsLeftToDo.value = true;
          randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)];
        } else {
          cardsLeftToDo.value = false;
        }
      }

      queueCard.value = randomCard;
    } catch (error) {
      console.log('error getting new queue card: ', error);
      queueCard.value = {};
    }
  }

  return {
    cards,
    queueCard,
    cardsLeftToDo,
    getQueueCard,
    openQueueCard,
    addCard,
    updateCard,
    deleteCard,
    getNewQueueCard
  }
}

