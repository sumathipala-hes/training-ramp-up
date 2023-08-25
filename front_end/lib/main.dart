import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:front_end/util/firebase_messaging.dart';
import 'package:front_end/ui/root_page/root_page.dart';
import 'package:shared_preferences/shared_preferences.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  FirebaseMessaging.onBackgroundMessage(
    firebaseMessagingBackgroundHandler,
  );
  final prefs = await SharedPreferences.getInstance();
  final role = prefs.getString('role');
  runApp(
    RampUpApp(
      isAuthenticate: role != null,
    ),
  );
}
