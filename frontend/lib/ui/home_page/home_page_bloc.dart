import 'dart:async';
import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/data/dummy_data.dart';
import 'package:frontend/util/generate_id_util.dart';
import '../../model/student.dart';
import 'home_page_event.dart';
import 'home_page_state.dart';

class HomePageBloc extends Bloc<HomePageEvent, HomePageState> {
  HomePageBloc(BuildContext context) : super(HomePageState.initialState) {
    on<SaveStudentEvent>(_saveStudent);
    on<GetAllStudents>(_getAllStudents);
    on<UpdateStudentEvent>(_updateStudent);
    on<DeleteStudentEvent>(_deleteStudent);
    GetAllStudents();
  }

  Future<FutureOr<void>> _saveStudent(
      SaveStudentEvent event, Emitter<HomePageState> emit) async {
    Student student = Student(
      id: GenerateIdUtil.generateId(
        state.students[state.students.length - 1].id,
      ),
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

  Future<FutureOr<void>> _updateStudent(
      UpdateStudentEvent event, Emitter<HomePageState> emit) async {
    Student student = Student(
      id: event.id,
      name: event.name,
      address: event.address,
      mobile: event.mobile,
      dob: event.dob,
      gender: event.gender,
    );

    List<Student> studentList = state.students;
    for (var i = 0; i < studentList.length; i++) {
      if (studentList[i].id == student.id) {
        studentList[i] = student;
        break;
      }
    }
    emit(
      state.clone(
        students: [
          ...studentList,
        ],
      ),
    );
  }

  Future<FutureOr<void>> _deleteStudent(
      DeleteStudentEvent event, Emitter<HomePageState> emit) async {
    List<Student> studentList = state.students;
    for (var i = 0; i < studentList.length; i++) {
      if (studentList[i].id == event.id) {
        studentList.removeAt(i);
        break;
      }
    }
    emit(
      state.clone(
        students: [
          ...studentList,
        ],
      ),
    );
  }

  Future<FutureOr<void>> _getAllStudents(
      GetAllStudents event, Emitter<HomePageState> emit) async {
    List<Student> dummyDataStudents =
        state.students.isNotEmpty ? [] : dummyData;
    List<Student> studentList = [
      ...state.students,
      ...dummyDataStudents,
    ];
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
