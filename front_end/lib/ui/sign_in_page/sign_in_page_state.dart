class SignInPageState {
  final bool isAuthenticate;

  SignInPageState({
    required this.isAuthenticate,
  });

  static SignInPageState get initialState => SignInPageState(
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
