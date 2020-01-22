import { AsyncStorage } from 'react-native'


const initialData = {
    ['1579517500']: {
        id: '1579517500',
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            },
        ]
    },
    ['1579517899']: {
        id: '1579517899',
        title: 'Javascript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            },
            {
                question: 'Does Javascript is a cousin of Java?',
                answer: 'NO!!'
            },
        ]
    }
}

export const STORAGE_KEY = 'FlashCards'



export async function getDecks() {
    /*const results = AsyncStorage.getItem(STORAGE_KEY)
                       .then(formatDecks)
    return results*/
    try {
        const results = await AsyncStorage.getItem(STORAGE_KEY);

        if (results === null) {
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        }

        return results === null ? initialData : JSON.parse(results);
    } catch (err) {
        console.log(err);
    }
}



export function saveDeck(idDeck, deckTitle) {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [idDeck]: {
            id: '' + idDeck,
            title: deckTitle,
            questions: []
        }
    }))
}

export function saveCard(id, newQuestion, newAnswer) {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then((decks) => {
            const decksParsed = JSON.parse(decks)
            const { questions } = decksParsed[id]
            AsyncStorage.mergeItem(
                STORAGE_KEY,
                JSON.stringify({
                    [id]: {
                        questions: [...decksParsed[id].questions].concat({ question: newQuestion, answer: newAnswer }) // we copy the questions array of this deck id and concat it with a new question object
                    }
                })
            );
        })
}

export function clearAll() {
    return AsyncStorage.clear()
        .then(() => {
            console.log('It was removed successfully')
        })
}


export function removeDeck(deckID) {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then((results) => {
            const decks = JSON.parse(results)
            delete decks[deckID]
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
        })
}
