import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:frontend/model/student.dart';
import 'package:frontend/ui/student_home_page/student_home_page_bloc.dart';
import 'package:frontend/ui/widget/student_card.dart';
import 'package:frontend/ui/widget/student_form.dart';
import 'package:intl/intl.dart';

void main() {
  // Student Card Widget Test
  testWidgets('StudentCard displays correct content',
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

  // Student Form Widget Test
  Widget createApp() {
    return MaterialApp(
      home: BlocProvider<StudentHomePageBloc>(
        create: (context) => StudentHomePageBloc(context),
        child: const StudentForm(),
      ),
    );
  }

  testWidgets('StudentForm displays correct content',
      (WidgetTester tester) async {
    final saveButton = find.widgetWithText(ElevatedButton, 'SAVE');
    final cancelButton = find.widgetWithText(ElevatedButton, 'CANCEL');

    await tester.pumpWidget(
      createApp(),
    );

    expect(
      saveButton,
      findsOneWidget,
    );

    expect(
      cancelButton,
      findsOneWidget,
    );
  });
}
