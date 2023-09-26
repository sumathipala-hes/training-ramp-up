import 'package:frontend/util/db_util.dart';
import 'package:frontend/util/local_storage.dart';
import 'package:frontend/util/show_toast.dart';
import 'package:http/http.dart' as http;
import 'package:logger/logger.dart';

class AuthRepository {
  Future<void> refreshToken() async {
    final refreshToken = await LocalStorage().getRefreshToken();
    final res = await http.post(
      Uri.parse('$baseUrl/auth/refreshToken'),
      headers: <String, String>{
        'Cookie': 'refreshToken=$refreshToken',
      },
    );
    if (res.statusCode == 200 || res.statusCode == 201) {
      final String rawCookies = res.headers['set-cookie']!;
      await LocalStorage()
          .setAcessToken(rawCookies.split(';')[0].split('accessToken=')[1]);
      Logger().d('Token Refreshed..!');
      return;
    }
    showToast('Failed to Generate Token..!');
  }
}
