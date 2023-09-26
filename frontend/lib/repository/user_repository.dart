import 'dart:convert';

import 'package:frontend/model/user.dart';
import 'package:frontend/util/db_util.dart';
import 'package:frontend/util/local_storage.dart';
import 'package:frontend/util/refresh_token_util.dart';
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
          "password": password,
        },
      ),
    );
    if (res.statusCode == 201 || res.statusCode == 200) {
      final String rawCookies = res.headers['set-cookie']!;
      List<String> cookies = rawCookies.split('; ');

      if (cookies.length < 2 || res.statusCode == 500) {
        showToast('Failed Login..!');
        return false;
      }
      Map<String, dynamic> decodedToken =
          JwtDecoder.decode(cookies[0].split('accessToken=')[1]);
      localStorage.setEmail(decodedToken['email']);
      localStorage.setRole(decodedToken['role'].toLowerCase());
      localStorage.setAcessToken(cookies[0].split('accessToken=')[1]);
      localStorage
          .setRefreshToken(cookies[4].split('HttpOnly,refreshToken=')[1]);
      return true;
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
            'password': studentData['password'],
          },
        ),
      ),
    ];
    return userList;
  }

  Future<void> addUsers(User user) async {
    await refreshToken(await localStorage.getAccessToken());
    String token = await localStorage.getAccessToken();
    final res = await http.post(
      Uri.parse('$baseUrl/user/add'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Cookie': 'accessToken=$token',
      },
      body: jsonEncode(user.toJson()),
    );
    if (res.statusCode == 500) {
      showToast('Failed to Save User..!');
    }
  }

  Future<void> updateUsers(User user) async {
    await refreshToken(await localStorage.getAccessToken());
    String token = await localStorage.getAccessToken();
    final res = await http.put(
      Uri.parse('$baseUrl/user/${user.email}'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Cookie': 'accessToken=$token',
      },
      body: jsonEncode(user.toJson()),
    );
    if (res.statusCode == 500) {
      showToast('Failed to Update User..!');
    }
  }

  Future<void> deleteUsers(String email) async {
    await refreshToken(await localStorage.getAccessToken());
    String token = await localStorage.getAccessToken();
    final res = await http.delete(
      Uri.parse('$baseUrl/user/del/$email'),
      headers: <String, String>{
        'Cookie': 'accessToken=$token',
      },
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
