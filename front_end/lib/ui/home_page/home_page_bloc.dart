import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:logger/logger.dart';
import 'package:ramp_up/ui/home_page/home_page_event.dart';
import 'package:ramp_up/ui/home_page/home_page_state.dart';

import '../../model/student_model.dart';
import '../../repository/student.repository.dart';

class HomePageBloc extends Bloc<HomePageEvent, HomePageState> {
  HomePageBloc(BuildContext context) : super(HomePageState.initialState) {
    on<GetAllStudent>(_getAllStudent);
    on<SaveStudent>(_saveStudent);
    on<UpdateStudent>(_updateStudent);
    on<DeleteStudent>(_deleteStudent);
    add(
      GetAllStudent(),
    );
  }

  Future<void> _getAllStudent(
      GetAllStudent event, Emitter<HomePageState> emit) async {
    emit(
      state.clone(
        allStudents: await _getAllEvent(),
      ),
    );
  }

  Future<List<Student>> _getAllEvent() async {
    final response = await StudentRepository().getAllStudents();
    if (response.statusCode == 200) {
      Map<String, dynamic> responseData = jsonDecode(response.body);

      if (responseData.containsKey('data')) {
        List<dynamic> studentDataList = responseData['data'];
        return studentDataList
            .map((studentData) => Student.fromJson(studentData))
            .toList();
      } else {
        Logger().e('Response does not contain "data" key');
      }
    } else {
      Logger().e('Failed to load students: ${response.statusCode}');
    }
    return [];
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
