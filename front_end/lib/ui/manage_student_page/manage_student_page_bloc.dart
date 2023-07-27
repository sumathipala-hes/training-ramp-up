import 'dart:async';

import 'package:flutter_bloc/flutter_bloc.dart';

import 'manage_student_page_event.dart';
import 'manage_student_page_state.dart';

class StudentManageBloc extends Bloc<StudentManageEvent, StudentManageState> {
  StudentManageBloc() : super(StudentManageState.initialState) {
    on<SelectGender>(_selectGender);
  }

  FutureOr<void> _selectGender(
      SelectGender event, Emitter<StudentManageState> emit) {
    emit(state.clone(selectedGender: event.select));
  }

}
