import 'dart:convert';

import 'package:frontend/model/user.dart';
import 'package:frontend/util/db_util.dart';
import 'package:frontend/util/encrypt_decrypt_util.dart';
import 'package:frontend/util/local_storage.dart';
import 'package:frontend/util/show_toast.dart';
import 'package:http/http.dart' as http;
import 'package:jwt_decoder/jwt_decoder.dart';

class UserRepository {
  final localStorage = LocalStorage();

  Future<bool> signIn(String email, String password) async {
    final res = await http.post(
      Uri.parse('$baseUrl/user/signIn'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(
        {
          "email": email,
          "password": decryptPassword(password),
        },
      ),
    );
    if (res.statusCode == 200) {
      final Map<String, dynamic> jsonData = json.decode(res.body);
      final accessToken = jsonData['accessToken'];

      if (accessToken != null) {
        Map<String, dynamic> decodedToken = JwtDecoder.decode(accessToken);
        localStorage.setEmail(decodedToken['email']);
        localStorage.setRole(decodedToken['role'].toLowerCase());
        return true;
      }
    }
    if (res.statusCode == 500) {
      showToast('Failed Login..!');
    }
    return false;
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
      Uri.parse('$baseUrl/user/add'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(user.toJson()),
    );
    if (res.statusCode == 500) {
      showToast('Failed to Save User..!');
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
      showToast('Failed to Update User..!');
    }
  }

  Future<void> deleteUsers(String email) async {
    final res = await http.delete(
      Uri.parse('$baseUrl/user/del/$email'),
    );
    if (res.statusCode == 500) {
      showToast('Failed to Delete User..!');
    }
  }

  Future<void> signOut() async {
    await localStorage.clearDetails();

    await http.delete(
      Uri.parse('$baseUrl/user/signOut'),
    );
  }
}
