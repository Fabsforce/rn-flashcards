import React, { Component } from "react"
import { skinBackground, lightBlue, darkBlue, lightPink } from "../utils/colors"
import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert  } from "react-native"
import { saveDeck } from '../utils/api'
import { generateTimeId } from '../utils/helpers'
import { connect } from 'react-redux'
import { addDeck } from "../actions"




class Adddeck extends Component {

    state = {
        text:'',
    }


    onChangeText = (inputText) => {
        this.setState({
            text: inputText,
        })

    }

    handleSubmit = () => {
        if(this.state.text.length > 0){
            const idDeck = generateTimeId()
            saveDeck( idDeck, this.state.text )
                .then( () => {
                    this.props.dispatch( addDeck( idDeck, this.state.text) )   
                } )
                .then( () =>{ 
                    this.props.navigation.navigate('Deck', { deckId: idDeck , cardTitle: this.state.text } )
                    this.setState({ text: '', })
                })
        } else (
            Alert.alert('Empty Deck Title','Please enter a title for the new deck')
        )
    }



    render() {

        return (
            <KeyboardAvoidingView behavior='padding' style={styles.Adddeck}>
                <View style={{marginBottom:50}}>
                    <Text style={styles.titleDeck}>What is the title of your new deck?</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={this.onChangeText}
                        value={this.state.text}
                        placeholder= 'Deck Title'
                    />
                </View>
                <View style={styles.submitButton}>
                    <TouchableOpacity onPress={this.handleSubmit} >
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
    titleDeck: {
        textAlign: "center",
        fontSize: 25,
        fontWeight:'bold',
        color: darkBlue,
        textTransform: 'uppercase',
        margin:20,
    },
    textInput: {
        height: 40, 
        borderColor: 'gray', 
        backgroundColor: 'transparent',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        marginLeft: 40,
        marginRight: 40,
        fontSize: 25,
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



function mapStateToProps ( decks_results ) {
    return {
        decks_results,
    }
  }

export default connect(mapStateToProps)(Adddeck)