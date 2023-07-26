import 'package:flutter/material.dart';

@immutable
class ManageStudentScreenState {
  final String gender;

  const ManageStudentScreenState({
    required this.gender,
  });

  static ManageStudentScreenState get initialState =>
      const ManageStudentScreenState(
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
