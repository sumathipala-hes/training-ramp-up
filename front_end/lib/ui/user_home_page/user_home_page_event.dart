import 'package:flutter/material.dart';

@immutable
abstract class UserHomePageEvent {}

class GetAllStudent extends UserHomePageEvent {
  GetAllStudent();
}

class GetStudentByOne extends UserHomePageEvent {
  final String search;

  GetStudentByOne(this.search);
}
