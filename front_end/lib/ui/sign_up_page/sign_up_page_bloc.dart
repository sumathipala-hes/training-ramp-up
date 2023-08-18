import 'dart:async';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:logger/logger.dart';

import '../../model/user_model.dart';
import 'sign_up_page_event.dart';
import 'sign_up_page_state.dart';

class SignUpPageBloc extends Bloc<SignUpPageEvent, SignUpPageState> {
  SignUpPageBloc() : super(SignUpPageState.initialState) {
    on<SelectGender>(_selectGender);
    on<RegisterUser>(_registerUser);
  }

  FutureOr<void> _selectGender(
      SelectGender event, Emitter<SignUpPageState> emit) {
    emit(state.clone(selectedGender: event.select));
  }

  Future<FutureOr<void>> _registerUser(
      RegisterUser event, Emitter<SignUpPageState> emit) async {
    final user = User(
      roleType: "USER",
      name: event.nameText,
      address: event.addressText,
      email: event.emailText,
      mobileNumber: event.mobileNoText,
      dob: event.dateText,
      gender: event.selectedGender,
      password: event.passwordText,
    );
    // await UserRepository().saveUser(user);
  }
}
