import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:front_end/ui/home_page/home_page_provider.dart';
import 'package:front_end/ui/widget/student_card.dart';

void main() {
  testWidgets('RampUpHomeScreen displays correctly', (WidgetTester tester) async {
    // Build our widget and trigger a frame.
    await tester.pumpWidget(
      // const MaterialApp(
      //   home: RampUpHomeScreen(),
      // ),
      MaterialApp(
        home: Scaffold(
          body: RampUpHomeScreenProvider(),
        ),
      ),
    );

    // Verify that the title 'R A M P   U P' is displayed.
    expect(find.text('R A M P   U P'), findsOneWidget);

    // Verify that the '+ ADD NEW STUDENT' button is displayed.
    expect(find.text('+ ADD NEW STUDENT'), findsOneWidget);

    // Verify that the initial student card is displayed. You can add more specific
    // verification based on your test scenario and test data.
    expect(find.byType(StudentCard), findsOneWidget);

    // You can also simulate user interactions and test the UI accordingly.
    // For example, you can tap the '+ ADD NEW STUDENT' button and check if the
    // dialog is displayed.
    await tester.tap(find.text('+ ADD NEW STUDENT'));
    await tester.pumpAndSettle(); // Wait for the dialog to appear
    expect(find.text('PopupModel'), findsOneWidget);
  });
}
