import 'package:flutter/material.dart';

@immutable
class ManageUserPageState {
  final String role;

  const ManageUserPageState({
    required this.role,
  });

  static ManageUserPageState get initialState => const ManageUserPageState(
        role: 'User',
      );

  ManageUserPageState clone({
    String? role,
  }) {
    return ManageUserPageState(
      role: role ?? this.role,
    );
  }
}
