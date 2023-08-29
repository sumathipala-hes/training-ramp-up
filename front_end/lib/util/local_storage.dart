import 'package:shared_preferences/shared_preferences.dart';

class LocalStorage {
  Future<bool?> getCurrentLoginRole() async {
    final prefs = await SharedPreferences.getInstance();

    final roleType = prefs.getString('roleType');
    return roleType != null;
  }

  Future<void> setCurrentLoginRole(String roleType, String email) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString('roleType', roleType);
    prefs.setString('email', email);
  }
}
