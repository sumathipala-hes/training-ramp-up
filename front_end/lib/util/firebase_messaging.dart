import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
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
      Fluttertoast.showToast(
        msg: message.notification!.body!,
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        timeInSecForIosWeb: 1,
        backgroundColor: message.notification!.title!.contains('Success')
            ? Colors.green
            : Colors.red[400],
        textColor: Colors.white,
        fontSize: 16.0,
      );
    }
  });
}

Future<void> firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  Logger().d("Handling a background message: ${message.messageId}");
}
