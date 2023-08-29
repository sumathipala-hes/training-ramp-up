import 'package:shared_preferences/shared_preferences.dart';

class LocalStorage {
  Future<bool?> getCurrentLoginRole() async {
    final prefs = await SharedPreferences.getInstance();
    final roleType = prefs.getString('roleType');
    return roleType != null;
  }

  Future<void> setCurrentLoginRole(String roleType) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString('roleType', roleType);
  }

  Future<void> setCurrentLoginEmail(String email) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString('email', email);
  }

  Future<String?> getCurrentLoginRoleType() async {
    final prefs = await SharedPreferences.getInstance();
    final roleType = prefs.getString('roleType');
    return roleType;
  }

  Future<String?> getCurrentLoginEmail() async {
    final prefs = await SharedPreferences.getInstance();
    final email = prefs.getString('email');
    return email;
  }
}
