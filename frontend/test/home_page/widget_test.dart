import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:frontend/ui/home_page/home_page_event.dart';
import 'package:frontend/ui/home_page/home_page_view.dart';
import 'package:frontend/ui/home_page/home_page_bloc.dart';
import 'package:frontend/ui/home_page/home_page_state.dart';
import 'package:frontend/model/student.dart';
import 'package:frontend/ui/widget/student_card.dart';
import 'package:mockito/mockito.dart';

void main() {
  testWidgets('HomePageView displays Add Student button',
      (WidgetTester tester) async {
    // Build our HomePageView with a mocked HomePageBloc
    await tester.pumpWidget(
      MaterialApp(
        home: BlocProvider<HomePageBloc>(
          create: (_) => MockHomePageBloc(),
          child: const HomePageView(),
        ),
      ),
    );

    // Check if the Add Student button is displayed
    expect(find.text("Add Student"), findsOneWidget);
  });

  testWidgets('HomePageView displays StudentCard', (WidgetTester tester) async {
    // Mock data: Create a list of sample students
    final List<Student> mockStudents = [
      Student(
          id: '1',
          name: 'John Doe',
          dob: DateTime(1995, 10, 15),
          address: '',
          gender: '',
          mobile: ''),
      Student(
          id: '2',
          name: 'Jane Smith',
          dob: DateTime(1998, 5, 20),
          address: '',
          gender: '',
          mobile: ''),
    ];

    // Build our HomePageView with a mocked HomePageBloc
    await tester.pumpWidget(
      MaterialApp(
        home: BlocProvider<HomePageBloc>(
          create: (_) => MockHomePageBloc(students: mockStudents),
          child: const HomePageView(),
        ),
      ),
    );

    // Check if the StudentCard widgets are displayed
    expect(find.byType(StudentCard), findsNWidgets(mockStudents.length));
  });
}

// Mock implementation of HomePageBloc for testing
class MockHomePageBloc extends Mock implements HomePageBloc {
  final List<Student> students;

  MockHomePageBloc({this.students = const []});

  @override
  Stream<HomePageState> mapEventToState(HomePageEvent event) async* {
    if (event is GetAllStudents) {
      // Emulate yielding the state with the list of students
      yield HomePageState(students: students);
    }
  }
}
