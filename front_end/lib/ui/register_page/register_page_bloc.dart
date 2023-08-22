import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/register_page/register_page_event.dart';
import 'package:front_end/ui/register_page/register_page_state.dart';

class RegisterScreenBloc
    extends Bloc<RegisterScreenEvent, RegisterScreenState> {
  RegisterScreenBloc(BuildContext context)
      : super(RegisterScreenState.initialState) {
    on<SelectGender>(_onSelectGender);
  }

  Future<void> _onSelectGender(
      SelectGender event, Emitter<RegisterScreenState> emit) async {
    emit(
      state.clone(
        gender: event.gender,
      )
    );
  }
}
