import 'package:flutter/material.dart';

@immutable
abstract class SignInPageEvent {}

class SubmitLoginDetails extends SignInPageEvent {
  final String email;
  final String password;

  SubmitLoginDetails(
    this.email,
    this.password,
  );
}
