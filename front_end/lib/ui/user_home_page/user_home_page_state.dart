import '../../model/student_model.dart';

class UserHomePageState {
  final List<Student> allStudents;

  UserHomePageState({
    required this.allStudents,
  });

  static UserHomePageState get initialState => UserHomePageState(
        allStudents: [],
      );

  UserHomePageState clone({
    List<Student>? allStudents,
  }) {
    return UserHomePageState(
      allStudents: allStudents ?? this.allStudents,
    );
  }
}
