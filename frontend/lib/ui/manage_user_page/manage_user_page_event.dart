abstract class ManageUserPageEvent {}

class SetRoleEvent extends ManageUserPageEvent {
  final String role;

  SetRoleEvent({
    required this.role,
  });
}

class SetValidations extends ManageUserPageEvent {
  final String nameError;
  final String emailError;
  final String passwordError;

  SetValidations({
    required this.nameError,
    required this.emailError,
    required this.passwordError,
  });
}
