import 'package:flutter/material.dart';

@immutable
abstract class SignUpPageEvent {}

class SelectGender extends SignUpPageEvent {
  final String select;
  SelectGender({
    required this.select,
  });
}
