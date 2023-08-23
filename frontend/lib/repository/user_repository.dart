import 'dart:convert';

import 'package:frontend/util/db_util.dart';
import 'package:frontend/util/show_toast.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class UserRepository {
  Future<void> signIn(String email, String password) async {
    final res = await http.post(
      Uri.parse('$baseUrl/user/signIn'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        email: email,
        password: password,
      }),
    );
    if (res.statusCode == 200) {
      final Map<String, dynamic> jsonData = json.decode(res.body);
      final accessToken = jsonData['accessToken'];
      final refreshToken = jsonData['refreshToken'];

      if (refreshToken != null) {
        final prefs = await SharedPreferences.getInstance();
        Map<String, dynamic> decodedToken = JwtDecoder.decode(accessToken);
        prefs.setString('email', decodedToken['email']);
        prefs.setString('role', decodedToken['role']);
      }
    }
    if (res.statusCode == 500) {
      showToast('Failed Login..!');
    }
  }
}
