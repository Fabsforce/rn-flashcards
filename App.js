import React from 'react'
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducer from "./reducers"
import middleware from './middleware'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Platform } from 'react-native'
import { darkBlue, darkSkin, skinBackground, grey, white, lightBlue } from "./utils/colors"
import Constants from "expo-constants"
import { createAppContainer } from 'react-navigation'
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from "react-navigation-tabs"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import Addcard from './components/Addcard'
import Adddeck from './components/Adddeck'
import DecksList from './components/DecksList'
import { setLocalNotification } from './utils/helpers'


function FlashcardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} currentHeight />
    </View>
  )
}

//const Home = <DecksList navigation={this.props.navigation} />


const _TabNavigator =
  Platform.OS === "ios"
    ? createBottomTabNavigator
    : createMaterialTopTabNavigator;

const TabNavigator = _TabNavigator(
  {
    DecksList: {
      screen: DecksList,
      navigationOptions: {
        tabBarLabel: "Decks List",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        ),
      }
    },

    Adddeeck: {
      screen: Adddeck,
      navigationOptions: {
        tabBarLabel: "Add a Deck",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        ),
      }
    },
  },
  {
    navigationOptions: {
      headerShown: false
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? darkBlue : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : darkBlue,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const Stack = createStackNavigator({

  Home: {
    screen: TabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
    }),
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      title: 'Deck',//`${titleCard}'s Card`,
      headerBackTitleVisible: false,
      headerLeft: () => (<HeaderBackButton onPress={() => navigation.navigate('DecksList')} label="Decks List" />),

    }),
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      title: 'Quiz',//`${titleCard}'s Quiz!`,
    }),
  },
  Addcard: {
    screen: Addcard,
    navigationOptions: ({ navigation }) => ({
      title: 'Add Card To Deck',
    }),
  },
  Adddeck: {
    screen: Adddeck,
    navigationOptions: ({ navigation }) => ({
      title: 'Add a New Deck',
    }),
  },

})


const AppContainer = createAppContainer(Stack);




class App extends React.Component {


  componentDidMount() {
      Platform.OS !== "ios" && StatusBar.setBackgroundColor(darkBlue, true)
      setLocalNotification()
  }


  render() {
    return (
      <Provider store={createStore(reducer,middleware)}>
        <View style={{ flex: 1, }}>
          <FlashcardsStatusBar backgroundColor={white} barStyle="default" />
          <AppContainer />
        </View>
      </Provider>
    );
  }
}





const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: skinBackground,
    paddingTop: 25
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


export default App