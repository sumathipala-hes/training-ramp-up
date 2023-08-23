import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/model/user.dart';
import 'package:frontend/repository/user_repository.dart';
import 'package:frontend/ui/user_home_page/user_home_page_event.dart';
import 'package:frontend/ui/user_home_page/user_home_page_state.dart';
import 'package:encrypt/encrypt.dart' as encrypt;
import 'package:frontend/util/encrypt_decrypt_util.dart';

class UserHomePageBloc extends Bloc<UserHomePageEvent, UserHomePageState> {
  UserHomePageBloc(BuildContext context)
      : super(UserHomePageState.initialState) {
    on<SaveUserEvent>(_saveUser);
    on<GetAllUsers>(_getAllUsers);
    on<UpdateUserEvent>(_updateUser);
    on<DeleteUserEvent>(_deleteUser);
    add(GetAllUsers());
  }

  UserRepository userRepository = UserRepository();

  Future<FutureOr<void>> _saveUser(
    SaveUserEvent event,
    Emitter<UserHomePageState> emit,
  ) async {
    final plainText = event.user.password;
    final key = encrypt.Key.fromUtf8('my 32 length key................');
    final iv = encrypt.IV.fromLength(16);

    final encrypter = encrypt.Encrypter(encrypt.AES(key));

    final encrypted = encrypter.encrypt(plainText, iv: iv);
    final decrypted = encrypter.decrypt(encrypted, iv: iv);

    print(decrypted);
    print(encrypted.base64);
    final User user = User(
      name: event.user.name,
      email: event.user.email,
      password: encrypted.base64,
      role: event.user.role,
    );
    userRepository.addUsers(user);
    add(GetAllUsers());
  }

  Future<FutureOr<void>> _getAllUsers(
    GetAllUsers event,
    Emitter<UserHomePageState> emit,
  ) async {
    emit(state.clone(
      users: await userRepository.fetchUsers(),
    ));
  }

  Future<FutureOr<void>> _updateUser(
    UpdateUserEvent event,
    Emitter<UserHomePageState> emit,
  ) async {
    final plainText = event.user.password;
    final key = encrypt.Key.fromUtf8('my 32 length key................');
    final iv = encrypt.IV.fromLength(16);

    final encrypter = encrypt.Encrypter(encrypt.AES(key));

    final encrypted = encrypter.encrypt(plainText, iv: iv);
    final decrypted = encrypter.decrypt(encrypted, iv: iv);

    print(decrypted);
    print(encrypted.base64);
    final User user = User(
      name: event.user.name,
      email: event.user.email,
      password: encryptPassword(event.user.password),
      role: event.user.role,
    );
    print(decryptPassword(user.password));
    userRepository.updateUsers(user);
    add(GetAllUsers());
  }

  Future<FutureOr<void>> _deleteUser(
    DeleteUserEvent event,
    Emitter<UserHomePageState> emit,
  ) async {
    userRepository.deleteUsers(
      event.email,
    );
    add(GetAllUsers());
  }
}
