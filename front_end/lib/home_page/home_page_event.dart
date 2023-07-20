import 'package:flutter/material.dart';

@immutable
abstract class HomeEvent {}

class IsVisible extends HomeEvent {
  IsVisible();
}
