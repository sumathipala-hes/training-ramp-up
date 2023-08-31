import 'package:flutter/material.dart';

@immutable
abstract class SignInPageEvent {}

class Login extends SignInPageEvent {
  final String userEmail;
  final String userPassword;

  Login({
    required this.userEmail,
    required this.userPassword,
  });
}
