import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ramp_up/ui/home_page/home_page_event.dart';
import 'package:ramp_up/ui/home_page/home_page_state.dart';

import '../../model/student_model.dart';

class HomePageBloc extends Bloc<HomePageEvent, HomePageState> {
  HomePageBloc(BuildContext context) : super(HomePageState.initialState) {
    on<GetAllStudent>(_getAllStudent);
    on<SaveStudent>(_saveStudent);
    on<UpdateStudent>(_updateStudent);
    add(GetAllStudent());
  }

  Future<FutureOr<void>> _getAllStudent(
      GetAllStudent event, Emitter<HomePageState> emit) async {
    addDummyData();
    emit(
      state.clone(
        allStudents: await _getAllEvent(),
      ),
    );
  }

  void addDummyData() {
    state.allStudents.clear();
    state.allStudents.add(
      Student(
        id: '1',
        name: 'John Doe',
        address: '123 Main St',
        mobileNumber: '0771234567',
        dob: DateTime(2005 - 07 - 24),
        gender: 'Male',
      ),
    );
    state.allStudents.add(
      Student(
        id: '2',
        name: 'Jane Smith',
        address: '456 Oak Ave',
        mobileNumber: '0725555678',
        dob: DateTime(2005 - 07 - 24),
        gender: 'Female',
      ),
    );
    state.allStudents.add(
      Student(
        id: '3',
        name: 'Michael Johnson',
        address: '789 Broadway',
        mobileNumber: '0755559876',
        dob: DateTime(2005 - 07 - 24),
        gender: 'Male',
      ),
    );
  }

  Future<List<Student>> _getAllEvent() async {
    List<Student> getAll = state.allStudents.toList();
    return getAll
        .map(
          (e) => Student(
            id: e.id,
            name: e.name,
            address: e.address,
            mobileNumber: e.mobileNumber,
            dob: e.dob,
            gender: e.gender,
          ),
        )
        .toList();
  }

  Future<void> _saveStudent(
      SaveStudent event, Emitter<HomePageState> emit) async {
    final student = Student(
      id: (state.allStudents.length + 1).toString(),
      name: event.name,
      address: event.address,
      mobileNumber: event.mobileNo,
      dob: event.date,
      gender: event.gender,
    );
    emit(state.clone(allStudents: [...state.allStudents, student]));
    emit(state.clone(allStudents: await _getAllEvent()));
  }
}

 Future<void> _updateStudent(
    UpdateStudent event,
    Emitter<HomePageState> emit,
  ) async {
    List<Student> updatedStudents = state.allStudents.map((student) {
      return student.id == event.id
          ? Student(
              name: event.name,
              address: event.address,
              mobileNumber: event.mobileNo,
              dob: event.date,
              gender: event.gender,
              id: student.id,
            )
          : student;
    }).toList();

    emit(state.clone(allStudents: updatedStudents));
  }