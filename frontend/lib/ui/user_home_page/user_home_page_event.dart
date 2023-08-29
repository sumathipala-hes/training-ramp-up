import 'package:frontend/model/user.dart';

abstract class UserHomePageEvent {}

class SaveUserEvent extends UserHomePageEvent {
  final User user;

  SaveUserEvent({
    required this.user,
  });
}

class GetAllUsers extends UserHomePageEvent {}

class UpdateUserEvent extends UserHomePageEvent {
  final User user;

  UpdateUserEvent({
    required this.user,
  });
}

class DeleteUserEvent extends UserHomePageEvent {
  final String email;

  DeleteUserEvent({
    required this.email,
  });
}

class SignOutEvent extends UserHomePageEvent {}
