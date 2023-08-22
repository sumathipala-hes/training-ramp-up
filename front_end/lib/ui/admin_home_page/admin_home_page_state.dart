import 'package:flutter/material.dart';
import 'package:front_end/models/student.dart';

@immutable
class AdminHomeState {
  final List<Student> entries;

  const AdminHomeState({
    required this.entries,
  });

  static AdminHomeState get initialState => const AdminHomeState(
        entries: [],
      );

  AdminHomeState clone({
    List<Student>? entries,
  }) {
    return AdminHomeState(

      entries: entries ?? this.entries,
    );
  }
}
