import 'dart:convert';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:http/http.dart' as http;
import 'package:logger/logger.dart';

Future<void> sendNotification(String title, String body) async {
  // String serverKey = dotenv.env['API_SERVER_KEY']?.toString() ?? '';
  const String serverKey =
      'AAAAC_y7llo:APA91bF6Hm1wJpcGz85Cjpd09TLWkorbY4WDBaQF61b4b1uj74A8AXQbzIk8Vg5CBzb1sKXZGejj08WkAOjokXWCwAdHUr6R_vzBztTK4kUXY5ieQAw-9ljYSBL75o19MXR-OjDwbu4R';

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
