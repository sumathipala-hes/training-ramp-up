import 'package:flutter/material.dart';
import 'package:frontend/enum/role_enum.dart';

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

  static ManageUserPageState get initialState => ManageUserPageState(
        role: RoleEnum.user.toString().split('.').last,
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
