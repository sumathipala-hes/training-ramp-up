import 'dart:async';
import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../model/student.dart';
import 'home_page_event.dart';
import 'home_page_state.dart';

class HomePageBloc extends Bloc<HomePageEvent, HomePageState> {
  HomePageBloc(BuildContext context) : super(HomePageState.initialState) {
    on<SaveStudentEvent>(_saveStudent);
    on<GetAllStudents>(_getAllStudents);
  }

  Future<FutureOr<void>> _saveStudent(
      SaveStudentEvent event, Emitter<HomePageState> emit) async {
    Student student = Student(
      id: '1',
      name: event.name,
      address: event.address,
      mobile: event.mobile,
      dob: event.dob,
      gender: event.gender,
    );
    emit(
      state.clone(
        students: [
          ...state.students,
          student,
        ],
      ),
    );
  }

  Future<List<Student>> _getAllEvent() async {
    List<Student> getAll = state.students.toList();
    return getAll
        .map(
          (e) => Student(
            id: e.id,
            name: e.name,
            address: e.address,
            mobile: e.mobile,
            dob: e.dob,
            gender: e.gender,
          ),
        )
        .toList();
  }

  Future<FutureOr<void>> _getAllStudents(
      GetAllStudents event, Emitter<HomePageState> emit) async {
    emit(
      state.clone(
        students: await _getAllEvent(),
      ),
    );
  }
}
