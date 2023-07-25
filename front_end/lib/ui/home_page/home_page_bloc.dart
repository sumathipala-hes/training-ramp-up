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
        mobileNumber: '555-1234',
        dob: 'sat July 24 2003',
        gender: 'Male',
      ),
    );
    state.allStudents.add(
      Student(
        id: '2',
        name: 'Jane Smith',
        address: '456 Oak Ave',
        mobileNumber: '555-5678',
        dob: 'sat July 28 2004',
        gender: 'Female',
      ),
    );
    state.allStudents.add(
      Student(
        id: '3',
        name: 'Michael Johnson',
        address: '789 Broadway',
        mobileNumber: '+1 555-9876',
        dob: 'sat July 24 2005',
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

  Future<FutureOr<void>> _saveStudent(
      SaveStudent event, Emitter<HomePageState> emit) async {
    final student = Student(
      id: event.id,
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
