import 'package:jwt_decoder/jwt_decoder.dart';
import '../repository/auth_repository.dart';

Future<void> refreshToken(String accessToken) async {
  if (JwtDecoder.isExpired(accessToken)) {
    AuthRepository authRepository = AuthRepository();
    authRepository.getNewAccessToken();
  }
}