class Student {
  final String id;
  final String name;
  final String address;
  final String mobileNumber;
  final String dob;
  final String gender;

  Student({
    required this.id,
    required this.name,
    required this.address,
    required this.mobileNumber,
    required this.dob,
    required this.gender,
  });

  int get age {
    // Calculate the age based on the date of birth (dob).
    DateTime currentDate = DateTime.now();
    DateTime dobDate = DateTime.parse(dob);

    // Calculate the difference in years.
    int ageInYears = currentDate.year - dobDate.year;

    // Check if the birth date hasn't occurred yet this year.
    if (currentDate.month < dobDate.month ||
        (currentDate.month == dobDate.month && currentDate.day < dobDate.day)) {
      ageInYears--;
    }

    return ageInYears;
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'address': address,
      'mobileNumber': mobileNumber,
      'dob': dob,
      'gender': gender,
    };
  }

  factory Student.fromJson(Map<String, dynamic> json) {
    return Student(
      id: json['id'],
      name: json['name'],
      address: json['address'],
      mobileNumber: json['mobileNumber'],
      dob: json['dob'],
      gender: json['gender'],
    );
  }
}
