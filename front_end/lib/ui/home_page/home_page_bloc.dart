import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/models/student.dart';
import 'package:front_end/ui/home_page/home_page_event.dart';
import 'package:front_end/ui/home_page/home_page_state.dart';

class RampUpHomeScreenBloc extends Bloc<RampUpHomePageEvent, RampUpHomeState> {
  RampUpHomeScreenBloc(BuildContext context)
      : super(RampUpHomeState.initialState) {
    on<SaveButtonPressed>(_onSaveButtonPressed);
  }

  FutureOr<void> _onSaveButtonPressed(
      SaveButtonPressed event, Emitter<RampUpHomeState> emit) {
    final student = Student(
      studentId: event.studentId,
      studentName: event.studentName,
      studentAddress: event.studentAddress,
      studentMobile: event.studentMobile,
      studentDob: DateTime.parse(event.studentDob),
      studentGender: event.studentGender,
    );
    // print(student.studentId);
    // print(student.studentName);
    // print(student.studentAddress);
    // print(student.studentMobile);
    // print(student.studentDob);
    // print(student.studentGender);

    emit(
      state.clone(
        entries: [
          ...state.entries,
          student,
        ],
      ),
    );
  }
}
