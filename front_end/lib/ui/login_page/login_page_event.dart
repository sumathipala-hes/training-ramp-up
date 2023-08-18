import 'package:flutter/material.dart';

@immutable
abstract class LoginPageEvent {}

class SubmitLoginDetails extends LoginPageEvent {
  final String email;
  final String password;

  SubmitLoginDetails(
    this.email,
    this.password,
  );
}
