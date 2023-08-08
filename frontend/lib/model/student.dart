class Student {
  String id;
  String name;
  String address;
  String mobile;
  DateTime dob;
  String gender;

  Student({
    required this.id,
    required this.name,
    required this.address,
    required this.mobile,
    required this.dob,
    required this.gender,
  });

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'address': address,
      'mobile': mobile,
      'dob': dob.toIso8601String(),
      'gender': gender,
    };
  }

  factory Student.fromJson(Map<String, dynamic> json) {
    return Student(
      id: (json['id'] as int).toString(),
      name: json['name'] as String,
      address: json['address'] as String,
      mobile: json['mobile'] as String,
      dob: DateTime.parse(json['dob'] as String).toLocal(),
      gender: json['gender'] as String,
    );
  }
}
