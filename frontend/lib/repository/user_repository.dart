import 'dart:convert';

import 'package:frontend/util/db_util.dart';
import 'package:frontend/util/show_toast.dart';
import 'package:http/http.dart' as http;

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
    if (res.statusCode == 500) {
      showToast('Failed Login..!');
    }
  }
}
