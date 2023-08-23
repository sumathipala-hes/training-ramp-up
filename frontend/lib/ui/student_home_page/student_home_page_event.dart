abstract class StudentHomePageEvent {}

class SaveStudentEvent extends StudentHomePageEvent {
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

class GetAllStudents extends StudentHomePageEvent {}

class UpdateStudentEvent extends StudentHomePageEvent {
  final String id;
  final String name;
  final String address;
  final String mobile;
  final DateTime dob;
  final String gender;

  UpdateStudentEvent({
    required this.id,
    required this.name,
    required this.address,
    required this.mobile,
    required this.dob,
    required this.gender,
  });
}

class DeleteStudentEvent extends StudentHomePageEvent {
  final String id;

  DeleteStudentEvent({
    required this.id,
  });
}
