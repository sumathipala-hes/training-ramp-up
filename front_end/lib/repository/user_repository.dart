import 'dart:convert';
import 'package:front_end/models/user.dart';
import 'package:front_end/util/db_util.dart';
import 'package:front_end/util/toast_alert.dart';
import 'package:http/http.dart' as http;
import 'package:jwt_decoder/jwt_decoder.dart';
import '../util/local_storage.dart';
import '../util/refresh_token_util.dart';

class UserRepository {
  final localStorage = LocalStorage();

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
    await refreshToken(await localStorage.getAccessToken());
    String accessToken = await localStorage.getAccessToken();
    final response = await http.post(
      Uri.parse('$baseUrl/user'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Cookie': 'accessToken=$accessToken',
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
    await refreshToken(await localStorage.getAccessToken());
    String accessToken = await localStorage.getAccessToken();
    final response = await http.delete(
      Uri.parse('$baseUrl/user/$id'),
      headers: <String, String>{
        'Cookie': 'accessToken=$accessToken',
      },
    );
    if (response.statusCode == 500) {
      toastAlert('Failed to delete user');
    }
  }

  Future<void> updateUser(User user) async {
    await refreshToken(await localStorage.getAccessToken());
    String accessToken = await localStorage.getAccessToken();
    final response = await http.put(
      Uri.parse('$baseUrl/user/${user.userEmail}'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Cookie': 'accessToken=$accessToken',
      },
      body: jsonEncode(
        user.toJson(),
      ),
    );
    if (response.statusCode == 500) {
      toastAlert('Failed to update user');
    }
  }

  Future<void> signIn(String userEmail, String userPassword) async {
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
      localStorage.setAcessToken(accessToken);
      localStorage.setRefreshToken(refreshToken);

      if (refreshToken != null) {
        Map<String, dynamic> decodedToken = JwtDecoder.decode(accessToken);
        localStorage.setUserEmail(decodedToken['userEmail']);
        localStorage.setCurrentRole(decodedToken['role']);
        localStorage.setAcessToken(accessToken);
        localStorage.setRefreshToken(jsonData['refreshToken']);
      }

      if (res.statusCode == 500) {
        toastAlert('Failed Login..!');
      }
    }
  }

  Future<void> signOut() async {
    await localStorage.clearSetValues();
    await http.delete(
      Uri.parse('$baseUrl/user/signOut'),
    );
  }
}
