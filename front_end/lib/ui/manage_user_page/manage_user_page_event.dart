import 'package:flutter/material.dart';

@immutable
abstract class ManageUserScreenEvent {}

class SetRoleEvent extends ManageUserScreenEvent {
  final String role;

  SetRoleEvent(
    this.role,
  );
}
