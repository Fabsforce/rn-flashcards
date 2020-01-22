import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import { AsyncStorage } from 'react-native'



/** This is not an ideal solution to create an unik ID but this
 * is a quick efficient solution :
 * - to get an id for new deck
 * - to get an easy field/param to order a list :)
 * In production, as it is too predictive, it would have been nicer to create a UID from Math
 * and add a creation date/time field to order the decks list
 */
export function generateTimeId() {
    const now = new Date()
    const secondsSinceEpoch = Math.round(now.getTime() / 1000)
    return secondsSinceEpoch
}




/** -- Notifications section --- */


const NOTIFICATION_KEY = "Flashcards:notifications";



export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    );
}

function createNotification() {
    return {
        title: "Log your stats!",
        body: "👋 don't forget to log your stats for today!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: "high",
            sticky: false,
            vibrate: true
        }
    };
}


export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                    if (status === "granted") {
                        Notifications.cancelAllScheduledNotificationsAsync();

                        let tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        tomorrow.setHours(13);
                        tomorrow.setMinutes(0);

                        Notifications.scheduleLocalNotificationAsync(createNotification(), {
                            time: tomorrow,
                            repeat: "day"
                        });

                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                    }
                });
            }
        });
}