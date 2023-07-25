import 'package:frontend/model/student.dart';

class HomePageState {
  final List<Student> students;
  HomePageState({
    required this.students,
  });

  static HomePageState get initialState => HomePageState(
        students: [],
      );

  HomePageState clone({
    List<Student>? students,
  }) {
    return HomePageState(
      students: students ?? this.students,
    );
  }
}
