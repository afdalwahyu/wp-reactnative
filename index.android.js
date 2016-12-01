import {
  AppRegistry,
} from 'react-native';
import OneSignal from 'react-native-onesignal';
import WPReactNative from './app';

OneSignal.configure({
  onIdsAvailable(device) {
    // console.log('UserId = ', device.userId);
    // console.log('PushToken = ', device.pushToken);
  },
  onNotificationReceived(notification) {
    // console.log('notification received: ', notification);
  },
  onNotificationOpened(openResult) {
    // console.log('MESSAGE: ', openResult.notification.payload.body);
    // console.log('DATA: ', openResult.notification.payload.additionalData);
    // console.log('ISACTIVE: ', openResult.notification.isAppInFocus);
    // console.log('openResult: ', openResult);
    // Do whatever you want with the objects here
    // _navigator.to('main.post', data.title, { // If applicable
    //  article: {
    //    title: openResult.notification.payload.body,
    //    link: openResult.notification.payload.launchURL,
    //    action: data.openResult.notification.action.actionSelected
    //  }
    // });
  },
});

AppRegistry.registerComponent('WPReactNative', () => WPReactNative);
