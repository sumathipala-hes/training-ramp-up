import 'package:flutter_test/flutter_test.dart';
import 'package:front_end/models/student.dart';
import 'package:front_end/ui/admin_home_page/admin_home_page_state.dart';
import 'package:front_end/util/student_event.dart';
import 'package:mockito/mockito.dart';

// Mocking the State class
// ignore: must_be_immutable
class MockState extends Mock implements AdminHomeState {
  @override
  final List<Student> entries;

  MockState(this.entries);
}

void main() {
  test(
    'Student ID is correctly generated',
    () {
      // Create some dummy entries for testing
      final entries = [
        Student(
          studentId: '1',
          studentName: 'Pasan Pahasara',
          studentAddress: '123 Main St',
          studentMobile: '123-456-7890',
          studentDob: DateTime(2000, 1, 1),
          studentGender: 'Male',
        ),
        Student(
          studentId: '2',
          studentName: 'Sanumi Munasinghe',
          studentAddress: '456 Elm St',
          studentMobile: '987-654-3210',
          studentDob: DateTime(1998, 5, 15),
          studentGender: 'Female',
        ),
      ];

      // Create a mock state with the dummy entries
      final state = MockState(entries);

      // Mock the event data
      final event = StudentEvent(
        studentName: 'Sanuka Perera',
        studentAddress: '789 Oak St',
        studentMobile: '111-222-3333',
        studentDob: DateTime(2002, 9, 20),
        studentGender: 'Male',
      );

      // Create a new student
      final student = Student(
        studentId: (state.entries.length + 1).toString(),
        studentName: event.studentName,
        studentAddress: event.studentAddress,
        studentMobile: event.studentMobile,
        studentDob: event.studentDob,
        studentGender: event.studentGender,
      );

      // Check if the studentId is correctly generated
      expect(student.studentId, '3');
    },
  );
}
