import 'package:flutter/material.dart';
import 'package:ramp_up/util/studentDTO.dart';

@immutable
class HomePageState {
  final bool isVisible;
  final List<Student> students;

  const HomePageState({
    required this.isVisible,
    required this.students,
  });

  static HomePageState get initialState => const HomePageState(
        isVisible: false,
        students: [],
      );

  HomePageState clone({
    bool? isVisible,
    List<Student>? students,
  }) {
    return HomePageState(
      isVisible: isVisible ?? this.isVisible,
      students: students ?? this.students,
    );
  }
}
