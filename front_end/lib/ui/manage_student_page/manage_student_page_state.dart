class StudentManageState {
  final String nameText;
  final String addressText;
  final String mobileNoText;
  final DateTime dateText;
  final String selectedGender;

  StudentManageState({
    required this.nameText,
    required this.addressText,
    required this.mobileNoText,
    required this.dateText,
    required this.selectedGender,
  });

  static StudentManageState get initialState => StudentManageState(
        nameText: '',
        addressText: '',
        mobileNoText: '',
        dateText: DateTime.now(),
        selectedGender: "Male",
      );

  StudentManageState clone({
    String? nameText,
    String? addressText,
    String? mobileNoText,
    DateTime? dateText,
    String? selectedGender,
  }) {
    return StudentManageState(
      nameText: nameText ?? this.nameText,
      addressText: addressText ?? this.addressText,
      mobileNoText: mobileNoText ?? this.mobileNoText,
      dateText: dateText ?? this.dateText,
      selectedGender: selectedGender ?? this.selectedGender,
    );
  }
}
