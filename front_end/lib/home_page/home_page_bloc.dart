import 'dart:async';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ramp_up/home_page/home_page_event.dart';
import 'package:ramp_up/home_page/home_page_state.dart';

import '../util/studentDTO.dart';

class HomePageBloc extends Bloc<HomePageEvent, HomePageState> {
  HomePageBloc() : super(HomePageState.initialState) {
    on<IsVisible>(_isVisible);
    on<GetAllStudent>(_getAllStudent);
  }

  FutureOr<void> _isVisible(IsVisible event, Emitter<HomePageState> emit) {
    emit(state.clone(isVisible: !state.isVisible));
  }

  FutureOr<void> _getAllStudent(GetAllStudent event, Emitter<HomePageState> emit) {
    List<Student> dummyStudents = [
      Student(
        id: '1',
        name: 'John Doe',
        address: '123 Main St',
        mobileNumber: '555-1234',
        dob: '1995-01-01',
        gender: 'Male',
      ),
      Student(
        id: '2',
        name: 'Jane Smith',
        address: '456 Oak Ave',
        mobileNumber: '555-5678',
        dob: '1998-03-15',
        gender: 'Female',
      ),
      Student(
        id: '3',
        name: 'Michael Johnson',
        address: '789 Broadway',
        mobileNumber: '+1 555-9876',
        dob: '2000-02-10',
        gender: 'Male',
      ),
    ];

    emit(state.clone(students: dummyStudents));
  }
}
