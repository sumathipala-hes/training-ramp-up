import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:frontend/model/student.dart';
import 'package:frontend/ui/student_page/student_page_provider.dart';
import 'package:frontend/ui/widget/student_card.dart';
import 'package:intl/intl.dart';

void main() {
  // Test data: Create a sample student for testing
  final Student testStudent = Student(
    id: '1',
    name: 'John Doe',
    dob: DateTime(1995, 10, 15),
    address: '',
    gender: '',
    mobile: '',
  );

  testWidgets('StudentCard displays correct student information',
      (WidgetTester tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: StudentCard(
          student: testStudent,
        ),
      ),
    );

    expect(find.text(testStudent.id), findsOneWidget);

    expect(find.text(testStudent.name), findsOneWidget);

    String formattedDob = DateFormat('EEE MMM d yyyy').format(testStudent.dob);
    expect(find.text(formattedDob), findsOneWidget);
  });

  testWidgets(
      'StudentCard navigates to StudentPageProvider when button is pressed',
      (WidgetTester tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: StudentCard(
          student: testStudent,
        ),
      ),
    );

    await tester.tap(find.byType(ElevatedButton));
    await tester.pumpAndSettle();

    expect(find.byType(StudentPageProvider), findsOneWidget);
  });
}
