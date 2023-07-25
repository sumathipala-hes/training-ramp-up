import 'package:flutter/material.dart';
import 'package:front_end/models/student.dart';

@immutable
class RampUpHomeState {
  final List<Student> entries;

  const RampUpHomeState({
    required this.entries,
  });

  static RampUpHomeState get initialState => const RampUpHomeState(
        entries: [],
      );

  RampUpHomeState clone({
    List<Student>? entries,
  }) {
    return RampUpHomeState(

      entries: entries ?? this.entries,
    );
  }
}
