import 'package:flutter/material.dart';

@immutable
abstract class HomePageEvent {}

class GetAllStudent extends HomePageEvent {
  GetAllStudent();
}

class SaveStudent extends HomePageEvent {
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
