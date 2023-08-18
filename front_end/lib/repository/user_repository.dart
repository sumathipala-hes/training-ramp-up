import 'dart:convert';

import 'package:logger/logger.dart';

import '../model/user_model.dart';
import '../util/db_util.dart';
import '../util/notification.util.dart';
import 'package:http/http.dart' as http;

class UserRepository {
  Future<void> saveUser(User user) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/users'),
        headers: <String, String>{
          'Content-Type': 'application/json',
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
}
