import 'package:flutter/material.dart';

@immutable
class RegisterPageState {
  final String nameError;
  final String emailError;
  final String passwordError;

  const RegisterPageState({
    required this.nameError,
    required this.emailError,
    required this.passwordError,
  });

  static RegisterPageState get initialState => const RegisterPageState(
        nameError: '',
        emailError: '',
        passwordError: '',
      );

  RegisterPageState clone({
    String? nameError,
    String? emailError,
    String? passwordError,
  }) {
    return RegisterPageState(
      nameError: nameError ?? this.nameError,
      emailError: emailError ?? this.emailError,
      passwordError: passwordError ?? this.passwordError,
    );
  }
}
