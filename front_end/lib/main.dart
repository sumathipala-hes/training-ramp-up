import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:front_end/api/firebase_api.dart';
import 'package:front_end/ui/root_page/root_page.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
    FirebaseMessaging.onBackgroundMessage(
    firebaseMessagingBackgroundHandler,
  );
  runApp(const RampUpApp());
}