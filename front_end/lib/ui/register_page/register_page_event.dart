import 'package:flutter/material.dart';

@immutable
abstract class RegisterScreenEvent {}

class SelectGender extends RegisterScreenEvent {
  final String gender;

  SelectGender({
    required this.gender,
  });
}


