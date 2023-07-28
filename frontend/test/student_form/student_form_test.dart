import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:frontend/model/student.dart';
import 'package:frontend/ui/widget/student_card.dart';
import 'package:intl/intl.dart';

void main() {
  testWidgets('StyledCard displays correct content',
      (WidgetTester tester) async {
    Student student = Student(
      id: '1',
      name: 'Dasun',
      address: 'Galle',
      mobile: '0765675468',
      dob: DateTime.now(),
      gender: 'Male',
    );

    await tester.pumpWidget(
      MaterialApp(
        home: StudentCard(
          student: student,
        ),
      ),
    );

    expect(
      find.text(student.id),
      findsOneWidget,
    );
    expect(
      find.text(student.name),
      findsOneWidget,
    );
    expect(
      find.text(
        DateFormat(
          'EEE MMM d yyyy',
        ).format(
          student.dob,
        ),
      ),
      findsOneWidget,
    );
  });
}
