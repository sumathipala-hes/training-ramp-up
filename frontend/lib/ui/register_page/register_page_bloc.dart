import 'dart:async';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/model/user.dart';
import 'package:frontend/repository/user_repository.dart';
import 'package:frontend/ui/register_page/register_page_event.dart';
import 'package:frontend/ui/register_page/register_page_state.dart';
import 'package:frontend/util/encrypt_decrypt_util.dart';

class RegisterPageBloc extends Bloc<RegisterPageEvent, RegisterPageState> {
  RegisterPageBloc() : super(const RegisterPageState()) {
    on<RegisterUserEvent>(_saveUser);
  }

  final UserRepository userRepository = UserRepository();

  Future<FutureOr<void>> _saveUser(
    RegisterUserEvent event,
    Emitter<RegisterPageState> emit,
  ) async {
    final User user = User(
      name: event.user.name,
      email: event.user.email,
      password: await encryptPassword(event.user.password),
      role: event.user.role,
    );
    await userRepository.addUsers(user);
  }
}
