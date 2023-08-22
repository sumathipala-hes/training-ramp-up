class SignInPageState {
  final String email;
  final String password;

  SignInPageState({
    required this.email,
    required this.password,
  });

  static SignInPageState get initialState => SignInPageState(
        email: '',
        password: '',
      );

  SignInPageState clone({
    String? email,
    String? password,
  }) {
    return SignInPageState(
      email: email ?? this.email,
      password: password ?? this.password,
    );
  }
}
