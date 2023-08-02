import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:front_end/models/student.dart';
import 'package:front_end/ui/widget/student_card.dart';
import 'package:intl/intl.dart';

void main() {
  testWidgets('StudentCard displays correct content',
      (WidgetTester tester) async {
    Student student = Student(
      studentId: '1',
      studentName: 'Pahasara',
      studentAddress: 'Galle',
      studentMobile: '0717188524',
      studentDob: DateTime.now(),
      studentGender: 'Male',
    );

    await tester.pumpWidget(
      MaterialApp(
        home: StudentCard(
          student: student,
        ),
      ),
    );
    
    expect(
      find.text(student.studentId),
      findsOneWidget,
    );
    expect(
      find.text(student.studentName),
      findsOneWidget,
    );
    expect(
      find.text(
        DateFormat(
          'EEE MMM d yyyy',
        ).format(
          student.studentDob,
        ),
      ),
      findsOneWidget,
    );
  });
}
