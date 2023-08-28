import 'dart:async';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/model/user.dart';
import 'package:frontend/repository/user_repository.dart';
import 'package:frontend/ui/register_page/register_page_event.dart';
import 'package:frontend/ui/register_page/register_page_state.dart';
import 'package:frontend/util/encrypt_decrypt_util.dart';

class RegisterPageBloc extends Bloc<RegisterPageEvent, RegisterPageState> {
  RegisterPageBloc()
      : super(
          RegisterPageState.initialState,
        ) {
    on<RegisterUserEvent>(_saveUser);
    on<SetValidations>(_setIsValidate);
  }

  final UserRepository userRepository = UserRepository();

  Future<FutureOr<void>> _saveUser(
    RegisterUserEvent event,
    Emitter<RegisterPageState> emit,
  ) async {
    final User user = User(
      name: event.user.name,
      email: event.user.email,
      password: encryptPassword(event.user.password),
      role: event.user.role,
    );
    await userRepository.addUsers(user);
  }

  void _setIsValidate(
    SetValidations event,
    Emitter<RegisterPageState> emit,
  ) {
    emit(
      state.clone(
        nameError: event.nameError,
        emailError: event.emailError,
        passwordError: event.passwordError,
      ),
    );
  }
}
