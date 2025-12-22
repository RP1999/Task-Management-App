import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

class NotificationService {
  constructor() {
    this.configure();
  }

  configure() {
    PushNotification.configure({
      onNotification: function (notification) {
        // console.log("NOTIFICATION:", notification);
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });

    PushNotification.createChannel(
      {
        channelId: "task-reminders", // (required)
        channelName: "Task Reminders", // (required)
        channelDescription: "A channel to categorise your task notifications", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => {} // console.log(`createChannel returned '${created}'`)
    );
  }

  async scheduleNotification(title, message, date, id) {
    if (!date || new Date(date) <= new Date()) {
      // console.log('Notification skipped: Date is in the past or invalid', date);
      return;
    }

    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const { PermissionsAndroid } = require('react-native');
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('Notification permission denied');
        return;
      }
    }

    // Ensure channel exists
    PushNotification.channelExists("task-reminders", (exists) => {
      if (!exists) {
        // console.log('Channel "task-reminders" does not exist. Creating it...');
        this.configure(); // Re-trigger configure/createChannel
      }
    });

    // console.log('Scheduling notification for:', new Date(date));
    PushNotification.localNotificationSchedule({
      id: id,
      channelId: "task-reminders",
      title: title,
      message: message,
      date: new Date(date),
      allowWhileIdle: true,
      playSound: true,
      soundName: "default",
      importance: "high",
      priority: "high",
    });
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}

export const notificationService = new NotificationService();
