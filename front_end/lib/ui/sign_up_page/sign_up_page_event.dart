import 'package:flutter/material.dart';

@immutable
abstract class SignUpPageEvent {}

class SelectGender extends SignUpPageEvent {
  final String select;
  SelectGender({
    required this.select,
  });
}

class RegisterUser extends SignUpPageEvent {
  final String nameText;
  final String addressText;
  final String emailText;
  final String mobileNoText;
  final DateTime dateText;
  final String selectedGender;
  final String passwordText;

  RegisterUser({
    required this.nameText,
    required this.addressText,
    required this.emailText,
    required this.mobileNoText,
    required this.dateText,
    required this.selectedGender,
    required this.passwordText,
  });
}
