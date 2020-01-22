This application is a FLASHCARDS developped in React-Native to be used on mobile (iOS & Android)
On initial launch, the app displays a list of 2 decks of flashcards with 2 cards each.
The user could add more decks or remove the existing ones.
The goal is to create decks, on different subjects, and add as many cards as the user wish.
It's fun app because the user is not 'punished' by the app, but instead the user mark its guess as 'Correct' or 'Incorrect'. 
At the end of the Quiz, the app displays a screen with its score, with correct answers and the overall percentage of correct answers.

## Installation

Install the project dependencies in running in your console :

`% yarn install`

## Start the development server with

`% yarn start`

## Important
The app uses local storage (AsyncStorage) to persist data. Please note that when the app is remove from the phone the data is removed as well. 
The data stored in the app is not crypted so it's not suitable for storing sensible info.

## Tested Platforms

The app was developped using expo. The app has been tested on iPhone 6s plus, iPhone 8, iPhone 11 Pro Max and Galaxy A10

## 'Training' comments
Some comments have not been removed; there are left there for education purpose, especially to explain some 'complex' javascript code and logic.

## Contributor
* Fabrice (Fabsforce)