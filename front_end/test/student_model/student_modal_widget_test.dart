import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ramp_up/ui/home_page/home_page_bloc.dart';
import 'package:ramp_up/ui/widget/student_modal.dart';

void main() {
  Widget createApp() {
    return MaterialApp(
      home: BlocProvider<HomePageBloc>(
        create: (context) => HomePageBloc(context),
        child: const PopupModal(),
      ),
    );
  }

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
