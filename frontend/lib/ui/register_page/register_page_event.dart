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

class SetValidations extends RegisterPageEvent {
  final String nameError;
  final String emailError;
  final String passwordError;

  SetValidations({
    required this.nameError,
    required this.emailError,
    required this.passwordError,
  });
}
