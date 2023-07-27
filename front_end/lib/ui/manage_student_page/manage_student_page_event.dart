import 'package:flutter/material.dart';

@immutable
abstract class StudentManageEvent {}

class SelectGender extends StudentManageEvent {
  final String select;
  SelectGender({
    required this.select,
  });
}
