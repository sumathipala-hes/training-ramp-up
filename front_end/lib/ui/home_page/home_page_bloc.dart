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
    on<GetAllStudents>(_onGetAllStudents);
    on<DeleteStudent>(_onDeleteStudent);
    on<UpdateStudent>(_onUpdateStudent);
    add(
      GetAllStudents(),
    );
  }

  Future<void> _onSaveButtonPressed(
      SaveButtonPressed event, Emitter<RampUpHomeState> emit) async {
    final student = Student(
      studentId: (state.entries.length + 1).toString(),
      studentName: event.studentName,
      studentAddress: event.studentAddress,
      studentMobile: event.studentMobile,
      studentDob: event.studentDob,
      studentGender: event.studentGender,
    );

    emit(
      state.clone(
        entries: [
          ...state.entries,
          student,
        ],
      ),
    );
    emit(
      state.clone(
        entries: [
          ...state.entries,
        ],
      ),
    );
  }

  Future<void> _onGetAllStudents(
      GetAllStudents event, Emitter<RampUpHomeState> emit) async {
    emit(
      state.clone(
        entries: [
          ...state.entries,
        ],
      ),
    );
  }

  Future<void> _onDeleteStudent(
      DeleteStudent event, Emitter<RampUpHomeState> emit) async {
    emit(
      state.clone(
        entries: [
          ...state.entries.where((element) => element.studentId != event.id),
        ],
      ),
    );
  }

  Future<void> _onUpdateStudent(
      UpdateStudent event, Emitter<RampUpHomeState> emit) async {
    state.entries[state.entries
            .indexWhere((element) => element.studentId == event.studentId)] =
        Student(
      studentId: event.studentId,
      studentName: event.studentName,
      studentAddress: event.studentAddress,
      studentMobile: event.studentMobile,
      studentDob: event.studentDob,
      studentGender: event.studentGender,
    );
    emit(
      state.clone(
        entries: [
          ...state.entries,
        ],
      ),
    );
  }
}
