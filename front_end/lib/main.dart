import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:front_end/ui/root_page/root_page.dart';
import 'package:front_end/util/local_storage.dart';
import 'package:front_end/util/notification_util.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  generateToken();

  LocalStorage().getCurrentLoginRole().then((roleType) => runApp(
        RampUpApp(
          isRole: roleType != null,
        ),
      ));
}
