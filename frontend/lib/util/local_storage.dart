import 'package:shared_preferences/shared_preferences.dart';

class LocalStorage {
  Future<bool?> getDetails() async {
    final prefs = await SharedPreferences.getInstance();
    final email = prefs.getString('email');
    return email != null;
  }
}
