import 'dart:convert';

import 'package:frontend/model/user.dart';
import 'package:frontend/util/db_util.dart';
import 'package:frontend/util/encrypt_decrypt_util.dart';
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
        "email": email,
        "password": password,
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

  Future<List<User>> fetchUsers() async {
    final response = await http.get(
      Uri.parse('$baseUrl/user'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
    );
    List<dynamic> responseData = jsonDecode(response.body);
    List<User> userList = [
      ...responseData.map(
        (studentData) => User.fromJson(
          {
            ...studentData,
            'password': decryptPassword(
              studentData['password'],
            ),
          },
        ),
      ),
    ];
    return userList;
  }

  Future<void> addUsers(User user) async {
    final res = await http.post(
      Uri.parse('$baseUrl/user'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(user.toJson()),
    );
    if (res.statusCode == 500) {
      showToast('Failed to Save Student');
    }
  }

  Future<void> updateUsers(User user) async {
    final res = await http.put(
      Uri.parse('$baseUrl/user/${user.email}'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(user.toJson()),
    );
    if (res.statusCode == 500) {
      showToast('Failed to Update Student');
    }
  }

  Future<void> deleteUsers(String email) async {
    final res = await http.delete(
      Uri.parse('$baseUrl/user/$email'),
    );
    if (res.statusCode == 500) {
      showToast('Failed to Delete Student');
    }
  }

  Future<void> signOut() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.remove('email');
    prefs.remove('role');

    await http.delete(
      Uri.parse('$baseUrl/user/signOut'),
    );
  }
}
