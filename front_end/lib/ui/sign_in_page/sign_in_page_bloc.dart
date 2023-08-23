import 'dart:async';

import 'package:flutter_bloc/flutter_bloc.dart';

import 'sign_in_page_event.dart';
import 'sign_in_page_state.dart';

class SignInPageBloc extends Bloc<SignInPageEvent, SignInPageState> {
  SignInPageBloc() : super(SignInPageState.initialState) {
    on<SubmitLoginDetails>(_onSubmitLoginDetails);
  }

  FutureOr<void> _onSubmitLoginDetails(
      SubmitLoginDetails event, Emitter<SignInPageState> emit) {}
}
