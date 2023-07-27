class StudentPageState {
  String gender;
  String nameError;
  String addressError;
  String mobileError;

  StudentPageState({
    required this.gender,
    required this.nameError,
    required this.addressError,
    required this.mobileError,
  });

  static StudentPageState get initialState => StudentPageState(
        gender: '',
        nameError: '',
        addressError: '',
        mobileError: '',
      );

  StudentPageState clone({
    String? gender,
    String? textFieldValue,
    String? nameError,
    String? addressError,
    String? mobileError,
  }) {
    return StudentPageState(
      gender: gender ?? this.gender,
      nameError: nameError ?? this.nameError,
      addressError: addressError ?? this.addressError,
      mobileError: mobileError ?? this.mobileError,
    );
  }
}
