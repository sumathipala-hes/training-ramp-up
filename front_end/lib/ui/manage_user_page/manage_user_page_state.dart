import 'package:flutter/material.dart';
import 'package:front_end/enum/role_enum.dart';

@immutable
class ManageUserScreenState {
  final String role;

  const ManageUserScreenState({
    required this.role,
  });

  static ManageUserScreenState get initialState => ManageUserScreenState(
        role: RoleEnum.user.toString().split('.').last,
      );

  ManageUserScreenState clone({
    String? role,
  }) {
    return ManageUserScreenState(
      role: this.role,
    );
  }
}
