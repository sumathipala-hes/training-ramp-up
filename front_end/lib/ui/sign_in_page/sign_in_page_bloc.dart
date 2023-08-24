import 'dart:async';

import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../repository/user_repository.dart';
import 'sign_in_page_event.dart';
import 'sign_in_page_state.dart';

class SignInPageBloc extends Bloc<SignInPageEvent, SignInPageState> {
  SignInPageBloc(BuildContext context) : super(SignInPageState.initialState) {
    on<SubmitLoginDetails>(_onSubmitLoginDetails);
  }

  Future<void> _onSubmitLoginDetails(
      SubmitLoginDetails event, Emitter<SignInPageState> emit) async {
    UserRepository().signIn(event.email, event.password);
    emit(state.clone(isAuthenticate: true));
  }
}
