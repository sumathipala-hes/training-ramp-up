import 'package:flutter/material.dart';
import 'package:frontend/model/student.dart';

@immutable
class HomePageState {
  final List<Student> students;
  const HomePageState({
    required this.students,
  });

  static HomePageState get initialState => const HomePageState(
        students: [],
      );

  HomePageState clone({
    List<Student>? students,
  }) {
    return HomePageState(
      students: students ?? this.students,
    );
  }
}
