import 'package:flutter/material.dart';
import 'package:ramp_up/util/studentDTO.dart';

@immutable
class HomeState {
  final bool isVisible;
  final List<Student> student;

  const HomeState({
    required this.isVisible,
    required this.student,
  });

  static HomeState get initials => const HomeState(
        isVisible: false,
        student: [],
      );

  HomeState clone({
    bool? isVisible,
    List<Student>? student,
  }) {
    return HomeState(
      isVisible: isVisible ?? this.isVisible,
      student: student ?? this.student,
    );
  }
}
