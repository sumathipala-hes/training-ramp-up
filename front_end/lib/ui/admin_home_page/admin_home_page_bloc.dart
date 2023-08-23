import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_event.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_state.dart';
import 'package:front_end/util/firebase_messaging.dart';
import 'package:front_end/models/student.dart';
import 'package:front_end/repository/student_repository.dart';

class AdminHomeScreenBloc extends Bloc<AdminHomePageEvent, AdminHomeState> {
  AdminHomeScreenBloc(BuildContext context)
      : super(AdminHomeState.initialState) {
    on<SaveButtonPressed>(_onSaveButtonPressed);
    on<GetAllStudents>(_onGetAllStudents);
    on<DeleteStudent>(_onDeleteStudent);
    on<UpdateStudent>(_onUpdateStudent);
    add(
      GetAllStudents(),
    );
    configListener();
  }

  Future<void> _onSaveButtonPressed(
      SaveButtonPressed event, Emitter<AdminHomeState> emit) async {
    final student = Student(
      studentId: '',
      studentName: event.studentName,
      studentAddress: event.studentAddress,
      studentMobile: event.studentMobile,
      studentDob: event.studentDob,
      studentGender: event.studentGender,
    );

    final response = await StudentRepository().createStudent(student);

    if (response.statusCode == 200) {
      add(
        GetAllStudents(),
      );
    }
  }

  Future<void> _onGetAllStudents(
      GetAllStudents event, Emitter<AdminHomeState> emit) async {
    final response = await StudentRepository().getAllStudents();

    if (response.statusCode == 200) {
      try {
        Map<String, dynamic> jsonData = jsonDecode(response.body);
        final List<dynamic> studentDataList = jsonData['data'];
        final List<Student> students = studentDataList
            .map(
              (data) => Student.fromJson(data),
            )
            .toList();
        emit(
          state.clone(
            entries: students,
          ),
        );
      } catch (e) {
        throw Exception('Failed to decode students');
      }
    } else {
      throw Exception('Failed to load students');
    }
  }

  Future<void> _onDeleteStudent(
      DeleteStudent event, Emitter<AdminHomeState> emit) async {
    final response = await StudentRepository().deleteStudent(event.id);

    if (response.statusCode == 200) {
      add(
        GetAllStudents(),
      );
    } else {
      throw Exception('Failed to delete student');
    }
  }

  Future<void> _onUpdateStudent(
      UpdateStudent event, Emitter<AdminHomeState> emit) async {
    final student = Student(
      studentId: event.studentId,
      studentName: event.studentName,
      studentAddress: event.studentAddress,
      studentMobile: event.studentMobile,
      studentDob: event.studentDob,
      studentGender: event.studentGender,
    );

    final response = await StudentRepository().updateStudent(student);

    if (response.statusCode == 200) {
      add(
        GetAllStudents(),
      );
    }
  }
}