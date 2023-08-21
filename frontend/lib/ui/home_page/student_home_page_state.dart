import 'package:flutter/material.dart';
import 'package:frontend/model/student.dart';

@immutable
class StudentHomePageState {
  final List<Student> students;
  const StudentHomePageState({
    required this.students,
  });

  static StudentHomePageState get initialState => const StudentHomePageState(
        students: [],
      );

  StudentHomePageState clone({
    List<Student>? students,
  }) {
    return StudentHomePageState(
      students: students ?? this.students,
    );
  }
}
