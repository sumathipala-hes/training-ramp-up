// ignore_for_file: must_be_immutable
import 'package:flutter/material.dart';

@immutable
class ManageStudentScreenState {
   String gender;

   ManageStudentScreenState({
    required this.gender,
  });

  static ManageStudentScreenState get initialState =>
     ManageStudentScreenState(
        gender: '',
      );

  ManageStudentScreenState clone({
    String? gender,
  }) {
    return ManageStudentScreenState(
      gender: gender ?? this.gender,
    );
  }
}
