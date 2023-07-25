import '../../model/student_model.dart';

class HomePageState {
  final String idText;
  final String nameText;
  final String addressText;
  final String mobileNoText;
  final String dateText;
  final List<Student> allStudents;

  HomePageState({
    required this.idText,
    required this.nameText,
    required this.addressText,
    required this.mobileNoText,
    required this.dateText,
    required this.allStudents,
  });

  static HomePageState get initialState => HomePageState(
        idText: '',
        nameText: '',
        addressText: '',
        mobileNoText: '',
        dateText: '',
        allStudents: [],
      );

  HomePageState clone({
    String? idText,
    String? nameText,
    String? addressText,
    String? mobileNoText,
    String? dateText,
    List<Student>? allStudents,
  }) {
    return HomePageState(
      idText: idText ?? this.idText,
      nameText: nameText ?? this.nameText,
      addressText: addressText ?? this.addressText,
      mobileNoText: mobileNoText ?? this.mobileNoText,
      dateText: dateText ?? this.dateText,
      allStudents: allStudents ?? this.allStudents,
    );
  }
}
