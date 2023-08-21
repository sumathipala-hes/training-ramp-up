import 'dart:async';
import 'dart:convert';

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:front_end/model/user_model.dart';

import 'package:logger/logger.dart';

import '../../model/student_model.dart';
import '../../repository/student_repository.dart';
import '../../repository/user_repository.dart';
import 'admin_home_page_event.dart';
import 'admin_home_page_state.dart';

class AdminHomePageBloc extends Bloc<AdminHomePageEvent, AdminHomePageState> {
  AdminHomePageBloc(BuildContext context)
      : super(AdminHomePageState.initialState) {
    on<GetAllStudent>(_getAllStudent);
    on<SaveStudent>(_saveStudent);
    on<UpdateStudent>(_updateStudent);
    on<DeleteStudent>(_deleteStudent);

    on<GetAllUsers>(_getAllUsers);
    on<SaveUser>(_saveUser);
    on<UpdateUser>(_updateUser);
    on<DeleteUser>(_deleteUser);
    add(
      GetAllStudent(),
    );

    add(
      GetAllUsers(),
    );

    final token = FirebaseMessaging.instance.getToken();
    Logger().d('Token: $token');

    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      Logger().d('Got a message whilst in the foreground!');

      Logger().d('Message data: ${message.data}');

      if (message.notification != null) {
        Logger().d(
            'Message also contained a notification: ${message.notification?.title}');

        Logger().d(
            'Message also contained a notification: ${message.notification?.body}');

        Fluttertoast.showToast(
          msg: message.notification?.body ?? "",
          toastLength: Toast.LENGTH_LONG,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Colors.green,
          textColor: Colors.white,
          timeInSecForIosWeb: 1,
          fontSize: 16.0,
        );
      }
    });
  }

  Future<void> _getAllStudent(
      GetAllStudent event, Emitter<AdminHomePageState> emit) async {
    try {
      final response = await StudentRepository().getAllStudents();

      if (response.statusCode == 200) {
        Map<String, dynamic> responseData = jsonDecode(response.body);

        if (responseData.containsKey('data')) {
          List<dynamic> studentDataList = responseData['data'];

          List<Student> studentList = [
            ...studentDataList
                .map((studentData) => Student.fromJson(studentData)),
          ];

          emit(
            state.clone(
              allStudents: studentList,
            ),
          );
        } else {
          Logger().e('Response does not contain "data" key');
        }
      } else {
        Logger().e('Failed to load students: ${response.statusCode}');
      }
    } catch (e) {
      Logger().e('Error fetching students: $e');
    }
  }

  Future<void> _saveStudent(
      SaveStudent event, Emitter<AdminHomePageState> emit) async {
    final student = Student(
      id: '',
      name: event.name,
      address: event.address,
      mobileNumber: event.mobileNo,
      dob: event.date,
      gender: event.gender,
    );
    await StudentRepository().saveStudent(student);
    add(GetAllStudent());
  }

  Future<void> _updateStudent(
    UpdateStudent event,
    Emitter<AdminHomePageState> emit,
  ) async {
    final student = Student(
      id: event.id,
      name: event.name,
      address: event.address,
      mobileNumber: event.mobileNo,
      dob: event.date,
      gender: event.gender,
    );
    await StudentRepository().updateStudent(student);
    add(GetAllStudent());
  }

  Future<void> _deleteStudent(
      DeleteStudent event, Emitter<AdminHomePageState> emit) async {
    await StudentRepository().deleteStudent(event.id);
    add(GetAllStudent());
  }

  Future<void> _getAllUsers(
      GetAllUsers event, Emitter<AdminHomePageState> emit) async {
    try {
      final response = await UserRepository().getAllUsers();

      if (response.statusCode == 200) {
        Map<String, dynamic> responseData = jsonDecode(response.body);

        if (responseData.containsKey('data')) {
          List<dynamic> userDataList = responseData['data'];

          List<User> userList = [
            ...userDataList.map((userData) => User.fromJson(userData)),
          ];

          emit(
            state.clone(
              allUsers: userList,
            ),
          );
        } else {
          Logger().e('Response does not contain "data" key');
        }
      } else {
        Logger().e('Failed to load users: ${response.statusCode}');
      }
    } catch (e) {
      Logger().e('Error fetching users: $e');
    }
  }

  FutureOr<void> _saveUser(SaveUser event, Emitter<AdminHomePageState> emit) {}

  FutureOr<void> _updateUser(
      UpdateUser event, Emitter<AdminHomePageState> emit) {}

  FutureOr<void> _deleteUser(
      DeleteUser event, Emitter<AdminHomePageState> emit) {}
}
