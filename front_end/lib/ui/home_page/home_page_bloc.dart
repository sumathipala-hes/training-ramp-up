import 'dart:async';
import 'dart:convert';

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:fluttertoast/fluttertoast.dart';

import 'package:logger/logger.dart';

import '../../model/student_model.dart';
import '../../repository/student_repository.dart';
import 'home_page_event.dart';
import 'home_page_state.dart';

class HomePageBloc extends Bloc<HomePageEvent, HomePageState> {
  HomePageBloc(BuildContext context) : super(HomePageState.initialState) {
    on<GetAllStudent>(_getAllStudent);
    on<SaveStudent>(_saveStudent);
    on<UpdateStudent>(_updateStudent);
    on<DeleteStudent>(_deleteStudent);
    add(
      GetAllStudent(),
    );
    FirebaseMessaging.instance.getToken();
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
      GetAllStudent event, Emitter<HomePageState> emit) async {
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
      SaveStudent event, Emitter<HomePageState> emit) async {
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
    Emitter<HomePageState> emit,
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
      DeleteStudent event, Emitter<HomePageState> emit) async {
    await StudentRepository().deleteStudent(event.id);
    add(GetAllStudent());
  }
}
