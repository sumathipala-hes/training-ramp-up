import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:frontend/ui/home_page/home_page_event.dart';
import 'package:frontend/ui/widget/student_form.dart';

import '../home_page/widget_test.dart';

void main() {
  testWidgets('StudentForm displays form fields and buttons',
      (WidgetTester tester) async {
    // Build the StudentForm widget
    await tester.pumpWidget(
      const MaterialApp(
        home: StudentForm(),
      ),
    );

    // Check if the form fields and buttons are displayed
    expect(find.text('Add New Student'), findsOneWidget);
    expect(find.byType(TextField),
        findsNWidgets(3)); // Name, Address, Mobile fields
    expect(find.text('Date of Birth'), findsOneWidget);
    expect(
        find.byType(Radio), findsNWidgets(2)); // Male and Female radio buttons
    expect(find.text('CANCEL'), findsOneWidget);
    expect(find.text('SAVE'), findsOneWidget);
  });

  // testWidgets('StudentForm saves student data on SAVE button tap',
  //     (WidgetTester tester) async {
  //   // Build the StudentForm widget with a mock HomePageBloc
  //   await tester.pumpWidget(
  //     const MaterialApp(
  //       home: StudentForm(),
  //     ),
  //   );

  //   // Enter some data in the form fields
  //   await tester.enterText(find.byType(TextField).first, 'John Doe');
  //   await tester.enterText(find.byType(TextField).at(1), '123, ABC Street');
  //   await tester.enterText(find.byType(TextField).last, '0745768944');

  //   // Tap the Date of Birth field to open the date picker
  //   await tester.tap(find.byType(TextField).at(2));
  //   await tester.pumpAndSettle();

  //   // Choose a date in the date picker and close it
  //   await tester.tap(find.text('OK'));
  //   await tester.pumpAndSettle();

  //   // Tap the Male radio button to select it
  //   await tester.tap(find.text('Male'));
  //   await tester.pumpAndSettle();

  //   // Tap the SAVE button
  //   await tester.tap(find.text('SAVE'));
  //   await tester.pumpAndSettle();

  //   // Check if the HomePageBloc received the SaveStudentEvent with the correct data
  //   // Replace 'MockHomePageBloc' with the actual type of your HomePageBloc
  //   expect(
  //       MockHomePageBloc.receivedEvents,
  //       contains(SaveStudentEvent(
  //         name: 'John Doe',
  //         address: '123, ABC Street',
  //         mobile: '0745768944', dob: DateTime.now(), gender: '',
  //         // Add the expected date and gender values here
  //       )));
  // });
}
