import 'package:flutter/material.dart';

@immutable
abstract class AdminHomePageEvent {}

class SaveButtonPressed extends AdminHomePageEvent {
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

class GetAllStudents extends AdminHomePageEvent {
  GetAllStudents();
}

class DeleteStudent extends AdminHomePageEvent {
  final String id;

  DeleteStudent({
    required this.id,
  });
}

class UpdateStudent extends AdminHomePageEvent {
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
