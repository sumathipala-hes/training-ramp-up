// ignore_for_file: unnecessary_null_comparison

import 'dart:convert';

import 'package:front_end/util/local_storage.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:logger/logger.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../model/user_model.dart';
import '../util/db_util.dart';
import '../util/notification_util.dart';
import 'package:http/http.dart' as http;

import 'auth_validate_repository.dart';

class UserRepository {
  Future<http.Response> getAllUsers() async {
    await getNewAccessToken();
    final token = await LocalStorage().getAccessToken();
    final response = await http.get(
      Uri.parse('$baseUrl/users'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer:$token',
      },
    );
    return response;
  }

  Future<http.Response> getUserByOne(String search) async {
    await getNewAccessToken();
    final token = await LocalStorage().getAccessToken();
    final response = await http.get(
      Uri.parse('$baseUrl/users/$search'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer:$token',
      },
    );
    return response;
  }

  Future<void> saveUser(User user) async {
    await getNewAccessToken();
    final token = await LocalStorage().getAccessToken();
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/users'),
        headers: <String, String>{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer:$token',
        },
        body: jsonEncode(user.toJson()),
      );

      if (response.statusCode != 201) {
        Logger().d('Successfully to create User: ${response.statusCode}');
      }
    } catch (error) {
      Logger().e('Error creating User: $error');
      showFieldError(
          'Error creating User: $error. Please contact the administrator or re-try register.');
    }
  }

  Future<void> updateUser(User user) async {
    await getNewAccessToken();
    final token = await LocalStorage().getAccessToken();
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/users/${user.email}'),
        headers: <String, String>{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer:$token',
        },
        body: jsonEncode(user.toJson()),
      );

      if (response.statusCode != 201) {
        Logger().d('Successfully to update User: ${response.statusCode}');
      }
    } catch (error) {
      Logger().e('Error updating user: $error');
    }
  }

  Future<void> deleteUser(String userEmail) async {
    await getNewAccessToken();
    final token = await LocalStorage().getAccessToken();
    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/users/$userEmail'),
        headers: <String, String>{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer:$token',
        },
      );

      if (response.statusCode != 201) {
        Logger().d('Successfully to delete User: ${response.statusCode}');
      }
    } catch (error) {
      Logger().e('Error deleting user: $error');
    }
  }

  Future<void> signIn(String userEmail, String userPassword) async {
    final res = await http.post(
      Uri.parse('$baseUrl/users/signIn'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        "email": userEmail,
        "password": userPassword,
      }),
    );

    if (res.statusCode == 200 || res.statusCode == 201) {
      final String rawCookies = res.headers['set-cookie']!;
      List<String> cookies = rawCookies.split('; ');

      Map<String, dynamic> decodeToken =
          JwtDecoder.decode(cookies[0].split('accessToken=')[1]);
      LocalStorage().setCurrentLoginRole(decodeToken['roleType']);
      LocalStorage().setCurrentLoginEmail(decodeToken['email']);
      LocalStorage().setAccessToken(cookies[0].split('accessToken=')[1]);
      LocalStorage().setRefreshToken(cookies[4].split('refreshToken=')[1]);
    }
    if (res.statusCode == 500) {
      showFieldError('Failed Login..!');
    }
  }

  Future<void> signOut() async {
    final token = await LocalStorage().getAccessToken();
    final prefs = await SharedPreferences.getInstance();
    prefs.remove('email');
    prefs.remove('roleType');

    await http.delete(
      Uri.parse('$baseUrl/users/signOut'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer:$token',
      },
    );
  }
}
