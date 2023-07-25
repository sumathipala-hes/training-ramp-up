import 'package:flutter/material.dart';

@immutable
abstract class HomePageEvent {}

class GetAllStudent extends HomePageEvent {
  GetAllStudent();
}
