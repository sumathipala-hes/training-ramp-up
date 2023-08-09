import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/model/notification_data.dart';
import 'package:frontend/repository/student_repository.dart';
import 'package:frontend/util/notification_util.dart';
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
    configListener();
  }

  final String baseUrl = 'http://192.168.8.105:5000/api/v1';

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

    final response = await StudentRepository().addStudents(student);

    if (response.statusCode == 200) {
      add(GetAllStudents());
      sendNotification(
        NotificationData(
          title: "Successful",
          body: 'Student Saved..!',
        ),
      );
    } else {}
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

    final response = await StudentRepository().updateStudents(student);

    if (response.statusCode == 200) {
      add(GetAllStudents());
      sendNotification(
        NotificationData(
          title: "Successful",
          body: 'Student Updated..!',
        ),
      );
    } else {
      Logger().e('Something Went Wrong..!');
    }
  }

  Future<FutureOr<void>> _deleteStudent(
    DeleteStudentEvent event,
    Emitter<HomePageState> emit,
  ) async {
    final response = await StudentRepository().deleteStudents(event.id);

    if (response.statusCode == 200) {
      add(GetAllStudents());
      sendNotification(
        NotificationData(
          title: "Successful",
          body: 'Student Deleted..!',
        ),
      );
    } else {
      Logger().e('Something Went Wrong..!');
    }
  }

  Future<FutureOr<void>> _getAllStudents(
    GetAllStudents event,
    Emitter<HomePageState> emit,
  ) async {
    final response = await StudentRepository().fetchStudents();

    if (response.statusCode == 200) {
      List<dynamic> responseData = jsonDecode(response.body);
      List<Student> studentList = [
        ...responseData.map((studentData) => Student.fromJson(studentData)),
      ];

      emit(
        state.clone(
          students: studentList,
        ),
      );
    } else {
      Logger().e('Something Went Wrong..!');
    }
  }
}
