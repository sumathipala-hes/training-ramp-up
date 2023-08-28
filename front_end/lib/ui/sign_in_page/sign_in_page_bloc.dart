import 'dart:async';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/repository/user_repository.dart';

import 'sign_in_page_event.dart';
import 'sign_in_page_state.dart';

class SignInPageScreenBloc extends Bloc<SignInPageEvent, SignInPageState> {
  SignInPageScreenBloc() : super(SignInPageState.initialState) {
    on<Login>(_onLogin);
  }

  FutureOr<void> _onLogin(Login event, Emitter<SignInPageState> emit) async {
    await UserRepository().signIn(
      event.userEmail,
      event.userPassword,
    );
    emit(
      state.clone(
        isAuthenticate: true,
      ),
    );
  }
}
