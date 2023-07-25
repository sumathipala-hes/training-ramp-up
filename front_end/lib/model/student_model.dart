class Student {
  final String id;
  final String name;
  final String address;
  final String mobileNumber;
  final DateTime dob;
  final String gender;

  Student({
    required this.id,
    required this.name,
    required this.address,
    required this.mobileNumber,
   required this.dob,
    required this.gender,
  });

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
