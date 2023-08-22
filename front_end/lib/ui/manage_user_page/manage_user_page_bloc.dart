import 'dart:async';

import 'package:flutter_bloc/flutter_bloc.dart';

import 'manage_user_page_event.dart';
import 'manage_user_page_state.dart';

class UserManageBloc extends Bloc<UserManageEvent, UserManageState> {
  UserManageBloc() : super(UserManageState.initialState) {
    on<SelectGender>(_selectGender);
    on<SelectRole>(_selectRole);
  }

  Future<void> _selectGender(
      SelectGender event, Emitter<UserManageState> emit) async {
    emit(state.clone(selectedGender: event.select));
  }

  Future<void> _selectRole(
      SelectRole event, Emitter<UserManageState> emit) async {
    emit(state.clone(userType: event.select));
  }
}
