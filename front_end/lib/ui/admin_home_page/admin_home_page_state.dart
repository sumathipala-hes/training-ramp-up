import '../../model/student_model.dart';

class AdminHomePageState {
  final String idText;
  final String nameText;
  final String addressText;
  final String mobileNoText;
  final DateTime dateText;
  final List<Student> allStudents;

  AdminHomePageState({
    required this.idText,
    required this.nameText,
    required this.addressText,
    required this.mobileNoText,
    required this.dateText,
    required this.allStudents,
  });

  static AdminHomePageState get initialState => AdminHomePageState(
        idText: '',
        nameText: '',
        addressText: '',
        mobileNoText: '',
        dateText: DateTime.now(),
        allStudents: [],
      );

  AdminHomePageState clone({
    String? idText,
    String? nameText,
    String? addressText,
    String? mobileNoText,
    DateTime? dateText,
    List<Student>? allStudents,
  }) {
    return AdminHomePageState(
      idText: idText ?? this.idText,
      nameText: nameText ?? this.nameText,
      addressText: addressText ?? this.addressText,
      mobileNoText: mobileNoText ?? this.mobileNoText,
      dateText: dateText ?? this.dateText,
      allStudents: allStudents ?? this.allStudents,
    );
  }
}
