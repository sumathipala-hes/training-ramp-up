import 'package:flutter/material.dart';

@immutable
abstract class RootEvent {}

class SaveStudentEvent extends RootEvent {
  final String name;
  final String address;
  final String mobile;
  final DateTime dob;
  final String gender;

  SaveStudentEvent({
    required this.name,
    required this.address,
    required this.mobile,
    required this.dob,
    required this.gender,
  });
}
