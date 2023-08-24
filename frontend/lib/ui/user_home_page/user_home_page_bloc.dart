import 'dart:async';

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/model/user.dart';
import 'package:frontend/repository/user_repository.dart';
import 'package:frontend/ui/user_home_page/user_home_page_event.dart';
import 'package:frontend/ui/user_home_page/user_home_page_state.dart';
import 'package:frontend/util/encrypt_decrypt_util.dart';
import 'package:frontend/util/show_toast.dart';
import 'package:logger/logger.dart';

class UserHomePageBloc extends Bloc<UserHomePageEvent, UserHomePageState> {
  UserHomePageBloc(BuildContext context)
      : super(UserHomePageState.initialState) {
    on<SaveUserEvent>(_saveUser);
    on<GetAllUsers>(_getAllUsers);
    on<UpdateUserEvent>(_updateUser);
    on<DeleteUserEvent>(_deleteUser);
    on<SignOutEvent>(_signOut);
    add(GetAllUsers());
    FirebaseMessaging.instance.getToken();
    _configListener();
  }

  UserRepository userRepository = UserRepository();

  Future<FutureOr<void>> _saveUser(
    SaveUserEvent event,
    Emitter<UserHomePageState> emit,
  ) async {
    final User user = User(
      name: event.user.name,
      email: event.user.email,
      password: encryptPassword(event.user.password),
      role: event.user.role,
    );
    await userRepository.addUsers(user);
    add(GetAllUsers());
  }

  Future<FutureOr<void>> _getAllUsers(
    GetAllUsers event,
    Emitter<UserHomePageState> emit,
  ) async {
    final users = await userRepository.fetchUsers();
    emit(
      state.clone(
        users: users,
      ),
    );
  }

  Future<FutureOr<void>> _updateUser(
    UpdateUserEvent event,
    Emitter<UserHomePageState> emit,
  ) async {
    final User user = User(
      name: event.user.name,
      email: event.user.email,
      password: encryptPassword(event.user.password),
      role: event.user.role,
    );
    await userRepository.updateUsers(user);
    add(GetAllUsers());
  }

  Future<FutureOr<void>> _deleteUser(
    DeleteUserEvent event,
    Emitter<UserHomePageState> emit,
  ) async {
    await userRepository.deleteUsers(
      event.email,
    );
    add(GetAllUsers());
  }

  Future<FutureOr<void>> _signOut(
    SignOutEvent event,
    Emitter<UserHomePageState> emit,
  ) async {
    userRepository.signOut();
  }

  void _configListener() {
    FirebaseMessaging.instance.getToken();

    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      Logger().d('Got a message whilst in the foreground!');
      Logger().d('Message data: ${message.data}');

      if (message.notification != null) {
        Logger().d(
            'Message also contained a notification: ${message.notification?.title}');

        Logger().d(
            'Message also contained a notification: ${message.notification?.body}');
        showToast(message.notification!.body!);
      }
    });
  }
}
