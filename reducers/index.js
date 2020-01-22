import { RECEIVE_DECKS, ADD_DECK, REMOVE_REDUX_DECK, ADD_CARD } from "../actions";

export default function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks_results
            }
        case ADD_DECK:
            return {
                ...state,
                [action.id]: {
                    id: '' + action.id,
                    title: action.title,
                    questions: []
                }
            }
        case REMOVE_REDUX_DECK:
            const { [action.id]: value, ...restDecks } = state;
            //console.log("State after remove"+restDecks);
            return restDecks;
        case ADD_CARD:
            //console.log(state[action.id].questions) 
            //console.log(state[action.id].title)
            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    title: state[action.id].title,
                    questions: [...state[action.id].questions].concat({ question: action.question, answer: action.answer })
                }
            }
        default:
            return state
    }
}

