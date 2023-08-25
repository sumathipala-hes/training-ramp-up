import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/models/user.dart';
import 'package:front_end/repository/user_repository.dart';
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

    on<RegisterUser>(_onRegisterUser);
    on<GetAllUsers>(_onGetAllUsers);
    on<DeleteUser>(_onDeleteUser);
    on<UpdateUser>(_onUpdateUser);
    on<LogOut>(_onLogOut);
    add(
      GetAllUsers(),
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

  FutureOr<void> _onRegisterUser(
      RegisterUser event, Emitter<AdminHomeState> emit) async {
    final user = User(
      userName: event.user.userName,
      userEmail: event.user.userEmail,
      userPassword: event.user.userPassword,
      role: event.user.role,
    );
    await UserRepository().registerUser(user);
    add(
      GetAllUsers(),
    );
  }

  FutureOr<void> _onGetAllUsers(
      GetAllUsers event, Emitter<AdminHomeState> emit) async {
    final response = await UserRepository().retrieveAllUsers();

    if (response.statusCode == 200) {
      try {
        Map<String, dynamic> jsonData = jsonDecode(response.body);
        final List<dynamic> userDataList = jsonData['data'];
        final List<User> users = userDataList
            .map(
              (data) => User.fromJson(data),
            )
            .toList();
        emit(
          state.clone(
            userEntries: users,
          ),
        );
      } catch (e) {
        throw Exception('Failed to decode users');
      }
    } else {
      throw Exception('Failed to load users');
    }
  }

  FutureOr<void> _onDeleteUser(
      DeleteUser event, Emitter<AdminHomeState> emit) async {
    await UserRepository().deleteUser(event.email);
    add(
      GetAllUsers(),
    );
  }

  FutureOr<void> _onUpdateUser(
      UpdateUser event, Emitter<AdminHomeState> emit) async {
    final User user = User(
      userName: event.user.userName,
      userEmail: event.user.userEmail,
      userPassword: event.user.userPassword,
      role: event.user.role,
    );
    await UserRepository().updateUser(user);
    add(
      GetAllUsers(),
    );
  }

  FutureOr<void> _onLogOut(LogOut event, Emitter<AdminHomeState> emit) async {
    await UserRepository().signOut();
  }
}
