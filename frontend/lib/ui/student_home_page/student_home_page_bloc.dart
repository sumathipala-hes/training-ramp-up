import 'dart:async';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/repository/student_repository.dart';
import 'package:frontend/util/notification_util.dart';
import '../../model/student.dart';
import 'student_home_page_event.dart';
import 'student_home_page_state.dart';

class StudentHomePageBloc
    extends Bloc<StudentHomePageEvent, StudentHomePageState> {
  StudentHomePageBloc(BuildContext context)
      : super(StudentHomePageState.initialState) {
    on<SaveStudentEvent>(_saveStudent);
    on<GetAllStudents>(_getAllStudents);
    on<UpdateStudentEvent>(_updateStudent);
    on<DeleteStudentEvent>(_deleteStudent);
    add(GetAllStudents());
    FirebaseMessaging.instance.getToken();
    configListener();
  }

  StudentRepository studentRepository = StudentRepository();

  Future<FutureOr<void>> _saveStudent(
    SaveStudentEvent event,
    Emitter<StudentHomePageState> emit,
  ) async {
    Student student = Student(
      id: '',
      name: event.name,
      address: event.address,
      mobile: event.mobile,
      dob: event.dob,
      gender: event.gender,
    );

    await studentRepository.addStudents(student);
    add(GetAllStudents());
  }

  Future<FutureOr<void>> _updateStudent(
    UpdateStudentEvent event,
    Emitter<StudentHomePageState> emit,
  ) async {
    Student student = Student(
      id: event.id,
      name: event.name,
      address: event.address,
      mobile: event.mobile,
      dob: event.dob,
      gender: event.gender,
    );

    await studentRepository.updateStudents(student);
    add(GetAllStudents());
  }

  Future<FutureOr<void>> _deleteStudent(
    DeleteStudentEvent event,
    Emitter<StudentHomePageState> emit,
  ) async {
    await studentRepository.deleteStudents(event.id);
    add(GetAllStudents());
  }

  Future<FutureOr<void>> _getAllStudents(
    GetAllStudents event,
    Emitter<StudentHomePageState> emit,
  ) async {
    final studentList = await studentRepository.fetchStudents();

    emit(
      state.clone(
        students: studentList,
      ),
    );
  }
}
