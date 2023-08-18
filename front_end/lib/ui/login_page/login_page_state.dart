class LoginPageState {
  final String email;
  final String password;

  LoginPageState({
    required this.email,
    required this.password,
  });

  static LoginPageState get initialState => LoginPageState(
        email: '',
        password: '',
      );

  LoginPageState clone({
    String? email,
    String? password,
  }) {
    return LoginPageState(
      email: email ?? this.email,
      password: password ?? this.password,
    );
  }
}
