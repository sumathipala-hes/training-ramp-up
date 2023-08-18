import 'dart:async';

import 'package:flutter_bloc/flutter_bloc.dart';

import 'sign_up_page_event.dart';
import 'sign_up_page_state.dart';

class SignUpPageBloc extends Bloc<SignUpPageEvent, SignUpPageState> {
  SignUpPageBloc() : super(SignUpPageState.initialState) {
    on<SelectGender>(_selectGender);
  }

  FutureOr<void> _selectGender(SelectGender event, Emitter<SignUpPageState> emit) {
    emit(state.clone(selectedGender: event.select));
  }
}
