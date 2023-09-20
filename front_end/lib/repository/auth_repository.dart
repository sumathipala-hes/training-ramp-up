import 'package:http/http.dart' as http;
import '../util/db_util.dart';
import '../util/local_storage.dart';

class AuthRepository {
  Future<void> getNewAccessToken() async {
    final getNewAccessToken = await LocalStorage().getRefreshToken();
    await http.post(
      Uri.parse('$baseUrl/user/refreshToken'),
      headers: <String, String>{
        'Cookie': 'refreshToken=$getNewAccessToken',
      },
    );
  }
}
