import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:front_end/models/student.dart';
import 'package:front_end/ui/home_page/home_page_bloc.dart';
import 'package:front_end/ui/widget/student_card.dart';
import 'package:front_end/ui/widget/student_manage_form.dart';
import 'package:intl/intl.dart';

void main() {
  testWidgets(
    'StudentCard displays correct content',
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
    },
  );

  testWidgets(
    'PopupModel saves data and closes when all fields are filled',
    (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: BlocProvider<RampUpHomeScreenBloc>(
            create: (context) => RampUpHomeScreenBloc(context),
            child: const PopupModel(),
          ),
        ),
      );

      // Enter text in all the input fields
      await tester.enterText(find.byType(TextField).at(0), "Pahasara");
      await tester.enterText(find.byType(TextField).at(1), "Galle,Sri Lanka");
      await tester.enterText(find.byType(TextField).at(2), "0718599625");

      // Tap on the date input to trigger date picker
      await tester.tap(
        find.byType(TextFormField),
      );
      await tester.pumpAndSettle();

      // Pick a date from the date picker
      // final dateToPick = DateTime(1995, 1, 1);
      await tester.tap(
        find.text("1").hitTestable(),
      );
      await tester.pumpAndSettle();
      await tester.tap(
        find.text("OK").hitTestable(),
      );
      await tester.pumpAndSettle();

      // Select gender
      await tester.tap(
        find.text("Female"),
      );
      await tester.pumpAndSettle();

      // Tap the Save button
      await tester.tap(
        find.widgetWithText(ElevatedButton, "Save"),
      );
      await tester.pumpAndSettle();

      // Expect the SnackBar not to be shown since all fields are filled
      expect(find.byType(SnackBar), findsNothing);

      // Expect the Dialog to be closed
      expect(find.byType(Dialog), findsNothing);
    },
  );
}
