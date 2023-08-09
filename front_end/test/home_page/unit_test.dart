import 'package:flutter_test/flutter_test.dart';
import 'package:front_end/model/student_model.dart';
import 'package:front_end/ui/home_page/home_page_state.dart';
import 'package:mockito/mockito.dart';


class MockState extends Mock implements HomePageState {
  final List<Student> entries;

  MockState(this.entries);
}

void main() {
  test(
    'Student ID is Correctly Generated',
    () {
      final entries = [
        Student(
          id: '1',
          name: 'John Doe',
          address: '123 Main St',
          mobileNumber: '0771234567',
          dob: DateTime(2001, 07, 27),
          gender: 'Male',
        ),
      ];

      final state = MockState(entries);

      final event = Student(
        id: '',
        name: 'Nimesh',
        address: 'Galle Road',
        mobileNumber: '077123434',
        dob: DateTime(2002, 07, 27),
        gender: 'Male',
      );

      final student = Student(
          id: (state.entries.length + 1).toString(),
          name: event.name,
          address: event.address,
          mobileNumber: event.mobileNumber,
          dob: event.dob,
          gender: event.gender);

      expect(student.id, '2');
    },
  );
}
