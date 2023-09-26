import 'package:shared_preferences/shared_preferences.dart';

class LocalStorage {
  Future<void> setUserEmail(String email) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString(
      'userEmail',
      email,
    );
  }

  Future<void> setCurrentRole(String role) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString(
      'role',
      role,
    );
  }

  Future<void> setAcessToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString(
      'accessToken',
      token,
    );
  }

  Future<void> setRefreshToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString(
      'refreshToken',
      token,
    );
  }

  Future<void> clearSetValues() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.remove('userEmail');
    prefs.remove('role');
  }

  Future<String> getUserEmail() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('userEmail') ?? '';
  }

  Future<String> getCurrentRole() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('role') ?? '';
  }

  Future<String> getAccessToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('accessToken') ?? '';
  }

  Future<String> getRefreshToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('refreshToken') ?? '';
  }
}
