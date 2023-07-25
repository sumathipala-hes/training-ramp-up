import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../model/student.dart';
import 'home_page_event.dart';
import 'home_page_state.dart';

class HomePageBloc extends Bloc<HomePageEvent, HomePageState> {
  HomePageBloc(BuildContext context)
      : super(
          const HomePageState(
            students: [],
          ),
        ) {
    on<SaveStudentEvent>(_saveStudent);
  }

  void _saveStudent(SaveStudentEvent event, Emitter<HomePageState> emit) {
    emit(
      state.clone(
        students: [
          ...state.students,
          Student(
            id: '1',
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
