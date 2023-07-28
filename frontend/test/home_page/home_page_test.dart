import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
// import 'package:frontend/data/dummy_data.dart';
// import 'package:frontend/model/student.dart';
import 'package:frontend/ui/home_page/home_page_provider.dart';

void main() {
  testWidgets('StyledCard displays correct content',
      (WidgetTester tester) async {
    // List<Student> students = dummyData;

    await tester.pumpWidget(
      const MaterialApp(
        home: HomePageProvider(),
      ),
    );

    // expect(
    //   find.text(students[0].id),
    //   findsOneWidget,
    // );
    // expect(
    //   find.text(students[0].name),
    //   findsOneWidget,
    // );
  });
}
