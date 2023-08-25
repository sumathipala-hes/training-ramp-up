import 'dart:convert';
import 'package:front_end/models/user.dart';
import 'package:front_end/util/db_util.dart';
import 'package:front_end/util/toast_alert.dart';
import 'package:http/http.dart' as http;
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:shared_preferences/shared_preferences.dart';

class UserRepository {
  Future<http.Response> retrieveAllUsers() async {
    final response = await http.get(
      Uri.parse('$baseUrl/user'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
    );
    return response;
  }

  Future<void> registerUser(User user) async {
    final response = await http.post(
      Uri.parse('$baseUrl/user'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(
        user.toJson(),
      ),
    );
    if (response.statusCode == 500) {
      toastAlert('Failed to register user');
    }
  }

  Future<void> deleteUser(String id) async {
    final response = await http.delete(
      Uri.parse('$baseUrl/user/$id'),
    );
    if (response.statusCode == 500) {
      toastAlert('Failed to delete user');
    }
  }

  Future<void> updateUser(User user) async {
    final response = await http.put(
      Uri.parse('$baseUrl/user/${user.userEmail}'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(
        user.toJson(),
      ),
    );
    if (response.statusCode == 500) {
      toastAlert('Failed to update user');
    }
  }

    Future<bool> signIn(String userEmail, String userPassword) async {
    final res = await http.post(
      Uri.parse('$baseUrl/user/signIn'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(
        {
          "userEmail": userEmail,
          "userPassword": userPassword,
        },
      ),
    );
    if (res.statusCode == 200) {
      final Map<String, dynamic> jsonData = json.decode(res.body);
      final accessToken = jsonData['accessToken'];
      final refreshToken = jsonData['refreshToken'];

      if (refreshToken != null) {
        final prefs = await SharedPreferences.getInstance();
        Map<String, dynamic> decodedToken = JwtDecoder.decode(accessToken);
        prefs.setString('userEmail', decodedToken['userEmail']);
        prefs.setString('role', decodedToken['role']);
        return true;
      }
    }
    if (res.statusCode == 500) {
      toastAlert('Failed Login..!');
    }
    return false;
  }

  Future<void> signOut() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.remove('userEmail');
    prefs.remove('role');

    await http.delete(
      Uri.parse('$baseUrl/user/signOut'),
    );
  }
}
