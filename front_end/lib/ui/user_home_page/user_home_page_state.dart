import 'package:flutter/material.dart';
import 'package:front_end/models/student.dart';

@immutable
class UserHomeState {
  final List<Student> entries;

  const UserHomeState({
    required this.entries,
  });

  static UserHomeState get initialState => const UserHomeState(
        entries: [],
      );

  UserHomeState clone({
    List<Student>? entries,
  }) {
    return UserHomeState(

      entries: entries ?? this.entries,
    );
  }
}
