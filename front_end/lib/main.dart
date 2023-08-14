import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:front_end/ui/root_page/root_page.dart';
import 'package:logger/logger.dart';


Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

  runApp(const RampUpApp());
}

Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  Logger().d("Handling a background message: ${message.messageId}");
}
