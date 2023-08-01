import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:intl/intl.dart';
import 'package:ramp_up/model/student_model.dart';
import 'package:ramp_up/ui/widget/card_details.dart';

void main() {
  testWidgets('StudentCard displays correct content',
      (WidgetTester tester) async {
    Student student = Student(
      id: '1',
      name: 'Dasun',
      address: 'Galle',
      mobileNumber: '0765675468',
      dob: DateTime.now(),
      gender: 'Male',
    );

    await tester.pumpWidget(
      MaterialApp(
        home: StudentCard(
          id: student.id,
          studentName: student.name,
          studentDOB: student.dob,
        ),
      ),
    );

    expect(find.text(student.id), findsOneWidget);
    expect(find.text(student.name), findsOneWidget);
    expect(
      find.text(DateFormat('EEE MMM d yyyy').format(student.dob)),
      findsOneWidget,
    );
  });
}
