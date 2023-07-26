import 'dart:async';
import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/data/dummy_data.dart';
import '../../model/student.dart';
import 'home_page_event.dart';
import 'home_page_state.dart';

class HomePageBloc extends Bloc<HomePageEvent, HomePageState> {
  HomePageBloc(BuildContext context) : super(HomePageState.initialState) {
    on<SaveStudentEvent>(_saveStudent);
    on<GetAllStudents>(_getAllStudents);
    GetAllStudents();
  }

  Future<FutureOr<void>> _saveStudent(
      SaveStudentEvent event, Emitter<HomePageState> emit) async {
    Student student = Student(
      id: (state.students.length + 1).toString(),
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

  Future<FutureOr<void>> _getAllStudents(
      GetAllStudents event, Emitter<HomePageState> emit) async {
    List<Student> dummyDataStudents =
        state.students.isNotEmpty ? [] : dummyData;
    List<Student> studentList = [...state.students, ...dummyDataStudents];
    emit(
      state.clone(
        students: studentList
            .map(
              (student) => Student(
                id: student.id,
                name: student.name,
                address: student.address,
                mobile: student.mobile,
                dob: student.dob,
                gender: student.gender,
              ),
            )
            .toList(),
      ),
    );
  }
}
