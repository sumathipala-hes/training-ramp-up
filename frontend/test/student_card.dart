import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:frontend/model/student.dart';
import 'package:frontend/ui/widget/student_card.dart';
import 'package:intl/intl.dart';

void main() {
  test('StudentCard should render correctly', () {
    // Arrange
    Student student = Student(
      id: '1',
      name: 'John Doe',
      dob: DateTime.now(),
      address: '',
      gender: '',
      mobile: '',
    );

    // Act
    Widget widget = StudentCard(student: student);
    var actual = BlocProvider(
      create: (context) => FakeContext(),
      child: widget,
    );

    // Assert
    expect(actual, isA<Card>());
    expect(actual.child, isA<ElevatedButton>());
    expect(actual.child.child, isA<Row>());
    expect(actual.child.child.children[0].child, isA<Text>());
    expect(actual.child.child.children[0].child.data, '1');
    expect(actual.child.child.children[1].child, isA<Text>());
    expect(actual.child.child.children[1].child.data, 'John Doe');
    expect(actual.child.child.children[2].child, isA<Text>());
    expect(
      actual.child.child.children[2].child.data,
      DateFormat('EEE MMM d yyyy').format(DateTime.now()),
    );
  });
}

class FakeContext extends StatelessWidget {
  const FakeContext({super.key});

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
