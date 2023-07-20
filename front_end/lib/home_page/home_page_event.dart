import 'package:flutter/material.dart';

@immutable
abstract class HomePageEvent {}

class IsVisible extends HomePageEvent {
  IsVisible();
}

class GetAllStudent extends HomePageEvent {
  GetAllStudent();
}
