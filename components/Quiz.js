import React, { Component } from "react"
import { skinBackground, lightGreen, lightBlue, darkBlue, darkSkin, lightPink, grey, white } from "../utils/colors"
import { View, Text, StyleSheet, Platform, TouchableOpacity, Animated } from "react-native"
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { ScrollView } from "react-native-gesture-handler"
import { setLocalNotification, clearLocalNotification } from "../utils/helpers"



class Quiz extends Component {

    state = {
        currentQuestion: 0,
        checkAnswer: false,
        correctAnswer: 0,
        incorrectAnswer: 0,
    }


    componentDidMount() {
        this.setState({ quizLength: this.props.deck.questions.length })
    }


    quizAnim() {
        this.setState({ checkAnswer: !this.state.checkAnswer })
    }


    answerPress(answer) {
        answer === 'correct'
            ? this.setState({ correctAnswer: this.state.correctAnswer + 1 })
            : this.setState({ incorrectAnswer: this.state.incorrectAnswer + 1 })
        this.state.currentQuestion < this.state.quizLength &&
            this.setState({
                currentQuestion: this.state.currentQuestion + 1,
                checkAnswer: false,
            })
        // clear notification on last question answer
        this.state.currentQuestion+1 === this.state.quizLength &&
            clearLocalNotification()
                .then(setLocalNotification)
    }

    restartQuiz() {
        this.setState({
            currentQuestion: 0,
            checkAnswer: false,
            correctAnswer: 0,
            incorrectAnswer: 0,
        })
    }




    render() {

        const questions = this.props.deck.questions
        const { currentQuestion, checkAnswer, correctAnswer, incorrectAnswer, quizLength } = this.state
        const percentageScore =  Math.round(correctAnswer / quizLength * 100)
        const animationStyles = {
            transform: [
                { translateY: this.state.animation }
            ]
        };


        return (
            <ScrollView style={styles.deck} contentContainerStyle={{flexGrow: 1}}>       
            <View style={{flex:1, justifyContent: 'center',}}>

                { (correctAnswer + incorrectAnswer < quizLength)
                    ?
                    <View>
                        <View style={{ justifyContent: 'center', marginBottom: 25, marginTop: 0, flexDirection: 'row' }}>
                            <View style={styles.numberCircle}>
                                <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', }}>{currentQuestion + 1}/{quizLength}</Text>
                            </View>
                        </View>
                        <Animated.View style={[styles.deckQuestion,]} >
                            <Text style={styles.deckName}>{questions[currentQuestion].question}</Text>
                            {checkAnswer &&
                                <Animated.View style={[styles.deckAnswer]} >
                                    <Text>{questions[currentQuestion].answer}</Text>
                                </Animated.View>
                            }
                        </Animated.View>
                        <TouchableOpacity onPress={() => this.quizAnim()} >
                            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 25, color: 'red' }}>
                                { !checkAnswer? 'Check Answer' : 'Hide Answer' }
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.correctButton}>
                            <TouchableOpacity onPress={() => this.answerPress('correct')} >
                                <Text style={styles.textButton}>Correct</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.incorrectButton}>
                            <TouchableOpacity onPress={() => this.answerPress('incorrect')} >
                                <Text style={styles.textButton}>Incorrect</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={[styles.deckQuestion,]} >
                        <Text style={styles.deckName}>Your Score</Text>
                        <View style={[styles.deckAnswer, styles.deckScore]} >
                            <Text style={styles.deckScore}>Correct Answers</Text>
                            <Text style={styles.deckScore}>{correctAnswer} / {quizLength}</Text>
                            <Text style={[styles.titleDeck, { marginTop: 25 }]}> {percentageScore}%</Text>
                        </View>
                        <View style={[styles.correctButton, { backgroundColor: darkSkin }]}>
                            <TouchableOpacity onPress={() => this.restartQuiz()} >
                                <Text style={styles.textButton}>Restart Quiz</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.correctButton, { backgroundColor: grey }]}>
                        <TouchableOpacity  onPress={() => this.props.navigation.goBack() } >
                                <Text style={styles.textButton}>Back to deck</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                }

            </View>
            </ScrollView>
        )
    }
}




const styles = StyleSheet.create({
    deck: {
        backgroundColor: skinBackground,
    },
    deckScore: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    deckQuestion: {
        backgroundColor: white,
        borderRadius: Platform.OS === "ios" ? 18 : 2,
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 25,
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
            width: 0,
            height: 3
        },
        backfaceVisibility: 'hidden',
    },
    deckAnswer: {
        backgroundColor: lightBlue,
        color: white,
        borderRadius: Platform.OS === "ios" ? 18 : 2,
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 25,
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
            width: 0,
            height: 3
        },
        fontSize: 25
    },
    deckName: {
        fontSize: 30,
        color: darkBlue,
        fontWeight: 'bold',
        padding: 22
    },
    correctButton: {
        borderRadius: Platform.OS === "ios" ? 40 : 2,
        alignSelf: 'center',
        backgroundColor: lightGreen,
        padding: 15,
        margin: 20,
        width: 300,
    },
    incorrectButton: {
        borderRadius: Platform.OS === "ios" ? 40 : 2,
        alignSelf: 'center',
        backgroundColor: lightPink,
        padding: 15,
        margin: 20,
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
        textTransform: 'uppercase',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30,
    },
    numberCircle: {
        backgroundColor: "rgba(250, 241, 235, 1)",
        paddingTop: 27,
        width: 80,
        height: 80,
        borderRadius: 70,
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



function mapStateToProps(decks_results, { navigation }) {

    const { deckId } = navigation.state.params
    const deck = decks_results[deckId]

    return {
        deckId,
        deck: deck,
    }
}


export default withNavigation(connect(mapStateToProps)(Quiz))

