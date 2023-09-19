import 'dart:async';
import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:jwt_decoder/jwt_decoder.dart';

import '../util/db_util.dart';
import '../util/local_storage.dart';

Future<void> getNewAccessToken() async {
  final refreshToken = await LocalStorage().getRefreshToken();
  final token = await LocalStorage().getAccessToken();
  // ignore: unnecessary_null_comparison
  if (token != null && JwtDecoder.isExpired(token)) {
    final res = await http.post(
      Uri.parse('$baseUrl/users/refreshToken'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: '{"refreshToken": "$refreshToken"}',
    );

    if (res.statusCode == 200) {
      final accessToken = jsonDecode(res.body)['accessToken'];
      await LocalStorage().setAccessToken(accessToken);
    }
  }
}
