import 'dart:async';

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:frontend/ui/home_page/home_page_event.dart';
import 'package:frontend/ui/home_page/home_page_state.dart';
import 'package:frontend/util/show_toast.dart';
import 'package:logger/logger.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomePageBloc extends Bloc<HomePageEvent, HomePageState> {
  HomePageBloc() : super(HomePageState.initialState) {
    FirebaseMessaging.instance.getToken();
    _configListener();
    on<HomePageEventInitial>(_setRole);
    add(HomePageEventInitial());
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

  Future<FutureOr<void>> _setRole(
    HomePageEventInitial event,
    Emitter<HomePageState> emit,
  ) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    emit(
      state.clone(
        role: prefs.getString('role'),
      ),
    );
  }
}
