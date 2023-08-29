import 'package:flutter/material.dart';

abstract class SignInPageEvent {}

class SignInEvent extends SignInPageEvent {
  final String email;
  final String password;
  final BuildContext context;

  SignInEvent({
    required this.email,
    required this.password,
    required this.context,
  });
}
