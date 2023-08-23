import 'package:flutter/material.dart';

@immutable
class SignInPageState {
  final bool isAuthenticate;

  const SignInPageState({
    required this.isAuthenticate,
  });

  static SignInPageState get initialState => const SignInPageState(
        isAuthenticate: false,
      );

  SignInPageState clone({
    bool? isAuthenticate,
  }) {
    return SignInPageState(
      isAuthenticate: isAuthenticate ?? this.isAuthenticate,
    );
  }
}
