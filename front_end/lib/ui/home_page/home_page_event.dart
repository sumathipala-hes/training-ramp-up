import 'package:flutter/material.dart';

@immutable
abstract class RampUpHomePageEvent{}
  class SaveButtonPressed extends RampUpHomePageEvent{
    final String studentId;
    final String studentName;
    final String studentAddress;
    final String studentMobile;
    final String studentDob;
    final String studentGender;

    SaveButtonPressed({
      required this.studentId,
      required this.studentName,
      required this.studentAddress,
      required this.studentMobile,
      required this.studentDob,
      required this.studentGender,
    });
  }
