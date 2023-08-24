import 'package:flutter/material.dart';

@immutable
class ManageUserPageState {
  final String role;
  final String nameError;
  final String emailError;
  final String passwordError;

  const ManageUserPageState({
    required this.role,
    required this.nameError,
    required this.emailError,
    required this.passwordError,
  });

  static ManageUserPageState get initialState => const ManageUserPageState(
        role: 'User',
        nameError: '',
        emailError: '',
        passwordError: '',
      );

  ManageUserPageState clone({
    String? role,
    String? nameError,
    String? emailError,
    String? passwordError,
  }) {
    return ManageUserPageState(
      role: role ?? this.role,
      nameError: nameError ?? this.nameError,
      emailError: emailError ?? this.emailError,
      passwordError: passwordError ?? this.passwordError,
    );
  }
}
