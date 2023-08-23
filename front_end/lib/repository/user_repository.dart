import 'dart:convert';
import 'package:front_end/models/user.dart';
import 'package:front_end/util/db_util.dart';
import 'package:front_end/util/toast_alert.dart';
import 'package:http/http.dart' as http;

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
}
