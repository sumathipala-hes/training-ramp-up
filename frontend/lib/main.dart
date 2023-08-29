import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/cupertino.dart';
import 'package:frontend/util/local_storage.dart';
import 'package:frontend/ui/root_page/root_page.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  bool? isAuthenticate = await LocalStorage().getDetails();
  runApp(
    RampUpApp(
      isAuthenticate: isAuthenticate,
    ),
  );
}
