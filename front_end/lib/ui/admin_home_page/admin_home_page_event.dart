import 'package:flutter/material.dart';

@immutable
abstract class AdminHomePageEvent {}

class GetAllStudent extends AdminHomePageEvent {
  GetAllStudent();
}

class SaveStudent extends AdminHomePageEvent {
  final String id;
  final String name;
  final String address;
  final String mobileNo;
  final DateTime date;
  final String gender;

  SaveStudent({
    required this.id,
    required this.name,
    required this.address,
    required this.mobileNo,
    required this.date,
    required this.gender,
  });
}

class UpdateStudent extends AdminHomePageEvent {
  final String id;
  final String name;
  final String address;
  final String mobileNo;
  final DateTime date;
  final String gender;

  UpdateStudent({
    required this.id,
    required this.name,
    required this.address,
    required this.mobileNo,
    required this.date,
    required this.gender,
  });
}

class DeleteStudent extends AdminHomePageEvent {
  final String id;

  DeleteStudent({
    required this.id,
  });
}
