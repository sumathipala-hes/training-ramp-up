import 'package:flutter/material.dart';

@immutable
abstract class ManageStudentScreenEvent {}

class SelectGender extends ManageStudentScreenEvent {
  final String gender;

  SelectGender({
    required this.gender,
  });
}
