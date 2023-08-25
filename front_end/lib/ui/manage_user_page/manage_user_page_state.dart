import 'package:flutter/material.dart';

@immutable
class ManageUserScreenState {
  final String role;
  final bool isPasswordVisible;

  const ManageUserScreenState({
    required this.role,
    required this.isPasswordVisible,
  });

  static ManageUserScreenState get initialState => const ManageUserScreenState(
        role: 'USER',
        isPasswordVisible: false,
      );

  ManageUserScreenState clone({
    String? role,
    bool? isPasswordVisible,
  }) {
    return ManageUserScreenState(
      role: this.role,
      isPasswordVisible: isPasswordVisible ?? this.isPasswordVisible,
    );
  }
}
