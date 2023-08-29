import 'package:shared_preferences/shared_preferences.dart';

class LocalStorage {
  Future<bool?> getCurrentLoginRole() async {
    final prefs = await SharedPreferences.getInstance();
    final roleType = prefs.getString('roleType');
    return roleType != null;
  }
}
