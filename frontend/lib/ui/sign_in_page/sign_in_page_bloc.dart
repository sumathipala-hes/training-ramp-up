import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/repository/user_repository.dart';
import 'package:frontend/ui/sign_in_page/sign_in_page_event.dart';
import 'package:frontend/ui/sign_in_page/sign_in_page_state.dart';

class SignInPageBloc extends Bloc<SignInPageEvent, SignInPageState> {
  SignInPageBloc(BuildContext context)
      : super(
          SignInPageState.initialState,
        ) {
    on<SignInEvent>(_singIn);
  }

  UserRepository userRepository = UserRepository();

  Future<FutureOr<void>> _singIn(
    SignInEvent event,
    Emitter<SignInPageState> emit,
  ) async {
    userRepository.signIn(
      event.email,
      event.password,
    );
    emit(state.clone(
      isAuthenticate: true,
    ));
  }
}
