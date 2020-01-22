import React, { Component } from "react"
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Platform, FlatList } from 'react-native'
import { darkBlue, darkSkin, skinBackground, grey, white, lightBlue } from "../utils/colors"
import { getDecks } from '../utils/api'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

class DecksList extends Component {

    state = {
        decks: ''
    }


    componentDidMount() {
        getDecks()
            .then((decks) => {
                this.props.dispatch(receiveDecks(decks))
            })
    }



    renderItem = ({ item }) => {
        const numberCards = item[1].questions.length
        const {navigation} = this.props
        return (
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Deck', {cardTitle: item[1].title, deckId: item[1].id, numberCards: item[1].questions.length }) } >
                    <View style={styles.deckitem} >
                        <Text style={styles.deckName}>{item[1].title}</Text>
                        <View style={{ flex: 1, justifyContent: 'center', marginBottom: 75, flexDirection: 'row' }}>
                            <View style={styles.numberCircle}>
                                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', }}>{numberCards}</Text>
                            </View>
                            <Text style={styles.numberCards}>cards</Text>
                        </View>
                        <View style={styles.viewButton}>
                            <Text style={styles.textButton}>VIEW THIS DECK</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }




    render() {
        const {decks} = this.props
        const sorted_decks = Object.entries(decks).sort((a,b) => b[0] - a[0]) // sorting sur 0 eg. the key (time)
        return (
            <View style={styles.deckslist}>
                {/*<Text>{JSON.stringify(decks)}</Text> FOR DEBUG PURPOSE*/}
            { decks ?
                <FlatList
                    data={sorted_decks}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => item[1].id}
                />
             :
              <View style={styles.deckitem}>
                <Text >You don't have any deck for the moment</Text>
                <Text >Please create one !</Text>
              </View>
             }
            </View>
        )
    }

}



const styles = StyleSheet.create({
    deckslist: {
        flex: 1,
        backgroundColor: skinBackground,
        paddingTop: 25, 
    },
    dashboard: {
        flex: 1,
        backgroundColor: skinBackground,
    },
    deckitem: {
        backgroundColor: white,
        borderRadius: Platform.OS === "ios" ? 18 : 2,
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    deckName: {
        fontSize: 30,
        color: darkBlue,
        fontWeight: 'bold',
        padding: 22
    },
    numberCards: {
        fontSize: 20,
        color: grey,
        paddingTop: 30,
        paddingBottom: 30,
        fontWeight: 'normal',
        letterSpacing: 3,
        lineHeight: Platform.OS === "ios" ? 6 : 5,
        textAlignVertical: 'top'
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
    viewButton: {
        borderRadius: Platform.OS === "ios" ? 40 : 2,
        justifyContent: "center",
        backgroundColor: lightBlue,
        padding: 15,
        marginLeft: 20,
        marginRight: 20,
        maxWidth: 250,
        color: darkBlue,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textButton: {
        justifyContent: "center",
        color: darkBlue,
        fontWeight: 'normal',
        textAlign: 'center',
        fontSize: 15
    },
});


function mapStateToProps(decks) {
    return {
      decks
    };
  }


export default withNavigation(connect(mapStateToProps)(DecksList))
