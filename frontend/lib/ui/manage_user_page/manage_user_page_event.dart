abstract class ManageUserPageEvent {}

class SetRoleEvent extends ManageUserPageEvent {
  final String role;

  SetRoleEvent(this.role);
}
