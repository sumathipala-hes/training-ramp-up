import 'package:flutter/material.dart';

@immutable
abstract class UserHomePageEvent {}

class GetAllStudents extends UserHomePageEvent {
  GetAllStudents();
}

class LogOut extends UserHomePageEvent {
  LogOut();
}