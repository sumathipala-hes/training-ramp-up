import 'dart:convert';

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:frontend/model/notification_data.dart';
import 'package:http/http.dart' as http;
import 'package:logger/logger.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import '../ui/theme/colors.dart';

Future<void> sendNotification(NotificationData notificationData) async {
  await dotenv.load();
  String serverKey = dotenv.env['API_SERVER_KEY']?.toString() ?? '';
  const String fcmEndpoint = 'https://fcm.googleapis.com/fcm/send';

  final token = await FirebaseMessaging.instance.getToken();
  final message = {
    'notification': notificationData.toJson(),
    'to': token,
  };

  final http.Response response = await http.post(
    Uri.parse(fcmEndpoint),
    headers: <String, String>{
      'Content-Type': 'application/json',
      'Authorization': 'key=$serverKey',
    },
    body: jsonEncode(message),
  );

  if (response.statusCode == 200) {
    Logger().d('Notification sent successfully');
  } else {
    Logger().e('Failed to send notification');
  }
}

void configListener() {
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
        toastLength: Toast.LENGTH_LONG,
        gravity: ToastGravity.CENTER,
        timeInSecForIosWeb: 1,
        backgroundColor: AppColors.successColor,
        textColor: Colors.white,
        fontSize: 16.0,
      );
    }
  });
}

Future<void> firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  Logger().d("Handling a background message: ${message.messageId}");
}
