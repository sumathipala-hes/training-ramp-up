import 'package:flutter/material.dart';
import 'package:front_end/models/student.dart';
import 'package:front_end/models/user.dart';

@immutable
class AdminHomeState {
  final List<Student> entries;
  final List<User> userEntries;

  const AdminHomeState({
    required this.entries,
    required this.userEntries,
  });

  static AdminHomeState get initialState => const AdminHomeState(
        entries: [],
        userEntries: [],
      );

  AdminHomeState clone({
    List<Student>? entries,
    List<User>? userEntries,
  }) {
    return AdminHomeState(
      entries: entries ?? this.entries,
      userEntries: userEntries ?? this.userEntries,
    );
  }
}
