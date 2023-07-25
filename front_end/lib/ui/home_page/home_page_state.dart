import 'package:flutter/material.dart';
import 'package:ramp_up/model/student_model.dart';

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
    bool? isVisible,
    List<Student>? students,
  }) {
    return HomePageState(
      students: students ?? this.students,
    );
  }
}
