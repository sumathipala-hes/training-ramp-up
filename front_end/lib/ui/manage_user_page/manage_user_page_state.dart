import 'package:flutter/material.dart';

@immutable
class ManageUserScreenState {
  final String role;

  const ManageUserScreenState({
    required this.role,
  });

  static ManageUserScreenState get initialState => const ManageUserScreenState(
        role: 'USER',
      );

  ManageUserScreenState clone({
    String? role,
  }) {
    return ManageUserScreenState(
      role: this.role,
    );
  }
}
