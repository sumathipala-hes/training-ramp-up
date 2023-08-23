import '../../model/student_model.dart';
import '../../model/user_model.dart';

class AdminHomePageState {
  final String userType;
  final String idText;
  final String nameText;
  final String addressText;
  final String emailText;
  final String mobileNoText;
  final DateTime dateText;
  final String passwordText;
  final List<Student> allStudents;
  final List<User> allUsers;

  AdminHomePageState({
    required this.userType,
    required this.idText,
    required this.nameText,
    required this.addressText,
    required this.emailText,
    required this.mobileNoText,
    required this.dateText,
    required this.passwordText,
    required this.allStudents,
    required this.allUsers,
  });

  static AdminHomePageState get initialState => AdminHomePageState(
        userType: '',
        idText: '',
        nameText: '',
        addressText: '',
        emailText: '',
        mobileNoText: '',
        dateText: DateTime.now(),
        passwordText: '',
        allStudents: [],
        allUsers: [],
      );

  AdminHomePageState clone({
    String? userType,
    String? idText,
    String? nameText,
    String? addressText,
    String? emailText,
    String? mobileNoText,
    DateTime? dateText,
    String? passwordText,
    List<Student>? allStudents,
    List<User>? allUsers,
  }) {
    return AdminHomePageState(
      userType: userType ?? this.userType,
      idText: idText ?? this.idText,
      nameText: nameText ?? this.nameText,
      addressText: addressText ?? this.addressText,
      emailText: emailText ?? this.emailText,
      mobileNoText: mobileNoText ?? this.mobileNoText,
      dateText: dateText ?? this.dateText,
      passwordText: passwordText ?? this.passwordText,
      allStudents: allStudents ?? this.allStudents,
      allUsers: allUsers ?? this.allUsers,
    );
  }
}
