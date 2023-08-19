import 'package:flutter/material.dart';

@immutable
abstract class UserHomePageEvent {}

class GetAllStudent extends UserHomePageEvent {
  GetAllStudent();
}
