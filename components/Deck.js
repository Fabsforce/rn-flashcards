import React, { Component } from "react"
import { skinBackground, lightBlue, darkBlue, lightPink, grey } from "../utils/colors"
import { View, ScrollView, Text, StyleSheet, Platform, TouchableOpacity, Alert } from "react-native"
import { removeDeck, getDecks, clearAll } from '../utils/api'
import { removeReduxDeck } from "../actions"
import { connect } from 'react-redux'



class Deck extends Component {


    handleDecks = () => {
        getDecks()
            .then((results) => {
                console.log(results)
            })
    }

    handleRemoveDeck = (deck, title) => {
        removeDeck(deck)
            .then(() => {
                this.props.dispatch(removeReduxDeck(deck))

            })
            .then(() => {
                Alert.alert('Delete Deck', title + ' has been correctly removed')
                this.props.navigation.navigate('DecksList')
            })

    }

    navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (<HeaderBackButton onPress={() => alert('hit me')} />)
        }
    }

    handleStartQuiz = () => {
        this.props.numberCards > 0
            ? this.props.navigation.navigate('Quiz', { deckId: this.props.deckId })
            : Alert.alert('No cards to answer', 'Please add some cards to this deck before starting the quiz.')
    }


    render() {
        const { deckId, cardTitle, numberCards } = this.props

        return (
            <ScrollView style={styles.deck} contentContainerStyle={{flexGrow: 1}}>        
                <View style={{flex: 1,justifyContent: 'center',}}>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.titleDeck}>{cardTitle}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', marginBottom: 20, flexDirection: 'row' }}>
                        <View style={styles.numberCircle}>
                            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', }}>{numberCards}</Text>
                        </View>
                        <Text style={styles.numberCards}>cards</Text>
                    </View>
                    <View style={styles.addCardButton}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Addcard', { deckId: deckId })} >
                            <Text style={styles.textButton}>Add Card</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.quizButton}>
                        <TouchableOpacity onPress={this.handleStartQuiz} >
                            <Text style={styles.textButton}>Start Quiz</Text>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text onPress={() => this.handleRemoveDeck(deckId, cardTitle)}
                            style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', }}>
                            Delete Deck
                    </Text>
                    </View>
                </View>
                {/*<Text onPress={this.handleDecks} style={{ marginBottom: 30 }}>Get Decks</Text>
                <Text onPress={() => clearAll()} style={{ marginBottom: 30 }}>Clear Decks</Text>*/}
            </ScrollView>
        )
    }


}


const styles = StyleSheet.create({
    deck: {
        backgroundColor: skinBackground,
    },
    addCardButton: {
        borderRadius: Platform.OS === "ios" ? 40 : 2,
        alignSelf: 'center',
        backgroundColor: lightBlue,
        padding: 15,
        margin: 30,
        width: 300,
    },
    quizButton: {
        borderRadius: Platform.OS === "ios" ? 40 : 2,
        alignSelf: 'center',
        backgroundColor: lightPink,
        padding: 15,
        margin: 30,
        width: 300,
    },
    textButton: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: 'bold',
        color: darkBlue,
    },
    titleDeck: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: 'bold',
        color: darkBlue,
        textTransform: 'uppercase'
    },
    numberCircle: {
        backgroundColor: "rgba(250, 241, 235, 1)",
        padding: 12,
        width: 50,
        height: 50,
        borderRadius: 100,
        marginLeft: 0,
        marginRight: 10,
    },
    numberCards: {
        fontSize: 20,
        color: grey,
        paddingTop: 25,
        paddingBottom: 25,
        fontWeight: 'normal',
        letterSpacing: 3,
        lineHeight: 10
    },
});

function mapStateToProps(decks_results, props) {
    const { deckId, cardTitle } = props.navigation.state.params
    const numberCards = decks_results[deckId] ? decks_results[deckId].questions.length : 0
    //console.log("connect :"+decks_results[deckId].questions.length)
    return {
        decks: decks_results,
        deckId,
        cardTitle,
        numberCards,
    };
}

export default connect(mapStateToProps)(Deck)





