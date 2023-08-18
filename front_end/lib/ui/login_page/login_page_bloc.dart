import 'dart:async';

import 'package:flutter_bloc/flutter_bloc.dart';

import 'login_page_event.dart';
import 'login_page_state.dart';

class LoginPageBloc extends Bloc<LoginPageEvent, LoginPageState> {
  LoginPageBloc() : super(LoginPageState.initialState) {
    on<SubmitLoginDetails>(_onSubmitLoginDetails);
  }

  FutureOr<void> _onSubmitLoginDetails(
      SubmitLoginDetails event, Emitter<LoginPageState> emit) {}
}
