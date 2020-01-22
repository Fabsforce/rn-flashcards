export const RECEIVE_DECKS = "RECEIVE_DECKS"
export const ADD_DECK = "ADD_DECK"
export const REMOVE_REDUX_DECK = "REMOVE_REDUX_DECK"
export const ADD_CARD = "ADD_CARD"


export function receiveDecks(decks_results) {
  return {
    type: RECEIVE_DECKS,
    decks_results
  }
}

export function addDeck(id, title) {
  return {
    type: ADD_DECK,
    id,
    title,
  }
}

export function removeReduxDeck(id) {
    return {
      type: REMOVE_REDUX_DECK,
      id,
    }
}

export function addCard(id, question, answer) {
    return {
      type: ADD_CARD,
      id,
      question,
      answer,
    }
}