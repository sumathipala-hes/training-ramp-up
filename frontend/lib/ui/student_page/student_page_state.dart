class StudentPageState {
  String name;
  String address;
  String mobile;
  String dob;
  String gender;

  StudentPageState({
    required this.name,
    required this.address,
    required this.mobile,
    required this.dob,
    required this.gender,
  });

  static StudentPageState get initialState => StudentPageState(
        name: '',
        address: '',
        mobile: '',
        dob: '',
        gender: '',
      );

  StudentPageState clone({
    String? name,
    String? address,
    String? mobile,
    String? dob,
    String? gender,
  }) {
    return StudentPageState(
      name: name ?? this.name,
      address: address ?? this.address,
      mobile: mobile ?? this.mobile,
      dob: dob ?? this.dob,
      gender: gender ?? this.gender,
    );
  }
}
