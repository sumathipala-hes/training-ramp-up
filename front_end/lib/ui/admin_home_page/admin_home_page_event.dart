import 'package:flutter/material.dart';

import '../../model/student_model.dart';
import '../../model/user_model.dart';

@immutable
abstract class AdminHomePageEvent {}

class GetAllStudent extends AdminHomePageEvent {
  GetAllStudent();
}

class SaveStudent extends AdminHomePageEvent {
  final Student student;

  SaveStudent({
    required this.student,
  });
}

class UpdateStudent extends AdminHomePageEvent {
  final Student student;

  UpdateStudent({
    required this.student,
  });
}

class DeleteStudent extends AdminHomePageEvent {
  final String id;

  DeleteStudent({
    required this.id,
  });
}

class GetAllUsers extends AdminHomePageEvent {
  GetAllUsers();
}

class SaveUser extends AdminHomePageEvent {
  final User user;

  SaveUser({
    required this.user,
  });
}

class UpdateUser extends AdminHomePageEvent {
  final User user;

  UpdateUser({
    required this.user,
  });
}

class DeleteUser extends AdminHomePageEvent {
  final String email;

  DeleteUser({
    required this.email,
  });
}

class SignOut extends AdminHomePageEvent {
  SignOut();
}