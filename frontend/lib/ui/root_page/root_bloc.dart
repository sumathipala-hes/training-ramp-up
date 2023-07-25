import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/model/student.dart';
import 'package:frontend/ui/root_page/root_event.dart';
import 'package:frontend/ui/root_page/root_state.dart';

class RootBloc extends Bloc<RootEvent, RootState> {
  RootBloc(BuildContext context) : super(const RootState(students: [])) {
    on<SaveStudentEvent>(_saveStudent);
  }

  void _saveStudent(SaveStudentEvent event, Emitter<RootState> emit) {
    emit(
      state.clone(
        students: [
          ...state.students,
          Student(
            id: 'id',
            name: event.name,
            address: event.address,
            mobile: event.mobile,
            dob: event.dob,
            gender: event.gender,
          ),
        ],
      ),
    );
  }
}
