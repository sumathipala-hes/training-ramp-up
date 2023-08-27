import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/repository/user_repository.dart';
import 'package:front_end/ui/user_home_page/user_home_page_event.dart';
import 'package:front_end/ui/user_home_page/user_home_page_state.dart';
import 'package:front_end/util/firebase_messaging.dart';
import 'package:front_end/models/student.dart';
import 'package:front_end/repository/student_repository.dart';

class UserHomeScreenBloc extends Bloc<UserHomePageEvent, UserHomeState> {
  UserHomeScreenBloc(BuildContext context) : super(UserHomeState.initialState) {
    on<GetAllStudents>(_onGetAllStudents);
    on<LogOut>(_onLogOut);
    add(
      GetAllStudents(),
    );
    configListener();
  }

  Future<void> _onGetAllStudents(
      GetAllStudents event, Emitter<UserHomeState> emit) async {
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

  FutureOr<void> _onLogOut(LogOut event, Emitter<UserHomeState> emit) async {
    await UserRepository().signOut();
  }
}
