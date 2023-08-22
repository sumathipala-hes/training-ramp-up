class UserManageState {
  final String userType;
  final String nameText;
  final String addressText;
  final String emailText;
  final String mobileNoText;
  final DateTime dateText;
  final String passwordText;
  final String selectedGender;

  UserManageState({
    required this.userType,
    required this.nameText,
    required this.addressText,
    required this.emailText,
    required this.mobileNoText,
    required this.dateText,
    required this.passwordText,
    required this.selectedGender,
  });

  static UserManageState get initialState => UserManageState(
        userType: '',
        nameText: '',
        addressText: '',
        emailText: '',
        mobileNoText: '',
        dateText: DateTime.now(),
        passwordText: '',
        selectedGender: '',
      );

  UserManageState clone({
    String? userType,
    String? nameText,
    String? addressText,
    String? emailText,
    String? mobileNoText,
    DateTime? dateText,
    String? passwordText,
    String? selectedGender,
  }) {
    return UserManageState(
      userType: userType ?? this.userType,
      nameText: nameText ?? this.nameText,
      addressText: addressText ?? this.addressText,
      emailText: emailText ?? this.emailText,
      mobileNoText: mobileNoText ?? this.mobileNoText,
      dateText: dateText ?? this.dateText,
      passwordText: passwordText ?? this.passwordText,
      selectedGender: selectedGender ?? this.selectedGender,
    );
  }
}
