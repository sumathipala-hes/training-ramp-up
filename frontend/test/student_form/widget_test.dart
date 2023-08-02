import 'package:flutter/material.dart';

import 'package:flutter_bloc/flutter_bloc.dart';

import 'package:flutter_test/flutter_test.dart';
import 'package:frontend/ui/home_page/home_page_bloc.dart';
import 'package:frontend/ui/widget/student_form.dart';

void main() {
  Widget createApp() {
    return MaterialApp(
      home: BlocProvider<HomePageBloc>(
        create: (context) => HomePageBloc(context),
        child: const StudentForm(),
      ),
    );
  }

  testWidgets('Save button should be disabled when error labels are shown',
      (WidgetTester tester) async {
    await tester.pumpWidget(
      createApp(),
    );

    await verifySaveButtonEnabled(
      tester,
      'Invalid Mobile Ex. 0745768944',
    );
  });

  testWidgets('Save button should be enabled when error labels are not shown',
      (WidgetTester tester) async {
    await tester.pumpWidget(
      createApp(),
    );

    await verifySaveButtonDisabled(
      tester,
      '',
    );
  });
}

Future<void> verifySaveButtonEnabled(
    WidgetTester tester, String errorLabel) async {
  final saveButtonFinder = find.widgetWithText(ElevatedButton, 'SAVE');

  expect(
    tester.widget<ElevatedButton>(saveButtonFinder).enabled,
    errorLabel == '',
  );
}

Future<void> verifySaveButtonDisabled(
    WidgetTester tester, String errorLabel) async {
  final saveButtonFinder = find.widgetWithText(ElevatedButton, 'SAVE');

  expect(
    tester.widget<ElevatedButton>(saveButtonFinder).enabled,
    errorLabel != '',
  );
}
