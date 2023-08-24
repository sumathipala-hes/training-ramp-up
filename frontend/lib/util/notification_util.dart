import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:frontend/util/show_toast.dart';
import 'package:logger/logger.dart';

void configListener() {
  FirebaseMessaging.instance.getToken();

  FirebaseMessaging.onMessage.listen((RemoteMessage message) {
    Logger().d('Got a message whilst in the foreground!');
    Logger().d('Message data: ${message.data}');

    if (message.notification != null) {
      Logger().d(
          'Message also contained a notification: ${message.notification?.title}');

      Logger().d(
          'Message also contained a notification: ${message.notification?.body}');
      showToast(message.notification!.body!);
    }
  });
}
