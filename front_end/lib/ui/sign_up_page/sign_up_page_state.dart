class SignUpPageState {
  final String nameText;
  final String addressText;
  final String emailText;
  final String mobileNoText;
  final DateTime dateText;
  final String selectedGender;
  final String passwordText;

  SignUpPageState({
    required this.nameText,
    required this.addressText,
    required this.emailText,
    required this.mobileNoText,
    required this.dateText,
    required this.selectedGender,
    required this.passwordText,
  });

  static SignUpPageState get initialState => SignUpPageState(
        nameText: '',
        addressText: '',
        emailText: '',
        passwordText: '',
        mobileNoText: '',
        dateText: DateTime.now(),
        selectedGender: "Male",
      );

  SignUpPageState clone({
    String? nameText,
    String? addressText,
    String? emailText,
    String? passwordText,
    String? mobileNoText,
    DateTime? dateText,
    String? selectedGender,
  }) {
    return SignUpPageState(
      nameText: nameText ?? this.nameText,
      addressText: addressText ?? this.addressText,
      emailText: emailText ?? this.emailText,
      passwordText: passwordText ?? this.passwordText,
      mobileNoText: mobileNoText ?? this.mobileNoText,
      dateText: dateText ?? this.dateText,
      selectedGender: selectedGender ?? this.selectedGender,
    );
  }
}
