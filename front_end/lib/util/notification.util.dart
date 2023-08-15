import 'dart:convert';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import 'package:logger/logger.dart';

import '../theme/primary_theme.dart';

Future<void> sendNotification(String title, String body) async {
  await dotenv.load();

  String serverKey = dotenv.env['API_SERVER_KEY']?.toString() ?? '';
  const String fcmEndpoint = 'https://fcm.googleapis.com/fcm/send';

  final token = await FirebaseMessaging.instance.getToken();
  Logger().d('Token: $token');

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

Future<void> showFieldError(String message) async {
  Fluttertoast.showToast(
      msg: message,
      toastLength: Toast.LENGTH_LONG,
      gravity: ToastGravity.BOTTOM,
      backgroundColor: Colors.red,
      textColor: Colors.white,
      timeInSecForIosWeb: 1,
      fontSize: 16.0);
}

Future<bool?> showYesNoAlert(BuildContext context) async {
  return showDialog<bool>(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12.0),
        ),
        title: Text('Confirmation', style: headerText2),
        content: Text(
          'Do you want to continue ?',
          style: headerText3,
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop(true);
            },
            child: Text(
              'Yes',
              style: labelText2,
            ),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop(false);
            },
            child: Text(
              'No',
              style: labelText2,
            ),
          ),
        ],
      );
    },
  );
}
