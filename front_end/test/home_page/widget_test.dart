import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:front_end/model/student_model.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_bloc.dart';
import 'package:front_end/ui/widget/card_details.dart';
import 'package:front_end/ui/widget/student_modal.dart';
import 'package:intl/intl.dart';

void main() {
  Widget createApp() {
    return MaterialApp(
      home: BlocProvider<HomePageBloc>(
        create: (context) => HomePageBloc(context),
        child: const PopupModal(),
      ),
    );
  }

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
          id: student.id!,
          studentName: student.name,
          studentDOB: student.dob,
        ),
      ),
    );

    expect(find.text(student.id!), findsOneWidget);
    expect(find.text(student.name), findsOneWidget);
    expect(
      find.text(DateFormat('EEE MMM d yyyy').format(student.dob)),
      findsOneWidget,
    );
  });

  testWidgets('Save button should be disabled with empty or invalid input',
      (WidgetTester tester) async {
    await tester.pumpWidget(createApp());

    await verifySaveButtonEnabled(tester, false);

    await enterTextIntoTextField(tester, 'Student Name', 'John Doe');
    await enterTextIntoTextField(tester, 'Student Address', '123 Main St');
    await enterTextIntoTextField(tester, 'Mobile No', '0712345678b');
    await selectDate(tester, DateTime.now());

    await verifySaveButtonEnabled(tester, false);
  });

  testWidgets('Save button should be enabled with valid input',
      (WidgetTester tester) async {
    await tester.pumpWidget(createApp());

    await verifySaveButtonEnabled(tester, false);

    await enterTextIntoTextField(tester, 'Student Name', 'John Doe');
    await enterTextIntoTextField(tester, 'Student Address', '123 Main St');
    await enterTextIntoTextField(tester, 'Mobile No', '0712345678');
    await selectDate(tester, DateTime.now());

    await verifySaveButtonEnabled(tester, true);
  });
}

Future<void> enterTextIntoTextField(
    WidgetTester tester, String labelText, String text) async {
  await tester.enterText(
    find.byWidgetPredicate((widget) =>
        widget is TextField && widget.decoration?.labelText == labelText),
    text,
  );
  await tester.pump();
}

Future<void> selectDate(WidgetTester tester, DateTime date) async {
  await tester.tap(find.byIcon(Icons.calendar_today));
  await tester.pumpAndSettle();

  await tester.tap(find.text(date.day.toString()));
  await tester.pumpAndSettle();

  await tester.tap(find.text('OK'));
  await tester.pumpAndSettle();
}

Future<void> verifySaveButtonEnabled(
    WidgetTester tester, bool isEnabled) async {
  final saveButtonFinder = find.widgetWithText(ElevatedButton, 'SAVE');
  expect(tester.widget<ElevatedButton>(saveButtonFinder).enabled, isEnabled);
}
