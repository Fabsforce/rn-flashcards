import React, { Component } from "react"
import { skinBackground, lightBlue, darkBlue, lightPink } from "../utils/colors"
import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from "react-native"
import { saveCard } from '../utils/api'
import { addCard } from "../actions"
import { connect } from 'react-redux'


class Addcard extends Component {

    state = {
        question: '',
        answer: '',
    }


    onChangeText = (text,inputName) => {
         this.setState({  [inputName]: text }) 
    }

    handleSubmitCard = () => {
        if (this.state.question.length > 0 && this.state.answer.length > 0) {
            const {deckId} = this.props.navigation.state.params
            console.log(deckId) 
            saveCard(deckId, this.state.question, this.state.answer)
                .then(() => {
                    this.props.dispatch(addCard(deckId, this.state.question, this.state.answer))
                })
                .then(() => {
                    this.props.navigation.goBack() // back to deck
                    this.setState({ question: '', answer:''})
                })

        } else (
            Alert.alert('Incomplete Card', 'Please complete both the question and the answer before saving your card.')
        )
    }




    render() {
        return (
            <KeyboardAvoidingView behavior='position' style={styles.Adddeck}>
                <View style={{ marginBottom: 50 }}>
                    <Text style={styles.titleCard}>Please enter the Question and the answer below?</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={ (text) => { this.onChangeText(text, 'question') } }
                        value={this.state.question}
                        placeholder='Enter the question here'
                        multiline
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={ (text) => { this.onChangeText(text, 'answer') } }
                        value={this.state.answer}
                        placeholder='Entre the answer here'
                        multiline
                    />
                </View>
                <View style={styles.submitButton}>
                    <TouchableOpacity onPress={this.handleSubmitCard} >
                        <Text style={styles.textButton}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}




const styles = StyleSheet.create({
    Adddeck : {
        flex:1,
        backgroundColor: skinBackground,
        justifyContent: 'center',
    },
    titleCard: {
        textAlign: "center",
        fontSize: 18,
        fontWeight:'bold',
        color: darkBlue,
        textTransform: 'uppercase',
        margin:20,
    },
    textInput: {
        height: 70, 
        borderColor: 'gray', 
        backgroundColor: 'transparent',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 40,
        fontSize: 18,
    },
    submitButton: {
        borderRadius: Platform.OS === "ios" ? 40 : 2,
        alignSelf:'center',
        backgroundColor: lightPink,
        padding: 15,
        margin: 30,
        width:300,
    },
    textButton: {
        textAlign: "center",
        fontSize: 25,
        fontWeight:'bold',
        color: darkBlue,
    },
});





function mapStateToProps (decks_results) {
    return {
       decks_results,
    }
  }



export default connect(mapStateToProps)(Addcard)