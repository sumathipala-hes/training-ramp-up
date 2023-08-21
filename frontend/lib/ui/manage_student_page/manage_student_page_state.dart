import 'package:flutter/material.dart';

@immutable
class ManageStudentPageState {
  final String gender;
  final String nameError;
  final String addressError;
  final String mobileError;

  const ManageStudentPageState({
    required this.gender,
    required this.nameError,
    required this.addressError,
    required this.mobileError,
  });

  static ManageStudentPageState get initialState =>
      const ManageStudentPageState(
        gender: '',
        nameError: '',
        addressError: '',
        mobileError: '',
      );

  ManageStudentPageState clone({
    String? gender,
    String? textFieldValue,
    String? nameError,
    String? addressError,
    String? mobileError,
  }) {
    return ManageStudentPageState(
      gender: gender ?? this.gender,
      nameError: nameError ?? this.nameError,
      addressError: addressError ?? this.addressError,
      mobileError: mobileError ?? this.mobileError,
    );
  }

  void setGender(String gender) {}
}
