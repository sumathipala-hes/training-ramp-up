import 'package:shared_preferences/shared_preferences.dart';

class LocalStorage {
  Future<void> setEmail(String email) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString(
      'email',
      email,
    );
  }

  Future<void> setRole(String role) async {
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

  Future<bool> getDetails() async {
    final prefs = await SharedPreferences.getInstance();
    final email = prefs.getString('email');
    return email != null;
  }

  Future<void> clearDetails() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.clear();
  }

  Future<String> getEmail() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('email') ?? '';
  }

  Future<String> getRole() async {
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
