import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:front_end/ui/root_page/root_page.dart';
import 'package:shared_preferences/shared_preferences.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();

  final prefs = await SharedPreferences.getInstance();
  final roleType = prefs.getString('roleType');
  runApp(
    RampUpApp(
      isAuthenticate: roleType != null,
    ),
  );
}
