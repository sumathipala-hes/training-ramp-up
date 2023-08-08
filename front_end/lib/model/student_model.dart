class Student {
  final String? id;
  final String name;
  final String address;
  final String mobileNumber;
  final DateTime dob;
  final String gender;

  Student({
    this.id,
    required this.name,
    required this.address,
    required this.mobileNumber,
    required this.dob,
    required this.gender,
  });

  factory Student.fromJson(Map<String, dynamic> json) {
    return Student(
      id: (json['id'] as int).toString(),
      name: json['name'] as String,
      address: json['address'] as String,
      mobileNumber: json['mobileNumber'] as String,
      dob: DateTime.parse(json['dob'] as String).toLocal(),
      gender: json['gender'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'address': address,
      'mobileNumber': mobileNumber,
      'dob': dob.toIso8601String(),
      'gender': gender,
    };
  }
}
