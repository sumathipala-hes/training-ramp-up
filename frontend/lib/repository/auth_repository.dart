import 'package:frontend/util/db_util.dart';
import 'package:frontend/util/local_storage.dart';
import 'package:frontend/util/show_toast.dart';
import 'package:http/http.dart' as http;

class AuthRepository {
  Future<void> refreshToken() async {
    final refreshToken = await LocalStorage().getRefreshToken();
    final res = await http.post(
      Uri.parse('$baseUrl/auth/'),
      headers: <String, String>{
        'Cookie': 'refreshToken=$refreshToken',
      },
    );
    final String rawCookies = res.headers['set-cookie']!;
    List<String> cookies = rawCookies.split('; ');
    LocalStorage().setAcessToken(cookies[0].split('accessToken=')[1]);
    if (res.statusCode == 500) {
      showToast('Failed to Generate Token..!');
    }
  }
}
