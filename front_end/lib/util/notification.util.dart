import 'dart:convert';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:logger/logger.dart';

Future<void> sendNotification(String title, String body) async {
  String serverKey = dotenv.env['API_SERVER_KEY']?.toString() ?? '';
  const String fcmEndpoint = 'https://fcm.googleapis.com/fcm/send';

  final token = await FirebaseMessaging.instance.getToken();

  final message = {
    'notification': {
      'title': title,
      'body': body,
    },
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
