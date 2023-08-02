import 'package:flutter/material.dart';

@immutable
class StudentPageState {
  final String gender;
  final String nameError;
  final String addressError;
  final String mobileError;

  const StudentPageState({
    required this.gender,
    required this.nameError,
    required this.addressError,
    required this.mobileError,
  });

  static StudentPageState get initialState => const StudentPageState(
        gender: '',
        nameError: '',
        addressError: '',
        mobileError: '',
      );

  StudentPageState clone({
    String? gender,
    String? textFieldValue,
    String? nameError,
    String? addressError,
    String? mobileError,
  }) {
    return StudentPageState(
      gender: gender ?? this.gender,
      nameError: nameError ?? this.nameError,
      addressError: addressError ?? this.addressError,
      mobileError: mobileError ?? this.mobileError,
    );
  }

  void setGender(String gender) {}
}
