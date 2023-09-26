import 'package:frontend/repository/auth_repository.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

Future<void> refreshToken(String accessToken) async {
  if (JwtDecoder.isExpired(accessToken)) {
    AuthRepository authRepository = AuthRepository();
    await authRepository.refreshToken();
  }
}
