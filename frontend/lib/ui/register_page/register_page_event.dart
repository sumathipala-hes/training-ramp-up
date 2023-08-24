import 'package:frontend/model/user.dart';

abstract class RegisterPageEvent {}

class RegisterUserEvent extends RegisterPageEvent {
  final User user;
  final String confirmPassword;

  RegisterUserEvent({
    required this.user,
    required this.confirmPassword,
  });
}
