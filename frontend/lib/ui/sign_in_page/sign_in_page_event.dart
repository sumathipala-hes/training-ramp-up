abstract class SignInPageEvent {}

class SignInEvent extends SignInPageEvent {
  final String email;
  final String password;

  SignInEvent({
    required this.email,
    required this.password,
  });
}
