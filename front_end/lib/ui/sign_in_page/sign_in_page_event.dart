import 'package:flutter/material.dart';

@immutable
abstract class SignInPageEvent {}

class SubmitLoginDetails extends SignInPageEvent {
  final String email;
  final String password;

  SubmitLoginDetails({
    required this.email,
    required this.password,
  });
}
