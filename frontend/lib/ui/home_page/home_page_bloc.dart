import 'dart:async';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/repository/student_repository.dart';
import 'package:frontend/util/show_toast.dart';
import 'package:logger/logger.dart';
import '../../model/student.dart';
import 'home_page_event.dart';
import 'home_page_state.dart';

class HomePageBloc extends Bloc<HomePageEvent, HomePageState> {
  HomePageBloc(BuildContext context) : super(HomePageState.initialState) {
    on<SaveStudentEvent>(_saveStudent);
    on<GetAllStudents>(_getAllStudents);
    on<UpdateStudentEvent>(_updateStudent);
    on<DeleteStudentEvent>(_deleteStudent);
    add(GetAllStudents());
    FirebaseMessaging.instance.getToken();
    _configListener();
  }

  StudentRepository studentRepository = StudentRepository();

  Future<FutureOr<void>> _saveStudent(
    SaveStudentEvent event,
    Emitter<HomePageState> emit,
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
    Emitter<HomePageState> emit,
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
    Emitter<HomePageState> emit,
  ) async {
    await studentRepository.deleteStudents(event.id);
    add(GetAllStudents());
  }

  Future<FutureOr<void>> _getAllStudents(
    GetAllStudents event,
    Emitter<HomePageState> emit,
  ) async {
    final studentList = await studentRepository.fetchStudents();

    emit(
      state.clone(
        students: studentList,
      ),
    );
  }

  void _configListener() {
    FirebaseMessaging.instance.getToken();

    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      Logger().d('Got a message whilst in the foreground!');
      Logger().d('Message data: ${message.data}');

      if (message.notification != null) {
        Logger().d(
            'Message also contained a notification: ${message.notification?.title}');

        Logger().d(
            'Message also contained a notification: ${message.notification?.body}');
        showToast(message.notification!.body!);
      }
    });
  }
}
