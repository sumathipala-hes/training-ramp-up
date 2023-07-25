import 'package:flutter/material.dart';
import 'package:frontend/model/student.dart';

@immutable
class RootState {
  final List<Student> students;
  const RootState({
    required this.students,
  });

  static RootState get initialState => const RootState(
        students: [],
      );

  RootState clone({
    List<Student>? students,
  }) {
    return RootState(
      students: students ?? this.students,
    );
  }
}
