abstract class HomePageEvent {}

class SaveStudentEvent extends HomePageEvent {
  final String name;
  final String address;
  final String mobile;
  final DateTime dob;
  final String gender;

  SaveStudentEvent({
    required this.name,
    required this.address,
    required this.mobile,
    required this.dob,
    required this.gender,
  });
}

class GetAllStudents extends HomePageEvent {}
