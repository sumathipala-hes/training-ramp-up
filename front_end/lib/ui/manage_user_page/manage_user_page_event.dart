import 'package:flutter/material.dart';

@immutable
abstract class UserManageEvent {}

class SelectGender extends UserManageEvent {
  final String select;
  SelectGender({
    required this.select,
  });
}

class SelectRole extends UserManageEvent {
  final String select;
  SelectRole({
    required this.select,
  });
}
