// ignore_for_file: must_be_immutable
import 'package:flutter/material.dart';

@immutable
class RegisterScreenState {
   String gender;

   RegisterScreenState({
    required this.gender,
  });

  static RegisterScreenState get initialState =>
     RegisterScreenState(
        gender: '',
      );

  RegisterScreenState clone({
    String? gender,
  }) {
    return RegisterScreenState(
      gender: gender ?? this.gender,
    );
  }
}
