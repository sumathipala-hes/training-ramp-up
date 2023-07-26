import 'package:flutter/material.dart';

@immutable
abstract class RampUpHomePageEvent {}

class SaveButtonPressed extends RampUpHomePageEvent {
  final String studentId;
  final String studentName;
  final String studentAddress;
  final String studentMobile;
  final DateTime studentDob;
  final String studentGender;

  SaveButtonPressed({
    required this.studentId,
    required this.studentName,
    required this.studentAddress,
    required this.studentMobile,
    required this.studentDob,
    required this.studentGender,
  });
}

class GetAllStudents extends RampUpHomePageEvent {
  GetAllStudents();
}

class DeleteStudent extends RampUpHomePageEvent {
  final String id;

  DeleteStudent({
    required this.id,
  });
}

class UpdateStudent extends RampUpHomePageEvent {
  final String studentId;
  final String studentName;
  final String studentAddress;
  final String studentMobile;
  final DateTime studentDob;
  final String studentGender;

  UpdateStudent({
    required this.studentId,
    required this.studentName,
    required this.studentAddress,
    required this.studentMobile,
    required this.studentDob,
    required this.studentGender,
  });
}
